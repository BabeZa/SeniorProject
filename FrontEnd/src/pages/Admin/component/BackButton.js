import React from "react";
import { Button } from "react-admin";
import { withRouter } from "react-router";

const BackButton = ({ history: { goBack }, label, color, variant, style }) => {
  return (
    <Button
      onClick={goBack}
      label={label}
      color={color}
      variant={variant}
      style={style}
    />
  );
};

export default withRouter(BackButton);
