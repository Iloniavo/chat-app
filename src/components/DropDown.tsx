import React, { useState } from "react";
import { Button, Collapse, ListItemButton, Typography } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";

const DropdownButtons = ({ title, children, startIcon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const getArrowRotation = (isOpen: boolean) => {
    return isOpen ? "rotate(90deg)" : "rotate(0deg)";
  };

  return (
    <div>
      <ListItemButton
        variant="contained"
        onClick={handleClick}
        sx={{ pl: 4 }}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {" "}
        {startIcon}
        <div
          style={{ marginLeft: "10px", marginRight: "17  px", width: "50%" }}
        >
          <Typography variant={"h6"}>{title}</Typography>
        </div>
        <ArrowRight
          style={{
            transition: "transform 0.3s ease",
            transform: getArrowRotation(isOpen),
          }}
          sx={{ mr: 9 }}
        />
      </ListItemButton>
      <Collapse in={isOpen}>{children}</Collapse>
    </div>
  );
};

export default DropdownButtons;
