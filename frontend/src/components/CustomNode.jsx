import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ArrowRight, Delete, FileCopy } from "@mui/icons-material";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { TypeIcon } from "./TypeIcon";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./CustomNode.module.css";

export const CustomNode = (props) => {
  const { id, text, droppable, data } = props.node;
  const [hover, setHover] = useState(false);
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const indent = props.depth * 8;

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleShowInput = () => {
    setVisibleInput(true);
  };

  const handleCancel = () => {
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleChangeText = (e) => {
    setLabelText(e.target.value);
  };

  const handleSubmit = () => {
    setVisibleInput(false);
    props.onTextChange(id, labelText);
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);
  // if (dragOverProps) {
  //   console.log(props.isOpen, props.onToggle);
  // }
  return (
    <div
      className={`tree-node position-relative ${styles.root}`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="d-flex gap-1">
        <div className={`${styles.expandIconWrapper} ${props.isOpen ? styles.isOpen : ""}`}>
          {props.node.droppable && (
            <div onClick={handleToggle}>
              <ArrowRight />
            </div>
          )}
        </div>
        <div>
          <TypeIcon droppable={droppable} fileType={data?.fileType} />
        </div>
        <div>
          <Typography variant="body2" onClick={() => {props.onFileSelect(props.node)}}>{props.node.text}</Typography>
        </div>
      </div>
      {hover && (
        <>
          {visibleInput ? (
            <div className={`d-flex gap-3 align-items-center position-absolute ${styles.inputWrapper}`}>
              <TextField
                className={`${styles.textField}
              ${styles.nodeInput}`}
                value={labelText}
                onChange={handleChangeText}
              />
              <div className="d-flex align-items-center">
                <IconButton
                  className={styles.editButton}
                  onClick={handleSubmit}
                  disabled={labelText === ""}
                >
                  <CheckIcon className={styles.editIcon} />
                </IconButton>
                <IconButton className={styles.editButton} onClick={handleCancel}>
                  <CloseIcon className={styles.editIcon} />
                </IconButton>
              </div>
            </div>
          ) : (
            <div className="d-flex gap-1 align-items-center">
              <div className={styles.inputWrapper}>
                {/* <Typography variant="body2" className={styles.nodeLabel}>
                {props.node.text}
              </Typography> */}
                <IconButton className={styles.editButton} onClick={handleShowInput}>
                  <EditIcon className={styles.editIcon} />
                </IconButton>
              </div>
              <div>
                <IconButton size="small" onClick={() => props.onDelete(id)}>
                  <Delete fontSize="small" />
                </IconButton>
              </div>
              {/* <div>
                <IconButton size="small" onClick={() => props.onCopy(id)}>
                  <FileCopy fontSize="small" />
                </IconButton>
              </div> */}
            </div>
          )}
        </>
      )}
    </div>
  );
};
