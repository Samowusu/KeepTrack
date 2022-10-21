import React, { useState } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import { ProjectList } from "./ProjectList";

export function ProjectsPage() {
  const [projectsState, setProjectsState] = useState<Project[]>(MOCK_PROJECTS);

  const saveProject = (project: Project) => {
    let updatedProjects = projectsState.map((p: Project) => {
      return p.id === project.id ? project : p;
    });
    setProjectsState(updatedProjects);
  };

  return (
    <>
      <h1>Projects</h1>
      <ProjectList projects={projectsState} onSave={saveProject} />
    </>
  );
}
