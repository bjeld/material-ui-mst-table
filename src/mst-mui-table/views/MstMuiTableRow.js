import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import { observer } from "mobx-react";
import MstMuiColumn from "./MstMuiColumn";

let shiftKey = false;

class MstMuiTableRow extends React.Component {
  handleClick = event => (shiftKey = event.shiftKey);
  handleChange = (event, checked) => this.props.data.updateIsSelected(checked, shiftKey);

  render() {
    const { data, columnList } = this.props;
    return (
      <TableRow hover selected={data.isSelected} aria-checked={data.isSelected} role="checkbox" tabIndex={-1}>
        {columnList.showCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox checked={data.isSelected} onClick={this.handleClick} onChange={this.handleChange} />
          </TableCell>
        )}
        {columnList.visibleColumns.map(column => (
          <MstMuiColumn
            key={`MstMuiColumn_${column.fieldName}`}
            column={column}
            value={data.fieldNames.get(column.fieldName)}
            data={data}
          />
        ))}
      </TableRow>
    );
  }
}

export default observer(MstMuiTableRow);
