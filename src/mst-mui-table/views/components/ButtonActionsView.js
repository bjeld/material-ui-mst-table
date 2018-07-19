import React from "react";
import ButtonAction from "./ButtonAction";

const ButtonActionsView = ({ buttonActions }) => {
  return buttonActions.map(buttonAction => (
    <ButtonAction key={`buttonAction${buttonAction.type}`} buttonAction={buttonAction} />
  ));
};

export default ButtonActionsView;
