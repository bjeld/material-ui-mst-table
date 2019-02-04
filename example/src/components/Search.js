import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { observer } from "mobx-react";

class Search extends React.Component {
  handleChange = event => this.props.onValueChange(event.currentTarget.value);
  render() {
    return (
      <Input
        value={this.props.value}
        onChange={this.handleChange}
        fullWidth
        id="material-ui-mst-table-search"
        placeholder="Search on dessert name"
        disableUnderline
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    );
  }
}

export default observer(Search);
