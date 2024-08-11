export default function Sidebar({ projects, setProjects, setIsAddingProject }) {
  function handleSelectProject(selectedProject) {
    const tempProjects = projects
    const tempSelectedProject = selectedProject

    const updatedProjectList = tempProjects.map((project) => {
      if (project.id === selectedProject.id) {
        tempSelectedProject.isSelected = true
        return tempSelectedProject
      } else {
        project.isSelected = false
        return project
      }
    })

    setProjects(updatedProjectList)
  }

  function handleAddingProject() {
    setIsAddingProject(true)
  }

  return (
    <>
      <h2>Your Projects</h2>
      <button onClick={handleAddingProject}>+ Add Project</button>
      <ol>
        {projects.map((project) => (
          <li key={project.id} onClick={() => handleSelectProject(project)}>
            {project.title}
          </li>
        ))}
      </ol>
    </>
  )
}
