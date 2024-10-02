import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResumeUpload from './ResumeUpload';
import ResumeSummary from './ResumeSummary';
import ProjectPage from './components/ProjectPage';
import { Container, Box } from '@mui/material';

const App = () => {
  const [resumeData, setResumeData] = useState(null);

  return (
    <Router>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', padding: '20px' }}>
          <Routes>
            {/* Default route for resume upload and summary */}
            <Route 
              path="/" 
              element={!resumeData ? <ResumeUpload setResumeData={setResumeData} /> : <ResumeSummary resumeData={resumeData} />}
            />
            
            {/* Dynamic project page route */}
            <Route path="/TalentX/Projects" element={<ProjectPage />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;
