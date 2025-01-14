import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useNavigate } from "react-router-dom";


export default function FavoriteProjects() {
  const { favoriteProject } = useProjectContext();
  const navigate = useNavigate();
  return (
    <div className="pt-20">
      <h2 className="text-xl font-bold mb-2">Favorite Projects</h2>
      <List>
        {favoriteProject.map((project) => (
          <ListItem key={project.id}>
            <ListItemText
              sx={{ cursor: "pointer" }}
              primary={project.name}
              onClick={() => navigate(`/list-details/${project.id}`)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
