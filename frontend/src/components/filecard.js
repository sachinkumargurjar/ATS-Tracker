import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

const UploadedFileCard = ({ file, onSelect }) => {
  const handleSelect = (event) => {
    onSelect(file, event.target.checked);
  };

  return (
    <Card variant="outlined" style={{ marginBottom: "10px" }}>
      <CardContent style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography variant="body1">{file.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            Size: {file.size} bytes
          </Typography>
        </div>
        <Checkbox onChange={handleSelect} />
      </CardContent>
    </Card>
  );
};

export default UploadedFileCard;
