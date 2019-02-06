import React from "react";

// MobX
import { observer } from "mobx-react";

// Fakedata
import faker from "faker";

// Components
import Search from "../../components/Search";

// Material-UI
import { Typography } from "@material-ui/core";

// material-ui-mst-table
import {
  MstMuiTable,
  TableModel,
  columnBuilder,
  CellTextEditable,
  Filter,
  ColumnList,
  Data,
} from "material-ui-mst-table";

const SEARCH_FILTER = "searchFilter";

class KeyValueTable extends React.Component {

  createSearchFilter = () => {
    const searchFilter = Filter.create({ id: SEARCH_FILTER, value: "" });
    searchFilter.setRules((data, value) => {
      const candidate = data.getFieldValue("value").toLowerCase();
      return candidate.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
    return searchFilter;
  };

  constructor(props) {
    super(props);

    this.tableModel = TableModel.create({
      orderBy: "value",
      order: "desc",
      columnList: ColumnList.create({
        showCheckbox: false,
        columns: [
          columnBuilder("key", "Key", value => <span style={{fontWeight: 500}}>{value}</span>),
          columnBuilder("value", "Value", (value, data) => {
            return(
              <div style={{ width: 250}}>
                <CellTextEditable
                  value={value}
                  onValueChanged={newValue => {
                    // optimistic update
                    data.setFieldValue("value", newValue);
                  }}
                />
              </div>
            )
          })
        ]
      })
    })

    this.tableModel.addFilter(this.createSearchFilter());

    for (let i = 0; i < 100; i++) {
      this.tableModel.add(this.createDummyData());
    }
  }

  createDummyData = () => {
    return Data.create({
      id: `${Math.ceil(Math.random() * 100000000)}`,
      fieldNames: {
        key: faker.fake("{{random.word}}"),
        value: faker.fake("{{random.word}}")
      }
    });
  };

  handleSearchValueChange = value => {
    this.tableModel.getFilter(SEARCH_FILTER).update(value);
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent:"center" }}>
        <div style={{ width: 500 }}>
          <Typography variant="h6">{`${
              this.tableModel.numRowCount
            } KeyValue items`}</Typography>
          <MstMuiTable tableModel={this.tableModel} 
            slotForLeftToolbarArea={
              <Search
                placeholder="Search on value"
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

export default observer(KeyValueTable);