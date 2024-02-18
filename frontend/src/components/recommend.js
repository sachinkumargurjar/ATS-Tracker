import React, {useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Navbar from "./navbar";
import Modal from "./details";

const Recommend = ({data}) => {
  const [selectedResume, setSelectedResume] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Resumes = [
    {
      name: "sachin",
      relevancyScore: "10",
      resumeLink: "bkfdsbfkj",
      details: "bvfjsfv",
    },
    {
      name: "sachin",
      relevancyScore: "10",
      resumeLink: "bkfdsbfkj",
      details: "bvfjsfv",
    },
    {
      name: "sachin",
      relevancyScore: "10",
      resumeLink: "bkfdsbfkj",
      details: "bvfjsfv",
    },
  ];
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDetails = (resume) => {
    setSelectedResume(resume);
    setIsModalOpen(true);
  };

  const ResumeSection = ({ resumes }) => {
    return (
      <>
      <Navbar/>
      <Box maxHeight="300px" overflowY="auto">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {" "}
              {/* Added TableHead */}
              <TableRow>
                {" "}
                {/* Added TableRow */}
                <TableCell>Name</TableCell>
                <TableCell>Relevancy Score</TableCell>
                <TableCell>Resume Link</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resumes.map((resume, index) => (
                <TableRow key={index}>
                  <TableCell>{resume?.output?.user?.name}</TableCell>
                  <TableCell>{resume?.score}</TableCell>
                  <TableCell>
                    <a
                      href={resume?.resumeLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Link
                    </a>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleDetails(resume?.output)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {isModalOpen && (
        <Modal
          user={selectedResume}
          handleClose={handleCloseModal}
        />
      )}
      </>
      
    );
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box
        marginBottom="20px"
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography minWidth="300px" variant="h6">Recommended Resumes</Typography>
        <Box marginLeft="20px">
          {" "}
          {/* Add marginLeft to create space between the components */}
          <ResumeSection resumes={data} />
        </Box>
      </Box>

      {/* <Box marginBottom="20px"
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center">
        <Typography minWidth="300px" variant="h6">Non-Recommended Resumes</Typography>
        <Box marginLeft="20px">
          {" "}
          <ResumeSection resumes={Resumes} />
        </Box>
      </Box> */}
    </Box>
  );
};

export default Recommend;
