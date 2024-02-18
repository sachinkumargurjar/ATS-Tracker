import React, { useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import UploadedFileCard from "./filecard";
import Navbar from "./navbar";
import axios from 'axios';
import {sendResumesToBackend} from "./api/endpoints";


const FileUploadBox = ( {setOpen}) => {
  const fileInputRef = useRef(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    console.log(files);
    const newFiles = Array.from(files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    console.log(uploadedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleCancel = () => {
    setUploadedFiles([]);
    setOpen(false);
  };

  const handleAttachFiles = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append('jobRole',jobRole);
    // formData.append('jobDescription',jobDescription);

    let promises = [];

    uploadedFiles.forEach((file)=> {
        // formData.append(`files`,file);
        promises.push(sendResumesToBackend(file));
    });
    Promise.all(promises).then((values) => console.log(values));
    setOpen(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const files = e.dataTransfer.files;
    const newFiles = Array.from(files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    console.log(uploadedFiles);
  };

  return (
    <>
    <Navbar/>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      marginTop="50px"
    >
      <Box
        width="640px"
        height="120px"
        border="2px solid blue"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        style={{ cursor: isDraggingOver ? "grabbing" : "pointer" }}
      >
        <CloudUploadIcon sx={{ fontSize: 48 }} />
        <Box marginLeft="16px">
          <Typography variant="body1" color="primary" display="inline">
            Click to upload pdf
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            display="inline"
            marginLeft="8px"
          >
            or drag and drop
          </Typography>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            style={{ display: "none" }}
            multiple
          />
        </Box>
      </Box>
      {uploadedFiles.length > 0 && (
        <Box marginTop="20px" width="640px" height="auto">
          <Typography variant="h6">Uploaded Files:</Typography>
          {uploadedFiles.map((file, index) => (
            <UploadedFileCard
              key={index}
              file={file}
            />
          ))}
        </Box>
      )}
      <Box marginTop="10px" display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          style={{
            width: "154px",
            height: "44px",
            padding: "10px 48px",
            borderRadius: "8px",
            border: "1px solid #D0D5DD",
            background:
              "linear-gradient(0deg, #D0D5DD, #D0D5DD), linear-gradient(0deg, #FFFFFF, #FFFFFF)",
            gap: "6px",
            marginRight: "15px", // Add margin to create space between buttons
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="primary"
          style={{
            width: "189px",
            height: "44px",
            padding: "10px 48px",
            borderRadius: "8px",
            border: "1px solid #423DDB",
            background:
              "linear-gradient(0deg, #423DDB, #423DDB), linear-gradient(0deg, #5E5ADB, #5E5ADB)",
            boxShadow: "0px 1px 2px 0px #1018280D",
            gap: "6px",
          }}
          onClick={handleAttachFiles}
        >
          Attach Files
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default FileUploadBox;
