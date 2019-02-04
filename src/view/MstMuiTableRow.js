import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import { observer } from "mobx-react";
import MstMuiColumn from "./MstMuiColumn";
import SingleRowAction from "./components/SingleRowAction";
import MultipleRowActions from "./components/MultipleRowActions";

let shiftKey = false;

class MstMuiTableRow extends React.Component {
  handleClick = event => (shiftKey = event.shiftKey);
  handleChange = (event, checked) =>
    this.props.data.updateIsSelected(checked, shiftKey);

  render() {
    const { data, columnList, rowActions, onRowAction } = this.props;
    return (
      <TableRow
        hover
        selected={data.isSelected}
        aria-checked={data.isSelected}
        role="checkbox"
        tabIndex={-1}
      >
        {columnList.showCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              checked={data.isSelected}
              onClick={this.handleClick}
              onChange={this.handleChange}
            />
          </TableCell>
        )}
        {columnList.visibleColumns.map((column, i) => (
          <MstMuiColumn
            key={`MstMuiColumn_${column.fieldName}`}
            column={column}
            value={data.fieldNames.get(column.fieldName)}
            data={data}
            padding={columnList.showCheckbox && i === 0 ? "none" : "default"}
          />
        ))}

        {rowActions.length > 0 && (
          <TableCell numeric>
            {rowActions.length === 1 && (
              <SingleRowAction
                data={data}
                rowAction={rowActions[0]}
                onRowAction={onRowAction}
              />
            )}
            {rowActions.length > 1 && (
              <MultipleRowActions
                data={data}
                rowActions={rowActions}
                onRowAction={onRowAction}
              />
            )}
          </TableCell>
        )}
      </TableRow>
    );
  }
}

export default observer(MstMuiTableRow);
