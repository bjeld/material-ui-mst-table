import React from "react";
import NutritionsTable from "./pages/nutrition/NutritionsTable";
import Main from "./scaffold/Main";
import KeyValueTable from "./pages/keyvalue/KeyValueTable";
import RowActionsTable from "./pages/row-actions/RowActionsTable";

const Tables = {
  0: <NutritionsTable />,
  1: <KeyValueTable />,
  2: <RowActionsTable />,
}

class App extends React.Component {

  state = {
    selectedTabIndex: 0
  }

  handleTapChange = index => {
    this.setState({selectedTabIndex: index})
  }

  render() {
    return (
      <Main onTapChange={this.handleTapChange}>
        {
          Tables[this.state.selectedTabIndex]
        }
      </Main>
    );
  }
}

export default App;
