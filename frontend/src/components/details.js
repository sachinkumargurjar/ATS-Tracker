import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Modal = ({ handleClose, user }) => {
  const [activeTab, setActiveTab] = useState('projects');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <Box border="2px solid black" borderRadius="10px" padding="20px" width="600px" position="relative" backgroundColor="white">
        <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={handleClose}>
          X
        </div>
        <Typography variant="h5">User Details</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button variant={activeTab === 'projects' ? 'contained' : 'outlined'} onClick={() => handleTabChange('projects')}>Projects</Button>
          <Button variant={activeTab === 'professional_experience' ? 'contained' : 'outlined'} onClick={() => handleTabChange('professional_experience')}>Professional Experience</Button>
          <Button variant={activeTab === 'college' ? 'contained' : 'outlined'} onClick={() => handleTabChange('college')}>College</Button>
        </div>
        <div style={{ marginTop: '20px' }}>
          {activeTab === 'projects' && (
            <>
              <Typography variant="h6">Projects</Typography>
              {user.projects.map((project, index) => (
                <div key={index}>
                  <Typography variant="subtitle1">{project?.project_title}</Typography>
                  <Typography>{project?.short_description}</Typography>
                </div>
              ))}
            </>
          )}
          {activeTab === 'professional_experience' && (
            <>
              <Typography variant="h6">Professional Experience</Typography>
              {user.professional_experience.map((exp, index) => (
                <div key={index}>
                  <Typography variant="subtitle1">{exp?.role} at {exp?.organization}</Typography>
                  <Typography>{exp?.short_description}</Typography>
                </div>
              ))}
            </>
          )}
          {activeTab === 'college' && (
            <>
              <Typography variant="h6">College</Typography>
              <Typography variant="subtitle1">{user?.college.name}</Typography>
              <Typography>{user.college.branch}, {user?.college.degree}</Typography>
              <Typography>CGPA: {user?.college.cgpa}</Typography>
            </>
          )}
        </div>
      </Box>
    </div>
  );
};

export default Modal;
