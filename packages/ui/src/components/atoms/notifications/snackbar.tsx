import {SnackbarOwnProps} from "@mui/base";
import {Snackbar as MuiSnackbar, Slide, Alert} from "@mui/material";
import {SnackbarBody, SnackbarVariantType} from "./snackbarBody.tsx";
import React, {ReactNode} from "react";

interface SnackbarProps extends Omit<SnackbarOwnProps, 'children'> {
  title: string;
  text: ReactNode;
  variant: SnackbarVariantType;
  onClose: () => void;
}

const TransitionLeft = (props: any) => {
  return <Slide {...props} direction={'left'} children={props.children} />;
}

export const Snackbar = ({text, title, variant, ...props}: SnackbarProps) => {
  return (
    <MuiSnackbar {...props} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} transitionDuration={300} TransitionComponent={TransitionLeft}>
      <SnackbarBody handleClose={props.onClose} title={title} text={text} variant={variant} />
    </MuiSnackbar>
  );
}