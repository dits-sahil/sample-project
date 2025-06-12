import * as React from "react";
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../common-components/button";

interface AlertDialogProps {
  open: boolean;
  handleAlert: (open: boolean) => void;
  confirmAction: () => void;
  title: string;
  content: string;
}

const AlertDialog:React.FC<AlertDialogProps> = (
 { open, handleAlert, confirmAction, title, content }
) => {
  return (
     <Dialog
        open={open}
        onClose={() => handleAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
             
          <Button label="Cancel" onClick={() => handleAlert(false)} variant="outlined" />
        <Button label="Proceed" onClick={confirmAction} variant="contained" />
        </DialogActions>
      </Dialog>
  );
};
export default AlertDialog;
