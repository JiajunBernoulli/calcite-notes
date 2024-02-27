package com.github.jiajun.calcite.example.cbo;

import com.github.jiajun.calcite.example.cbo.schema.TpchSchemas;
import com.github.jiajun.calcite.example.cbo.schema.TpchTable;
import java.util.Collections;
import java.util.Properties;
import org.apache.calcite.adapter.enumerable.EnumerableConvention;
import org.apache.calcite.adapter.enumerable.EnumerableRel;
import org.apache.calcite.adapter.enumerable.EnumerableRules;
import org.apache.calcite.config.CalciteConnectionConfig;
import org.apache.calcite.config.CalciteConnectionConfigImpl;
import org.apache.calcite.config.CalciteConnectionProperty;
import org.apache.calcite.jdbc.CalciteSchema;
import org.apache.calcite.jdbc.JavaTypeFactoryImpl;
import org.apache.calcite.plan.ConventionTraitDef;
import org.apache.calcite.plan.RelOptCluster;
import org.apache.calcite.plan.RelOptPlanner;
import org.apache.calcite.plan.visualizer.RuleMatchVisualizer;
import org.apache.calcite.plan.volcano.VolcanoPlanner;
import org.apache.calcite.prepare.CalciteCatalogReader;
import org.apache.calcite.rel.RelNode;
import org.apache.calcite.rel.rules.CoreRules;
import org.apache.calcite.rel.rules.JoinPushThroughJoinRule;
import org.apache.calcite.rel.type.RelDataType;
import org.apache.calcite.rel.type.RelDataTypeFactory;
import org.apache.calcite.rex.RexBuilder;
import org.apache.calcite.sql.SqlNode;
import org.apache.calcite.sql.fun.SqlStdOperatorTable;
import org.apache.calcite.sql.parser.SqlParser;
import org.apache.calcite.sql.validate.SqlValidator;
import org.apache.calcite.sql.validate.SqlValidatorUtil;
import org.apache.calcite.sql2rel.SqlToRelConverter;
import org.apache.calcite.sql2rel.StandardConvertletTable;


public class JoinReorder {

  protected static final CalciteSchema schema = CalciteSchema.createRootSchema(true);
  protected static final RelDataTypeFactory typeFactory = new JavaTypeFactoryImpl();

  private static void mockSchema() {
    // Create the schema and table data types
    for (TpchSchemas table : TpchSchemas.values()) {
      RelDataTypeFactory.Builder builder = new RelDataTypeFactory.Builder(typeFactory);
      for (TpchSchemas.Column column : table.columns) {
        RelDataType type = typeFactory.createJavaType(column.type);
        builder.add(column.name, type.getSqlTypeName()).nullable(true);
      }
      schema.add(table.name(), new TpchTable(builder.build(), 100d));
    }
  }

  private static RelNode convert(String sqlQuery) throws Exception {
    /***1. Parse **/
    // Create an SQL parser
    final SqlParser parser = SqlParser.create(sqlQuery);
    // Parse the query into an AST
    final SqlNode sqlNode = parser.parseQuery();
    System.out.println("[Parsed query]");
    System.out.println(sqlNode.toString());
    /***2. Validate **/
    // Configure and instantiate validator
    Properties props = new Properties();
    props.setProperty(CalciteConnectionProperty.CASE_SENSITIVE.camelName(), "false");
    CalciteConnectionConfig config = new CalciteConnectionConfigImpl(props);
    CalciteCatalogReader catalogReader = new CalciteCatalogReader(schema,
        Collections.singletonList("bs"),
        typeFactory, config);
    SqlValidator validator = SqlValidatorUtil.newValidator(SqlStdOperatorTable.instance(),
        catalogReader, typeFactory,
        SqlValidator.Config.DEFAULT);
    // Validate the initial AST
    SqlNode validNode = validator.validate(sqlNode);
    /***3. Convert **/
    RelOptPlanner planner = new VolcanoPlanner();
    planner.addRelTraitDef(ConventionTraitDef.INSTANCE);
    RelOptCluster cluster = RelOptCluster.create(planner, new RexBuilder(typeFactory));
    SqlToRelConverter relConverter = new SqlToRelConverter(
        (type, query, schema, path) -> null,
        validator,
        catalogReader,
        cluster,
        StandardConvertletTable.INSTANCE,
        SqlToRelConverter.config());
    RelNode logPlan = relConverter.convertQuery(validNode, false, true).rel;
    return logPlan;
  }

  private static RelNode optimize(RelNode logPlan) {
    RelOptCluster cluster = logPlan.getCluster();
    RelOptPlanner planner = cluster.getPlanner();
    // Enable Visualizer
    RuleMatchVisualizer viz = new RuleMatchVisualizer("./notes/cbo/dag", "html");
    viz.attachTo(planner);
    /***Key Rule for Join Reorder**/
    planner.addRule(CoreRules.FILTER_INTO_JOIN); // Push Filter Condition to Join
    planner.addRule(JoinPushThroughJoinRule.LEFT); // JoinPushThroughJoinRule can reorder join
    // Necessary convert rules(Logical To Enumerable)
    planner.addRule(EnumerableRules.ENUMERABLE_TABLE_SCAN_RULE);
    planner.addRule(EnumerableRules.ENUMERABLE_PROJECT_RULE);
    planner.addRule(EnumerableRules.ENUMERABLE_FILTER_RULE);
    planner.addRule(EnumerableRules.ENUMERABLE_JOIN_RULE);
    // Define the type of the output plan (in this case we want a physical plan in
    // EnumerableContention)
    logPlan = planner.changeTraits(logPlan,
        cluster.traitSet().replace(EnumerableConvention.INSTANCE));
    planner.setRoot(logPlan);
    // Start the optimization process to obtain the most efficient physical plan based on the
    // provided rule set.
    EnumerableRel phyPlan = (EnumerableRel) planner.findBestExp();
    viz.writeToFile();
    return phyPlan;
  }

  public static void main(String[] args) throws Exception {
    final String sqlQuery = "select\n"
        + "    s_acctbal,\n"
        + "    s_name,\n"
        + "    p_partkey,\n"
        + "    p_mfgr,\n"
        + "    s_address,\n"
        + "    s_phone,\n"
        + "    s_comment\n"
        + "from\n"
        + "    part,\n"
        + "    supplier,\n"
        + "    partsupp\n"
        + "where\n"
        + "        p_partkey = ps_partkey\n"
        + "  and s_suppkey = ps_suppkey"; // part of TPCH-Q2
    mockSchema();
    final RelNode logPlan = convert(sqlQuery);
    System.out.println("[Convert RelNode]");
    System.out.println(logPlan.explain());
    final RelNode phyPlan = optimize(logPlan);
    System.out.println("[Optimize RelNode]");
    System.out.println(phyPlan.explain());
  }

}
