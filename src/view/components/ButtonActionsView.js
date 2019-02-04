import React from "react";
import ButtonAction from "./ButtonAction";

const ButtonActionsView = ({ buttonActions, onButtonAction }) => {
  return buttonActions.map(buttonAction => (
    <ButtonAction
      key={`buttonAction${buttonAction.type}`}
      buttonAction={buttonAction}
      onButtonAction={onButtonAction}
    />
  ));
};

export default ButtonActionsView;
