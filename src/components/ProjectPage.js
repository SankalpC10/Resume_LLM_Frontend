import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import './ProjectPage.css';

const ProjectPage = () => {
  const { projectId } = useParams();

  // Assuming we fetch the project details with the ID, but using static data for now
  const projectData = {
    projectTitle: "Student-Company Project",
    aboutProject: "Project Overview: This project aims to connect companies with students seeking real-world experience...",
    projectDeliverables: "Success Criteria: A functional platform facilitating project posting...",
    function: "Technology",
    aboutCompany: "DDPL is an international staffing and services company...",
    companyName: "DDPL",
    companyWebsite: "www.ddpl.fyi",
    companyLogoUrl: "https://fern-staging-media-static-assets.s3.amazonaws.com/company-logo/1726230151830-company.jpeg"
  };

  return (
    <div className="project-page">
      <Helmet>
        <title>{projectData.projectTitle} | {projectData.companyName}</title>
        <meta name="description" content={projectData.aboutProject} />
        <meta property="og:title" content={projectData.projectTitle} />
        <meta property="og:description" content={projectData.aboutProject} />
        <meta property="og:image" content={projectData.companyLogoUrl} />
        <meta property="og:url" content={`https://fernglasz.web.app/TalentX/Projects/${projectId}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={projectData.projectTitle} />
        <meta name="twitter:description" content={projectData.aboutProject} />
        <meta name="twitter:image" content={projectData.companyLogoUrl} />
      </Helmet>

      <div className="project-header">
        <img src={projectData.companyLogoUrl} alt={`${projectData.companyName} Logo`} className="company-logo" />
        <div>
          <h1>{projectData.projectTitle}</h1>
          <p>by <a href={projectData.companyWebsite} target="_blank" rel="noopener noreferrer">{projectData.companyName}</a></p>
        </div>
      </div>

      <div className="project-details">
        <section>
          <h2>About the Project</h2>
          <p>{projectData.aboutProject}</p>
        </section>

        <section>
          <h2>Deliverables</h2>
          <p>{projectData.projectDeliverables}</p>
        </section>

        <section>
          <h2>About the Company</h2>
          <p>{projectData.aboutCompany}</p>
          <a href={projectData.companyWebsite} target="_blank" rel="noopener noreferrer">
            Visit Company Website
          </a>
        </section>
      </div>
    </div>
  );
};

export default ProjectPage;
