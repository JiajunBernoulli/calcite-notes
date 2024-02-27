# How to use VolcanoPlanner?
## Necessary steps
You must have logical RelNode before using Volcano Planner.
1. Create new planner and add Rules
```java
RelOptPlanner planner = new VolcanoPlanner();
// Necessary convert rules(Logical To Enumerable)
planner.addRule(EnumerableRules.ENUMERABLE_TABLE_SCAN_RULE);
planner.addRule(EnumerableRules.ENUMERABLE_PROJECT_RULE);
planner.addRule(EnumerableRules.ENUMERABLE_FILTER_RULE);
planner.addRule(EnumerableRules.ENUMERABLE_JOIN_RULE);
```
2. Add and change traits
```java
planner.addRelTraitDef(ConventionTraitDef.INSTANCE); 
// Volcano Plan will throw NullPointerException
// if we missing ConventionTraitDef.
// You can define your RelTraitDef when you need, 
// but ConventionTraitDef.INSTANCE is enough at usually.
logPlan = planner.changeTraits(logPlan,
    cluster.traitSet().replace(EnumerableConvention.INSTANCE));
// `EnumerableContention` need `EnumerableXXXRule`.
// When you have corresponding rules, 
// you can also use other convertions:
// BindableConvention,JdbcConvention,...
```
3. Set root and find best
```java
planner.setRoot(logPlan);
EnumerableRel phyPlan = (EnumerableRel) planner.findBestExp();
```
## Non essential steps
We can get a DAG for Volcano Planner, it is very helpful for us to analyze execution plan.
```java
RuleMatchVisualizer viz = new RuleMatchVisualizer("${DIR}", "html");
viz.attachTo(planner);
    ... // findBestExpr
viz.writeToFile();
```

There are a [demo](dag/planner-vizhtml.html) that like a volcano(erupting from bottom to top).