import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Progress } from "./components/ui/progress"
import config from './config';

const ResumeSkillDashboard = () => {
  const [file, setFile] = useState(null);
  const [skillsData, setSkillsData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);

    try {
      const response = await fetch(`${config.backendUrl}/v1/resume/generate-skill-rating-from-pdf`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setSkillsData(data);
      setError(null);
    } catch (error) {
      setError("Error uploading resume or generating skill ratings.");
      setSkillsData(null);
    }

    setIsLoading(false);
  };

  const SkillCard = ({ skill }) => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{skill.skill_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Broad Skill:</strong> {skill.broad_skill_name}</p>
        <p><strong>Domain:</strong> {skill.skill_domain_name}</p>
        <div className="mt-2">
          <Progress value={skill.rating} className="w-full" />
        </div>
        <p className="mt-2"><strong>Rating:</strong> {skill.rating}%</p>
        <p className="mt-2 text-sm"><strong>Evidence:</strong> {skill.evidence}</p>
      </CardContent>
    </Card>
  );

  const SkillsChart = ({ skills }) => {
    const chartData = skills.map(skill => ({
      name: skill.skill_name,
      rating: skill.rating
    }));

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="rating" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resume Skill Analyzer</h1>
      
      <div className="mb-4">
        <input type="file" onChange={handleFileChange} accept="application/pdf" className="mr-2" />
        <button 
          onClick={handleSubmit} 
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isLoading ? "Processing..." : "Analyze Resume"}
        </button>
      </div>

      {isLoading && (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p>AI is processing your resume. Please wait...</p>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {skillsData && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Resume Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{skillsData.resume_summary}</p>
            </CardContent>
          </Card>

          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Skills Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <SkillsChart skills={skillsData.skills} />
            </CardContent>
          </Card>

          {skillsData.skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeSkillDashboard;