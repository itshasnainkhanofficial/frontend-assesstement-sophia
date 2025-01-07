import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Snackbar, Alert } from "@mui/material";
import FavoriteProjects from "../FavoriteProjects";
import { useProjectContext } from "../../contexts/ProjectContext";

const initialProject = {
  id: "",
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  manager: "",
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(initialProject);
  const { projects, updateProject, error, clearError } = useProjectContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const foundProject = projects.find((p) => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    }
  }, [id, projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await updateProject(project);
    setIsSubmitting(false);
    if (!error) {
      navigate("/");
    }
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
      <div className="w-full md:w-3/4 p-4 md:pt-20 md:pl-10">
        <Paper className="p-4">
          <h1 className="text-2xl font-bold mb-4">Project Detail Page</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Project ID"
              name="id"
              value={project.id}
              onChange={handleChange}
              disabled
            />
            <TextField
              fullWidth
              label="Project Name"
              name="name"
              value={project.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={project.description || ""}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Start Date"
              name="startDate"
              type="date"
              value={project.startDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              label="End Date"
              name="endDate"
              type="date"
              value={project.endDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              label="Project Manager"
              name="manager"
              value={project.manager}
              onChange={handleChange}
              required
            />
            <div className="flex justify-between">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
              <Button variant="outlined" onClick={() => navigate("/")}>
                Back to List
              </Button>
            </div>
          </form>
        </Paper>
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
