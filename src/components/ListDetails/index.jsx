import { useNavigate, useParams } from "react-router-dom";
import FavoriteProjects from "../FavoriteProjects";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const initialProject = {
  id: "",
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  manager: "",
  favorite: "",
};

export default function ListDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(initialProject);

  const { projects, favorites } = useProjectContext();

  const handleEditClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };
  useEffect(() => {
    const foundProject = projects.find((p) => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    }
  }, [id, projects]);

  console.log("ListDetails", project);

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="w-full md:w-1/5 p-4 md:border-r md:border-black">
        <FavoriteProjects />
      </div>
      <div className="w-full md:w-3/4 p-4 pt-20 md:pl-20">
        <h1 className="text-2xl font-bold mb-4">List Details Page</h1>

        <div className="flex-1 ">
          <div className="relative">
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex gap-20 items-baseline">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Project ID:
                      </span>
                      <span>{project.id}</span>
                    </div>

                    <div>
                      {project.favorite ? (
                        <StarBorderIcon
                          sx={{
                            color: "gold",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <StarBorderIcon
                          sx={{
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex gap-2 items-baseline">
                      <span className="text-sm text-muted-foreground">
                        Project Name:
                      </span>
                      <span>{project.name}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">
                    Description:
                  </span>
                  <p className="text-sm">
                    {project.description
                      ? project.description
                      : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2 items-baseline">
                    <span className="text-sm text-muted-foreground">
                      Start Date:
                    </span>
                    <span>{project.startDate}</span>
                  </div>
                  <div className="flex gap-2 items-baseline">
                    <span className="text-sm text-muted-foreground">
                      End Date:
                    </span>
                    <span>{project.endDate}</span>
                  </div>
                </div>

                <div className="flex gap-2 items-baseline">
                  <span className="text-sm text-muted-foreground">
                    Project Manager:
                  </span>
                  <span>{project.manager}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-[20px]">
            <Button
              sx={{ marginTop: "20px" }}
              variant="outlined"
              onClick={() => navigate("/")}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ marginTop: "20px" }}
              onClick={() => handleEditClick(project.id)}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
