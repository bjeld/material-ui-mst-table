import React from "react";
import { observer } from "mobx-react";
import TableCell from "@material-ui/core/TableCell";

class MstMuiColumn extends React.Component {
  render() {
    const { column, value, data } = this.props;

    return <TableCell numeric={column.numeric}>{column.renderer(value, data)}</TableCell>;
  }
}

export default observer(MstMuiColumn);
