import React, { createContext, useState, useContext } from 'react';
import { simulateApiCall } from '../utils/api';

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    { id: 'project_a', name: 'Project A', startDate: '2025-01-01', endDate: '2025-12-31', manager: 'John Doe' },
    { id: 'project_b', name: 'Project B', startDate: '2025-01-01', endDate: '2025-12-31', manager: 'Jane Smith' },
    { id: 'project_c', name: 'Project C', startDate: '2025-01-01', endDate: '2025-12-31', manager: 'Bob Johnson' },
    { id: 'project_d', name: 'Project D', startDate: '2025-01-01', endDate: '2025-12-31', manager: 'Alice Brown' },
    { id: 'project_e', name: 'Project E', startDate: '2025-01-01', endDate: '2025-12-31', manager: 'Charlie Davis' },
    { id: 'project_f', name: 'Project F', startDate: '2025-01-01', endDate: '2025-12-31', manager: 'Eva Wilson' },
  ]);
  const [error, setError] = useState(null);

  const updateProject = async (updatedProject) => {
    try {
      await simulateApiCall(updatedProject, 'Project updated successfully');
      setProjects(projects.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      ));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ProjectContext.Provider value={{ projects, updateProject, error, clearError }}>
      {children}
    </ProjectContext.Provider>
  );
};

