import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import "./logout.css";

const Logout = ({ handleLogout }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const confirmLogout = () => {
    handleLogout();
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        onClick={handleClickOpen}
        style={{ textTransform: "none" }}
      >
        Logout
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          className: "logout-dialog",
        }}
      >
        <DialogTitle className="logout-title">Confirm Logout</DialogTitle>

        <DialogContent className="logout-content">
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>

        <DialogActions className="logout-actions">
          <Button onClick={handleClose} variant="outlined" color="primary">
            No
          </Button>
          <Button onClick={confirmLogout} variant="contained" color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Logout;