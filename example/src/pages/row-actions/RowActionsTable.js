import React from "react";

import faker from "faker";

import { Typography } from "@material-ui/core";

import Search from "../../components/Search";

import {
  MstMuiTable,
  TableModel,
  columnBuilder,
  RowAction,
  ColumnList,
  Data,
  Filter
} from "material-ui-mst-table";

import { observer } from "mobx-react";

const SEARCH_FILTER = "searchFilter";

class RowActionsTable extends React.Component {

  createSearchFilter = () => {
    const searchFilter = Filter.create({ id: SEARCH_FILTER, value: "" });
    searchFilter.setRules((data, value) => {
      const candidate = data.getFieldValue("productName").toLowerCase();
      return candidate.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
    return searchFilter;
  };

  constructor(props) {
    super(props);

    this.tableModel = TableModel.create({
      orderBy: "productName",
      order: "desc",
      columnList: ColumnList.create({
        showCheckbox: false,
        columns: [
          columnBuilder("productName", "Product", value => value),
          columnBuilder("productMaterial", "Material", value => value),
          columnBuilder("price", "Price", value => value, {
            align: "right"
          })
        ],
      }),
      rowActions: [
        RowAction.create({type: "delete", tooltip: "Delete"}),
        RowAction.create({type: "copy", tooltip: "Copy"}),
      ]
    });

    this.tableModel.addFilter(this.createSearchFilter());

    for (let i = 0; i < 100; i++) {
      this.tableModel.add(this.createDummyData());
    }
  }

  createDummyData = () => {
    return Data.create({
      id: `${Math.ceil(Math.random() * 100000000)}`,
      fieldNames: {
        productName: faker.fake("{{commerce.productName}}"),
        productMaterial: faker.fake("{{commerce.productMaterial}}"),
        price: faker.fake("{{commerce.price}}"),
      }
    });
  };

  handleSearchValueChange = value => {
    this.tableModel.getFilter(SEARCH_FILTER).update(value);
  };

  handleRowAction = (data, rowAction) => {
    alert(`Row Action for ${data.getFieldValue("productName")} is ${rowAction.type}`);
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent:"center" }}>
        <div style={{ width: 600 }}>
          <Typography variant="h6">{`${
              this.tableModel.numRowCount
            } Product items`}</Typography>
          <MstMuiTable 
            onRowAction={this.handleRowAction} 
            tableModel={this.tableModel} 
            
            slotForLeftToolbarArea={
              <Search
                placeholder="Search for a product"
                value={this.tableModel.getFilter(SEARCH_FILTER).value}
                onValueChange={this.handleSearchValueChange}
              />
            }
          />
        </div>
      </div>
    )
  }
}

export default observer(RowActionsTable)
