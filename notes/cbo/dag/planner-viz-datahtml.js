var data = {
  "steps":[ {
    "id":"INITIAL",
    "updates":{
      "set-0":{
        "label":"set-0",
        "kind":"set"
      },
      "13":{
        "label":"subset#13-set#0-\nNONE",
        "explanation":"{subset=rel#13:RelSubset#0.NONE}",
        "set":"set-0",
        "kind":"subset",
        "inputs":[ "1" ]
      },
      "1":{
        "label":"#1-LogicalTableScan",
        "explanation":"{table=[PART]}",
        "set":"set-0"
      },
      "set-1":{
        "label":"set-1",
        "kind":"set"
      },
      "14":{
        "label":"subset#14-set#1-\nNONE",
        "explanation":"{subset=rel#14:RelSubset#1.NONE}",
        "set":"set-1",
        "kind":"subset",
        "inputs":[ "3" ]
      },
      "3":{
        "label":"#3-LogicalTableScan",
        "explanation":"{table=[SUPPLIER]}",
        "set":"set-1"
      },
      "set-2":{
        "label":"set-2",
        "kind":"set"
      },
      "16":{
        "label":"subset#16-set#2-\nNONE",
        "explanation":"{subset=rel#16:RelSubset#2.NONE}",
        "set":"set-2",
        "kind":"subset",
        "inputs":[ "15" ]
      },
      "15":{
        "label":"#15-LogicalJoin",
        "explanation":"{condition=true, joinType=inner}",
        "set":"set-2",
        "inputs":[ "13", "14" ]
      },
      "set-3":{
        "label":"set-3",
        "kind":"set"
      },
      "17":{
        "label":"subset#17-set#3-\nNONE",
        "explanation":"{subset=rel#17:RelSubset#3.NONE}",
        "set":"set-3",
        "kind":"subset",
        "inputs":[ "7" ]
      },
      "7":{
        "label":"#7-LogicalTableScan",
        "explanation":"{table=[PARTSUPP]}",
        "set":"set-3"
      },
      "set-4":{
        "label":"set-4",
        "kind":"set"
      },
      "19":{
        "label":"subset#19-set#4-\nNONE",
        "explanation":"{subset=rel#19:RelSubset#4.NONE}",
        "set":"set-4",
        "kind":"subset",
        "inputs":[ "18" ]
      },
      "18":{
        "label":"#18-LogicalJoin",
        "explanation":"{condition=true, joinType=inner}",
        "set":"set-4",
        "inputs":[ "16", "17" ]
      },
      "set-5":{
        "label":"set-5",
        "kind":"set"
      },
      "21":{
        "label":"subset#21-set#5-\nNONE",
        "explanation":"{subset=rel#21:RelSubset#5.NONE}",
        "set":"set-5",
        "kind":"subset",
        "inputs":[ "20" ]
      },
      "20":{
        "label":"#20-LogicalFilter",
        "explanation":"{condition=AND(=($0, $16), =($9, $17))}",
        "set":"set-5",
        "inputs":[ "19" ]
      },
      "set-6":{
        "label":"set-6",
        "kind":"set"
      },
      "23":{
        "label":"subset#23-set#6-\nNONE",
        "explanation":"{subset=rel#23:RelSubset#6.NONE}",
        "set":"set-6",
        "kind":"subset",
        "inputs":[ "22" ]
      },
      "22":{
        "label":"#22-LogicalProject",
        "explanation":"{S_ACCTBAL=$14, S_NAME=$10, P_PARTKEY=$0, P_MFGR=$2, S_ADDRESS=$11, S_PHONE=$13, S_COMMENT=$15}",
        "set":"set-6",
        "inputs":[ "21" ]
      },
      "24":{
        "label":"subset#24-set#6-\nENUMERABLE",
        "explanation":"{subset=rel#24:RelSubset#6.ENUMERABLE, S_ACCTBAL=$14, S_NAME=$10, P_PARTKEY=$0, P_MFGR=$2, S_ADDRESS=$11, S_PHONE=$13, S_COMMENT=$15}",
        "set":"set-6",
        "kind":"subset",
        "inputs":[ "25" ]
      },
      "25":{
        "label":"#25-AbstractConverter",
        "explanation":"{convention=ENUMERABLE}",
        "set":"set-6",
        "inputs":[ "23" ]
      }
    },
    "matchedRels":[ ]
  }, {
    "id":"2-EnumerableTableScanRule(in:NONE,out:ENUMERABLE)",
    "updates":{
      "27":{
        "label":"subset#27-set#0-\nENUMERABLE",
        "explanation":"{subset=rel#27:RelSubset#0.ENUMERABLE, table=[PART]}",
        "set":"set-0",
        "kind":"subset",
        "inputs":[ "26" ]
      },
      "26":{
        "label":"#26-EnumerableTableScan",
        "explanation":"{table=[PART]}",
        "set":"set-0"
      }
    },
    "matchedRels":[ "1" ]
  }, {
    "id":"5-EnumerableTableScanRule(in:NONE,out:ENUMERABLE)",
    "updates":{
      "29":{
        "label":"subset#29-set#1-\nENUMERABLE",
        "explanation":"{subset=rel#29:RelSubset#1.ENUMERABLE, table=[SUPPLIER]}",
        "set":"set-1",
        "kind":"subset",
        "inputs":[ "28" ]
      },
      "28":{
        "label":"#28-EnumerableTableScan",
        "explanation":"{table=[SUPPLIER]}",
        "set":"set-1"
      }
    },
    "matchedRels":[ "3" ]
  }, {
    "id":"11-EnumerableJoinRule(in:NONE,out:ENUMERABLE)",
    "updates":{
      "31":{
        "label":"subset#31-set#2-\nENUMERABLE",
        "explanation":"{subset=rel#31:RelSubset#2.ENUMERABLE, condition=true, joinType=inner}",
        "set":"set-2",
        "kind":"subset",
        "inputs":[ "30" ]
      },
      "30":{
        "label":"#30-EnumerableNestedLoopJoin",
        "explanation":"{condition=true, joinType=inner}",
        "set":"set-2",
        "inputs":[ "27", "29" ]
      }
    },
    "matchedRels":[ "15" ]
  }, {
    "id":"14-EnumerableTableScanRule(in:NONE,out:ENUMERABLE)",
    "updates":{
      "33":{
        "label":"subset#33-set#3-\nENUMERABLE",
        "explanation":"{subset=rel#33:RelSubset#3.ENUMERABLE, table=[PARTSUPP]}",
        "set":"set-3",
        "kind":"subset",
        "inputs":[ "32" ]
      },
      "32":{
        "label":"#32-EnumerableTableScan",
        "explanation":"{table=[PARTSUPP]}",
        "set":"set-3"
      }
    },
    "matchedRels":[ "7" ]
  }, {
    "id":"21-EnumerableJoinRule(in:NONE,out:ENUMERABLE)",
    "updates":{
      "35":{
        "label":"subset#35-set#4-\nENUMERABLE",
        "explanation":"{subset=rel#35:RelSubset#4.ENUMERABLE, condition=true, joinType=inner}",
        "set":"set-4",
        "kind":"subset",
        "inputs":[ "34" ]
      },
      "34":{
        "label":"#34-EnumerableNestedLoopJoin",
        "explanation":"{condition=true, joinType=inner}",
        "set":"set-4",
        "inputs":[ "31", "33" ]
      }
    },
    "matchedRels":[ "18" ]
  }, {
    "id":"23-FilterIntoJoinRule",
    "updates":{
      "21":{
        "inputs":[ "20", "36" ]
      },
      "36":{
        "label":"#36-LogicalJoin",
        "explanation":"{condition=AND(=($0, $16), =($9, $17)), joinType=inner}",
        "set":"set-5",
        "inputs":[ "16", "17" ]
      }
    },
    "matchedRels":[ "20", "18" ]
  }, {
    "id":"26-EnumerableFilterRule(in:NONE,out:ENUMERABLE)",
    "updates":{
      "38":{
        "label":"subset#38-set#5-\nENUMERABLE",
        "explanation":"{subset=rel#38:RelSubset#5.ENUMERABLE, condition=AND(=($0, $16), =($9, $17))}",
        "set":"set-5",
        "kind":"subset",
        "inputs":[ "37" ]
      },
      "37":{
        "label":"#37-EnumerableFilter",
        "explanation":"{condition=AND(=($0, $16), =($9, $17))}",
        "set":"set-5",
        "inputs":[ "35" ]
      }
    },
    "matchedRels":[ "20" ]
  }, {
    "id":"29-EnumerableProjectRule(in:NONE,out:ENUMERABLE)",
    "updates":{
      "24":{
        "inputs":[ "25", "39" ]
      },
      "39":{
        "label":"#39-EnumerableProject",
        "explanation":"{S_ACCTBAL=$14, S_NAME=$10, P_PARTKEY=$0, P_MFGR=$2, S_ADDRESS=$11, S_PHONE=$13, S_COMMENT=$15}",
        "set":"set-6",
        "inputs":[ "38" ]
      }
    },
    "matchedRels":[ "22" ]
  }, {
    "id":"32-JoinPushThroughJoinRule:left",
    "updates":{
      "21":{
        "inputs":[ "20", "36", "47" ]
      },
      "set-7":{
        "label":"set-7",
        "kind":"set"
      },
      "44":{
        "label":"subset#44-set#7-\nNONE",
        "explanation":"{subset=rel#44:RelSubset#7.NONE}",
        "set":"set-7",
        "kind":"subset",
        "inputs":[ "43" ]
      },
      "43":{
        "label":"#43-LogicalJoin",
        "explanation":"{condition==($5, $1), joinType=inner}",
        "set":"set-7",
        "inputs":[ "17", "14" ]
      },
      "set-8":{
        "label":"set-8",
        "kind":"set"
      },
      "46":{
        "label":"subset#46-set#8-\nNONE",
        "explanation":"{subset=rel#46:RelSubset#8.NONE}",
        "set":"set-8",
        "kind":"subset",
        "inputs":[ "45" ]
      },
      "45":{
        "label":"#45-LogicalJoin",
        "explanation":"{condition==($12, $0), joinType=inner}",
        "set":"set-8",
        "inputs":[ "44", "13" ]
      },
      "47":{
        "label":"#47-LogicalProject",
        "explanation":"{p_partkey=$12, p_name=$13, p_mfgr=$14, p_brand=$15, p_type=$16, p_size=$17, p_container=$18, p_retailprice=$19, p_comment=$20, s_suppkey=$5, s_name=$6, s_address=$7, s_nationkey=$8, s_phone=$9, s_acctbal=$10, s_comment=$11, ps_partkey=$0, ps_suppkey=$1, ps_availqty=$2, ps_supplycost=$3, ps_comment=$4}",
        "set":"set-5",
        "inputs":[ "46" ]
      }
    },
    "matchedRels":[ "36", "15", "7" ]
  }, {
    "id":"36-EnumerableJoinRule(in:NONE,out:ENUMERABLE)",
    "updates":{
      "38":{
        "inputs":[ "37", "48" ]
      },
      "48":{
        "label":"#48-EnumerableHashJoin",
        "explanation":"{condition=AND(=($0, $16), =($9, $17)), joinType=inner}",
        "set":"set-5",
        "inputs":[ "31", "33" ]
      }
    },
    "matchedRels":[ "36" ]
  }, {
    "id":"42-EnumerableJoinRule(in:NONE,out:ENUMERABLE)",
    "updates":{
      "50":{
        "label":"subset#50-set#7-\nENUMERABLE",
        "explanation":"{subset=rel#50:RelSubset#7.ENUMERABLE, condition==($5, $1), joinType=inner}",
        "set":"set-7",
        "kind":"subset",
        "inputs":[ "49" ]
      },
      "49":{
        "label":"#49-EnumerableHashJoin",
        "explanation":"{condition==($1, $5), joinType=inner}",
        "set":"set-7",
        "inputs":[ "33", "29" ]
      }
    },
    "matchedRels":[ "43" ]
  }, {
    "id":"49-EnumerableJoinRule(in:NONE,out:ENUMERABLE)",
    "updates":{
      "52":{
        "label":"subset#52-set#8-\nENUMERABLE",
        "explanation":"{subset=rel#52:RelSubset#8.ENUMERABLE, condition==($12, $0), joinType=inner}",
        "set":"set-8",
        "kind":"subset",
        "inputs":[ "51" ]
      },
      "51":{
        "label":"#51-EnumerableHashJoin",
        "explanation":"{condition==($0, $12), joinType=inner}",
        "set":"set-8",
        "inputs":[ "50", "27" ]
      }
    },
    "matchedRels":[ "45" ]
  }, {
    "id":"52-EnumerableProjectRule(in:NONE,out:ENUMERABLE)",
    "updates":{
      "38":{
        "inputs":[ "37", "48", "53" ]
      },
      "53":{
        "label":"#53-EnumerableProject",
        "explanation":"{p_partkey=$12, p_name=$13, p_mfgr=$14, p_brand=$15, p_type=$16, p_size=$17, p_container=$18, p_retailprice=$19, p_comment=$20, s_suppkey=$5, s_name=$6, s_address=$7, s_nationkey=$8, s_phone=$9, s_acctbal=$10, s_comment=$11, ps_partkey=$0, ps_suppkey=$1, ps_availqty=$2, ps_supplycost=$3, ps_comment=$4}",
        "set":"set-5",
        "inputs":[ "52" ]
      }
    },
    "matchedRels":[ "47" ]
  }, {
    "id":"FINAL",
    "updates":{
      "13":{
        "cost":"{inf}"
      },
      "1":{
        "cost":"{inf}"
      },
      "14":{
        "cost":"{inf}"
      },
      "3":{
        "cost":"{inf}"
      },
      "16":{
        "cost":"{inf}"
      },
      "15":{
        "cost":"{inf}"
      },
      "17":{
        "cost":"{inf}"
      },
      "7":{
        "cost":"{inf}"
      },
      "19":{
        "cost":"{inf}"
      },
      "18":{
        "cost":"{inf}"
      },
      "21":{
        "cost":"{inf}"
      },
      "20":{
        "cost":"{inf}"
      },
      "23":{
        "cost":"{inf}"
      },
      "22":{
        "cost":"{inf}"
      },
      "24":{
        "inFinalPlan":true,
        "cost":"\nrowCount: 2.25E4\nrows: 8.0931E4\ncpu:  6.30303E5\nio:   0E0"
      },
      "25":{
        "cost":"{inf}"
      },
      "27":{
        "inFinalPlan":true,
        "cost":"\nrowCount: 1E2\nrows: 1E2\ncpu:  1.01E2\nio:   0E0"
      },
      "26":{
        "inFinalPlan":true,
        "cost":"\nrowCount: 1E2\nrows: 1E2\ncpu:  1.01E2\nio:   0E0"
      },
      "29":{
        "inFinalPlan":true,
        "cost":"\nrowCount: 1E2\nrows: 1E2\ncpu:  1.01E2\nio:   0E0"
      },
      "28":{
        "inFinalPlan":true,
        "cost":"\nrowCount: 1E2\nrows: 1E2\ncpu:  1.01E2\nio:   0E0"
      },
      "31":{
        "cost":"\nrowCount: 1E4\nrows: 1.002E5\ncpu:  2.02E2\nio:   0E0"
      },
      "30":{
        "cost":"\nrowCount: 1E4\nrows: 1.002E5\ncpu:  2.02E2\nio:   0E0"
      },
      "33":{
        "inFinalPlan":true,
        "cost":"\nrowCount: 1E2\nrows: 1E2\ncpu:  1.01E2\nio:   0E0"
      },
      "32":{
        "inFinalPlan":true,
        "cost":"\nrowCount: 1E2\nrows: 1E2\ncpu:  1.01E2\nio:   0E0"
      },
      "35":{
        "cost":"\nrowCount: 1E6\nrows: 1.01003E7\ncpu:  3.03E2\nio:   0E0"
      },
      "34":{
        "cost":"\nrowCount: 1E6\nrows: 1.01003E7\ncpu:  3.03E2\nio:   0E0"
      },
      "36":{
        "cost":"{inf}"
      },
      "38":{
        "inFinalPlan":true,
        "cost":"\nrowCount: 2.25E4\nrows: 5.8431E4\ncpu:  4.72803E5\nio:   0E0"
      },
      "37":{
        "cost":"\nrowCount: 2.25E4\nrows: 1.01228E7\ncpu:  1.000303E6\nio:   0E0"
      },
      "39":{
        "inFinalPlan":true,
        "cost":"\nrowCount: 2.25E4\nrows: 8.0931E4\ncpu:  6.30303E5\nio:   0E0"
      },
      "44":{
        "cost":"{inf}"
      },
      "43":{
        "cost":"{inf}"
      },
      "46":{
        "cost":"{inf}"
      },
      "45":{
        "cost":"{inf}"
      },
      "47":{
        "cost":"{inf}"
      },
      "48":{
        "cost":"\nrowCount: 2.25E4\nrows: 2.15003E5\ncpu:  3.03E2\nio:   0E0"
      },
      "50":{
        "inFinalPlan":true,
        "cost":"\nrowCount: 1.5E3\nrows: 2.262E3\ncpu:  2.02E2\nio:   0E0"
      },
      "49":{
        "inFinalPlan":true,
        "cost":"\nrowCount: 1.5E3\nrows: 2.262E3\ncpu:  2.02E2\nio:   0E0"
      },
      "52":{
        "inFinalPlan":true,
        "cost":"\nrowCount: 2.25E4\nrows: 3.5931E4\ncpu:  3.03E2\nio:   0E0"
      },
      "51":{
        "inFinalPlan":true,
        "cost":"\nrowCount: 2.25E4\nrows: 3.5931E4\ncpu:  3.03E2\nio:   0E0"
      },
      "53":{
        "inFinalPlan":true,
        "cost":"\nrowCount: 2.25E4\nrows: 5.8431E4\ncpu:  4.72803E5\nio:   0E0"
      }
    },
    "matchedRels":[ ]
  } ]
};
