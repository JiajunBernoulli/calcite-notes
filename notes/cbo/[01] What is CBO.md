# What is CBO

## Background
Before understanding CBO, you should know rule-based optimizer(RBO).

When an SQL can have different execution plans, rules are not enough to determine which one is better.

So we can compute cost to choose the best execution plan.

## Concept
The **cost-based optimizer(CBO)** uses metadata and statistics to estimate the amount of processing 
(memory, CPU, network traffic, and I/O) required for each operation. 

It compares the cost of different execution plans,
and then selects the execution plan with the least cost.

## Implementation
Many engines also have complete implementation that user can use it by using SQL:
- [Doris](https://doris.apache.org/docs/query-acceleration/statistics?_highlight=cbo)
- [SparkSQL](https://spark.apache.org/docs/3.1.2/sql-ref-syntax-aux-analyze-table.html#content)
- [Trino](https://trino.io/docs/current/optimizer/cost-based-optimizations.html)

We can achieve CBO by using VolcanoPlanner in Calcite.
The following article will introduce the usage and working principle about VolcanoPlanner.
> Working principle just the most basic principle, detailed reference [paper](https://15721.courses.cs.cmu.edu/spring2017/papers/14-optimizer1/graefe-icde1993.pdf).