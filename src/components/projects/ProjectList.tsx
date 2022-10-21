import React, { useState } from "react";
import { Project } from "./Project";
import { ProjectCard } from "./ProjectCard";
import { ProjectForm } from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}

export function ProjectList({ projects, onSave }: ProjectListProps) {
  const [projectBeingEditedState, setProjectBeingEditedState] = useState({});

  const handleEdit = (project: Project) => {
    setProjectBeingEditedState(project);
  };

  const cancelEditing = () => {
    setProjectBeingEditedState({});
  };
  return (
    <ul className="row">
      {projects.map((project) => (
        <div className="cols-sm" key={project.id}>
          {projectBeingEditedState === project ? (
            <ProjectForm
              onCancel={cancelEditing}
              onSave={onSave}
              project={project}
            />
          ) : (
            <ProjectCard project={project} onEdit={handleEdit} />
          )}
        </div>
      ))}
    </ul>
  );
}
