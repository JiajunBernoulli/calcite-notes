# Join Reorder Good Case
You can debug [JoinReorder.java](../../src/main/java/com/github/jiajun/calcite/example/cbo/JoinReorder.java) to learn Volcano Planner.
## SQL and RelNode
There are three tables join in the sql: `(p join s) join ps`
```java
select
    s_acctbal,
    s_name,
    p_partkey,
    p_mfgr,
    s_address,
    s_phone,
    s_comment
from
    part, -- p
    supplier, -- s
    partsupp -- ps
where
        p_partkey = ps_partkey
  and s_suppkey = ps_suppkey
```
There are no condition between `p` and `s`, so it is `EnumerableNestedLoopJoin`.
```java
EnumerableProject(S_ACCTBAL=[$14], S_NAME=[$10], P_PARTKEY=[$0], P_MFGR=[$2], S_ADDRESS=[$11], S_PHONE=[$13], S_COMMENT=[$15])
  EnumerableHashJoin(condition=[AND(=($0, $16), =($9, $17))], joinType=[inner])
    EnumerableNestedLoopJoin(condition=[true], joinType=[inner])
      EnumerableTableScan(table=[[PART]])
      EnumerableTableScan(table=[[SUPPLIER]])
    EnumerableTableScan(table=[[PARTSUPP]])
```
If we use `JoinPushThroughJoinRule.LEFT` rule, the result will be `(PS HashJoin S) HashJoin P`
```java
EnumerableProject(S_ACCTBAL=[$14], S_NAME=[$10], P_PARTKEY=[$0], P_MFGR=[$2], S_ADDRESS=[$11], S_PHONE=[$13], S_COMMENT=[$15])
  EnumerableProject(p_partkey=[$12], p_name=[$13], p_mfgr=[$14], p_brand=[$15], p_type=[$16], p_size=[$17], p_container=[$18], p_retailprice=[$19], p_comment=[$20], s_suppkey=[$5], s_name=[$6], s_address=[$7], s_nationkey=[$8], s_phone=[$9], s_acctbal=[$10], s_comment=[$11], ps_partkey=[$0], ps_suppkey=[$1], ps_availqty=[$2], ps_supplycost=[$3], ps_comment=[$4])
    EnumerableHashJoin(condition=[=($0, $12)], joinType=[inner])
      EnumerableHashJoin(condition=[=($1, $5)], joinType=[inner])
        EnumerableTableScan(table=[[PARTSUPP]])
        EnumerableTableScan(table=[[SUPPLIER]])
      EnumerableTableScan(table=[[PART]])
```

## Why Reorder
We can know the JoinRowCount is `(leftRowCount * rightRowCount) * selectivity`  in [RelMdUtil#getJoinRowCount](https://github.com/apache/calcite/blob/0be8eaebcf27afae9ecda8ab79db63c214426561/core/src/main/java/org/apache/calcite/rel/metadata/RelMdUtil.java#L831)
- Plan1: `(PS HashJoin S) HashJoin P`, the cost is
```shell
(100 * 100 * 0.15) * 100 * 0.15 = 22500
```
The selectivity of an equivalent condition is [0.15](https://github.com/apache/calcite/blob/0be8eaebcf27afae9ecda8ab79db63c214426561/core/src/main/java/org/apache/calcite/rel/metadata/RelMdUtil.java#L493)

- Plan2: `(P NestedLoopJoin S)) HashJoin PS`, the cost is
```shell
(100 * 100 * 1.0 * 10) * 100 * 0.15 * 0.15 = 225000
```
The selectivity is [1.0](https://github.com/apache/calcite/blob/0be8eaebcf27afae9ecda8ab79db63c214426561/core/src/main/java/org/apache/calcite/rel/metadata/RelMdUtil.java#L479) if no condition,
and [10](https://github.com/apache/calcite/blob/0be8eaebcf27afae9ecda8ab79db63c214426561/core/src/main/java/org/apache/calcite/adapter/enumerable/EnumerableNestedLoopJoin.java#L122) is penalty Coefficient in `EnumerableNestedLoopJoin`.

Obviously, Plan1 is better than Plan2.
> I only considered row count, calcite has more [costs](dag/planner-vizhtml.html).