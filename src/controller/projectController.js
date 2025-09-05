import { projects } from "../data/projectData.js";
import { authorize } from "../middleware/authorize.js";
import { canViewProject, canUpdateProject } from "../policies/projectPolicy.js";

const handleResponse = (res, status, message, project = null) => {
  return res.status(status).json({ status, message, project });
};

const getProjectById = (id, res) => {
  const project = projects.find((p) => p.id === id);
  if (!project) {
    handleResponse(res, 404, "Project not found");
    return null;
  }
  return project;
};

export const viewProject = (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = getProjectById(projectId, res);
  if (!project) return;

  authorize(canViewProject, project)(req, res, () => {
    handleResponse(res, 200, "Project retrieved successfully", project);
  });
};

export const updateProject = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return handleResponse(res, 400, "Project name is required");
  }

  const projectId = parseInt(req.params.id);
  const project = getProjectById(projectId, res);
  if (!project) return;

  authorize(canUpdateProject, project)(req, res, () => {
    const projectIndex = projects.findIndex((obj) => obj.id === projectId);
    projects[projectIndex].name = name;

    handleResponse(res, 200, "Project updated successfully", projects[projectIndex]);
  });
};
