import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

class Search extends React.Component {
  render() {
    return (
      <Input
        fullWidth
        id="input-with-icon-adornment"
        placeholder="search for any column value"
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

export default Search;
