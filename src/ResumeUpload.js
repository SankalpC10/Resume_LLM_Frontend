import React, { useState } from "react";
import axios from "axios";
import './ResumeUpload.css'; // Import the updated CSS

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [skillsData, setSkillsData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  // Add loading state

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);  // Show the loader

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/v1/resume/generate-skill-rating-from-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSkillsData(response.data);
      setError(null);
    } catch (error) {
      setError("Error uploading resume or generating skill ratings.");
      setSkillsData(null);
    }

    setIsLoading(false);  // Hide the loader
  };

  return (
    <div className="resume-upload-container">
      <div className="upload-box">
        <h2>Upload Your Resume</h2>
        <input type="file" onChange={handleFileChange} accept="application/pdf" />
        <button className="submit-button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </div>

      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>AI is processing your resume. Please wait...</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {skillsData && !isLoading && (
        <div className="skills-output">
          <div className="summary-box">
            <h3>Resume Summary</h3>
            <p className="summary">{skillsData.resume_summary}</p>
          </div>

          <h3>Skills Overview</h3>
          <div className="skills-grid">
            {skillsData.skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <h4>{skill.skill_name}</h4>
                <p><strong>Broad Skill:</strong> {skill.broad_skill_name}</p>
                <p><strong>Domain:</strong> {skill.skill_domain_name}</p>
                <p><strong>Rating:</strong> {skill.rating}%</p>
                <p className="evidence"><strong>Evidence:</strong> {skill.evidence}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
