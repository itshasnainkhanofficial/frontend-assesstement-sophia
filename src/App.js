import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ProjectListPage from './components/ProjectList';
import ProjectDetailPage from './components/ProjectDetails';
import { ProjectProvider } from './contexts/ProjectContext';
import ListDetails from './components/ListDetails';

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProjectProvider>
        <Router>
          <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            <Routes>
              <Route path="/" element={<ProjectListPage />} />
              <Route path="/project/:id" element={<ProjectDetailPage />} />
              <Route path="/list-details/:id" element={<ListDetails />} />

            </Routes>
          </div>
        </Router>
      </ProjectProvider>
    </ThemeProvider>
  );
}

