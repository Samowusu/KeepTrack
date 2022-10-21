import React, { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  onCancel: () => void;
  onSave: (project: Project) => void;
  project: Project;
}

interface ErrorObj {
  name: string;
  description: string;
  budget: string;
}

export function ProjectForm({ onCancel, onSave, project }: ProjectFormProps) {
  const [projectState, setProjectState] = useState<Project>(project);
  const [errorState, setErrorState] = useState<ErrorObj>({
    name: "",
    budget: "",
    description: "",
  });

  function validate(project: Project): ErrorObj {
    let errors: ErrorObj = { name: "", description: "", budget: "" };
    if (project.name.length === 0) {
      errors.name = "Name is required";
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = "Name needs to be at least 3 characters.";
    }
    if (project.description.length === 0) {
      errors.description = "Description is required.";
    }
    if (project.budget === 0) {
      errors.budget = "Budget must be more than $0.";
    }
    return errors;
  }

  function isValid(): boolean {
    return (
      errorState.name.length === 0 &&
      errorState.description.length === 0 &&
      errorState.budget.length === 0
    );
  }

  const handleChange: (event: any) => void = (event: any) => {
    const { type, name, value, checked } = event.target;
    // if input type is checkbox use checked
    // otherwise it's type is text, number etc. so use value
    let updatedValue = type === "checkbox" ? checked : value;
    //if input type is number convert the updatedValue string to a +number
    if (type === "number") {
      updatedValue = Number(updatedValue);
    }
    const change = {
      [name]: updatedValue,
    };

    let updatedProject: Project;
    // need to do functional update b/c
    // the new project state is based on the previous project state
    // so we can keep the project properties that aren't being edited +like project.id
    // the spread operator (...) is used to
    // spread the previous project properties and the new change
    setProjectState((p) => {
      updatedProject = new Project({ ...p, ...change });
      return updatedProject;
    });

    setErrorState(() => validate(updatedProject));
  };

  const handleSubmit: (event: SyntheticEvent) => void = (
    event: SyntheticEvent
  ) => {
    event.preventDefault();
    if (!isValid()) return;
    onSave(projectState);
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={projectState.name}
        onChange={handleChange}
      />
      {errorState.name.length > 0 && (
        <div className="card error">
          <p>{errorState.name}</p>
        </div>
      )}
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={projectState.description}
        onChange={handleChange}
      />
      {errorState.description.length > 0 && (
        <div className="card error">
          <p>{errorState.description}</p>
        </div>
      )}
      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={projectState.budget}
        onChange={handleChange}
      />
      {errorState.budget.length > 0 && (
        <div className="card error">
          <p>{errorState.budget}</p>
        </div>
      )}
      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
        checked={projectState.isActive}
        onChange={handleChange}
      />
      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}
