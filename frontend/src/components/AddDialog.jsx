import React, { useState } from "react";
import {
  Button,
  Select,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import styles from "./AddDialog.module.css";

export const AddDialog = (props) => {
  const [text, setText] = useState("");
  const [parent, setParent] = useState(0);
  const [droppable, setDroppable] = useState(true);

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleChangeParent = (e) => {
    setParent(Number(e.target.value));
  };


  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>Добавить папку</DialogTitle>
      <DialogContent className={styles.content}>
        <div>
          <TextField label="Text" onChange={handleChangeText} value={text} />
        </div>
        <div>
          <FormControl className={styles.select}>
            <InputLabel>Родитель</InputLabel>
            <Select label="Parent" onChange={handleChangeParent} value={parent}>
              <MenuItem value={0}>(root)</MenuItem>
              {props.tree
                .filter((node) => node.droppable === true)
                .map((node) => (
                  <MenuItem key={node.id} value={node.id}>
                    {node.text}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button
          disabled={text === ""}
          onClick={() =>
            props.onSubmit({
              text,
              parent,
              droppable,
            })
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
