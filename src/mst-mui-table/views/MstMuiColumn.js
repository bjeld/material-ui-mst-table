import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { observer } from "mobx-react";

class MstMuiColumn extends React.Component {
  render() {
    const { column, value, data, classes, ...other } = this.props;

    return (
      <TableCell numeric={column.numeric} {...other}>
        {column.renderer(value, data)}
      </TableCell>
    );
  }
}

export default observer(MstMuiColumn);
