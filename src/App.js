import React, { useState } from 'react';
import ResumeUpload from './ResumeUpload';
import ResumeSummary from './ResumeSummary';
import { Container, Box } from '@mui/material';

const App = () => {
  const [resumeData, setResumeData] = useState(null);

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <h1>Resume Skill Analyzer</h1>
        {!resumeData ? (
          <ResumeUpload setResumeData={setResumeData} />
        ) : (
          <ResumeSummary resumeData={resumeData} />
        )}
      </Box>
    </Container>
  );
};

export default App;