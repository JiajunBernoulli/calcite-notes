/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.github.jiajun.calcite.example.cbo.schema;

import com.google.common.collect.ImmutableList;
import org.apache.calcite.DataContext;
import org.apache.calcite.linq4j.Enumerable;
import org.apache.calcite.rel.type.RelDataType;
import org.apache.calcite.rel.type.RelDataTypeFactory;
import org.apache.calcite.schema.ScannableTable;
import org.apache.calcite.schema.Statistic;
import org.apache.calcite.schema.Statistics;
import org.apache.calcite.schema.impl.AbstractTable;

public final class TpchTable extends AbstractTable implements ScannableTable {

  private final RelDataType dataType;
  private final Double rowCount;

  public TpchTable(RelDataType dataType, Double rowCount) {
    this.dataType = dataType;
    this.rowCount = rowCount;
  }

  @Override
  public RelDataType getRowType(final RelDataTypeFactory typeFactory) {
    return typeFactory.copyType(dataType);
  }

  @Override
  public Statistic getStatistic() {
    return Statistics.of(rowCount,
        ImmutableList.of(),
        ImmutableList.of());
  }

  @Override
  public Enumerable<Object[]> scan(DataContext dataContext) {
    return null;
  }
}
