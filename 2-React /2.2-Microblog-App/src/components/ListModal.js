import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Alert, List } from "@mui/material";
import UserProfile from "./UserProfile";

const style = {
  height: "50%",
  backgroundColor: "#272727",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "scroll",
  boxShadow: 24,
};

export default function ListModal({ data, buttonText, errorMessage, userId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{buttonText}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <List sx={style}>
          {data.map((otherUser) => {
            return (
              <UserProfile
                key={otherUser.id}
                otherUser={otherUser}
                userId={userId}
              />
            );
          })}
          {!data[0] && <Alert severity="warning">{errorMessage}</Alert>}
        </List>
      </Modal>
    </div>
  );
}
