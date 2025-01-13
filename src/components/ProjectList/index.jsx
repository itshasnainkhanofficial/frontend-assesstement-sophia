import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteProjects from "../../components/FavoriteProjects";
import { useProjectContext } from "../../contexts/ProjectContext";
import StarBorderIcon from "@mui/icons-material/StarBorder";
export default function ProjectListPage() {
  const navigate = useNavigate();
  const { projects, error, clearError, setProjects } = useProjectContext();

  const handleEditClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleFavoriteClick = (id) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id
          ? { ...project, favorite: !project.favorite }
          : project
      )
    );
  };

  const handleNameClick = (projectId) => {
    navigate(`/list-details/${projectId}`);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    clearError();
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="w-full md:w-1/5 p-4 md:border-r md:border-black">
        <FavoriteProjects />
      </div>
     
      <div className="w-full md:w-3/4 p-4 md:pt-20 md:pl-20">
        <h1 className="text-2xl font-bold mb-4">Project List Page</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project ID</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Project Manager</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell onClick={() => handleNameClick(project.id)}>
                    {project.name}
                  </TableCell>
                  <TableCell>{project.startDate}</TableCell>
                  <TableCell>{project.endDate}</TableCell>
                  <TableCell>{project.manager}</TableCell>
                  <TableCell sx={{ display: "flex", gap: 3 }}>
                    {project.favorite ? (
                      <StarBorderIcon
                        sx={{
                          color: "gold",
                          cursor: "pointer",
                        }}
                        onClick={() => handleFavoriteClick(project.id)}
                      />
                    ) : (
                      <StarBorderIcon
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() => handleFavoriteClick(project.id)}
                      />
                    )}

                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEditClick(project.id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
