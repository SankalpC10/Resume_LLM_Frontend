import React from 'react';
import { Typography, Box, Card, CardContent, LinearProgress } from '@mui/material';

const SkillCard = ({ skill }) => {
  return (
    <Card sx={{ marginTop: '15px' }}>
      <CardContent>
        <Typography variant="h6">{skill.skill_name}</Typography>
        <Typography color="text.secondary">{skill.broad_skill_name} - {skill.skill_domain_name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <LinearProgress
            variant="determinate"
            value={skill.rating}
            sx={{ flexGrow: 1, marginRight: '10px' }}
          />
          <Typography>{skill.rating}%</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
          {skill.evidence}
        </Typography>
      </CardContent>
    </Card>
  );
};

const ResumeSummary = ({ resumeData }) => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h5">Resume Summary</Typography>
      <Typography sx={{ marginTop: '10px', marginBottom: '20px' }}>{resumeData.resume_summary}</Typography>

      {resumeData.skills.map((skill, index) => (
        <SkillCard key={index} skill={skill} />
      ))}
    </Box>
  );
};

export default ResumeSummary;