import React, { useState, useEffect } from "react";
import { Project } from "./Project";
import { ProjectList } from "./ProjectList";
import { projectAPI } from "./projectAPI";

export function ProjectsPage() {
  const [projectsState, setProjectsState] = useState<Project[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<string | undefined>(undefined);
  const [currentPageState, setCurrentPageState] = useState<number>(1);

  useEffect(() => {
    async function loadProjects() {
      setLoadingState(true);
      try {
        const data = await projectAPI.get(currentPageState);
        setProjectsState(data);
        if (currentPageState === 1) {
          setProjectsState(data);
        } else {
          setProjectsState((projects) => [...projects, ...data]);
        }
      } catch (e) {
        if (e instanceof Error) {
          setErrorState(e.message);
        }
      } finally {
        setLoadingState(false);
      }
    }
    loadProjects();
  }, [currentPageState]);

  const saveProject = (project: Project) => {
    projectAPI
      .put(project)
      .then((updatedProject) => {
        let updatedProjects = projectsState.map((p: Project) => {
          return p.id === project.id ? new Project(updatedProject) : p;
        });
        setProjectsState(updatedProjects);
      })
      .catch((e) => {
        if (e instanceof Error) {
          setErrorState(e.message);
        }
      });
  };

  const handleMoreClick: () => void = () => {
    setCurrentPageState((currentPage) => currentPage + 1);
  };

  return (
    <>
      <h1>Projects</h1>
      {errorState && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {errorState}
              </p>
            </section>
          </div>
        </div>
      )}
      <ProjectList projects={projectsState} onSave={saveProject} />
      {!loadingState && !errorState && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}

      {loadingState && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}
