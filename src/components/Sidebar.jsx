export default function Sidebar({ projects, setProjects, setIsAddingProject }) {
  function handleSelectProject(id) {
    const selectedProject = projects.find((project) => project.id === id)
    selectedProject.isSelected = true
    const updatedProjectList = projects.map((project) => {
      return project.id === selectedProject.id ? selectedProject : project
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
          <li key={project.id} onClick={() => handleSelectProject(project.id)}>
            {project.title}
          </li>
        ))}
      </ol>
    </>
  )
}
