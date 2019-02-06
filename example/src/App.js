import React from "react";
import TableNutritions from "./pages/nutrition/TableNutritions";
import Main from "./scaffold/Main";

class App extends React.Component {
  render() {
    return (
      <Main>
        <TableNutritions />
      </Main>
    );
  }
}

export default App;
