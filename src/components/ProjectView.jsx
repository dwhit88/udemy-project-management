import { useRef } from 'react'
import TaskView from './TaskView'

export default function ProjectView({
  isAddingProject,
  projects,
  setIsAddingProject,
  setProjects,
}) {
  const newProjectTitle = useRef()
  const newProjectDesc = useRef()
  const newProjectDate = useRef()

  function selectedProject() {
    return projects.find((project) => project.isSelected)
  }

  function handleCancel() {
    setIsAddingProject(false)
  }

  function handleSave() {
    const updatedProjectList = projects
    updatedProjectList.push({
      id: Date.now(),
      title: newProjectTitle.current.value,
      desc: newProjectDesc.current.value,
      dueDate: newProjectDate.current.value,
      isSelected: false,
      tasks: [],
    })

    setProjects(updatedProjectList)
    setIsAddingProject(false)
  }

  function handleSaveTask(task) {
    const tempSelectedProject = selectedProject()
    tempSelectedProject.tasks.push({
      id: Date.now(),
      title: task,
    })

    const updatedProjectList = projects.map((project) => {
      return project.id === tempSelectedProject.id
        ? tempSelectedProject
        : project
    })

    setProjects(updatedProjectList)
  }

  function handleAddingProject() {
    setIsAddingProject(true)
  }

  function handleClearTask(targetTaskId) {
    const tempSelectedProject = selectedProject()
    const updatedSelectedProjectTasks = tempSelectedProject.tasks.filter(
      (task) => task.id != targetTaskId
    )

    tempSelectedProject.tasks = updatedSelectedProjectTasks

    const updatedProjectList = projects.map((project) => {
      return project.id === tempSelectedProject.id
        ? tempSelectedProject
        : project
    })

    setProjects(updatedProjectList)
  }

  function handleDeleteProject(targetProjectId) {
    const updatedProjects = projects.filter(
      (project) => project.id != targetProjectId
    )
    setProjects(updatedProjects)
  }

  function displayAddingProjectView() {
    return (
      <>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSave}>Save</button>
        <label key="Title">
          Title
          <input type="text" id="Title" ref={newProjectTitle}></input>
        </label>
        <label key="Desc">
          Description
          <input type="text" id="Desc" ref={newProjectDesc}></input>
        </label>
        <label key="Date">
          Due Date
          <input type="date" id="Date" ref={newProjectDate}></input>
        </label>
      </>
    )
  }

  function displayNoProjectSelectedView() {
    return (
      <>
        <img></img>
        <h2>No Project Selected</h2>
        <p>Select a project or get started with a new one</p>
        <button onClick={handleAddingProject}>Create new project</button>
      </>
    )
  }

  function displaySelectedProjectView() {
    const project = selectedProject()
    return (
      <>
        <h1>{project.title}</h1>
        <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
        <p>{project.dueDate}</p>
        <p>{project.desc}</p>
        {/* <line></line> */}
        <TaskView
          selectedProject={project}
          handleClearTask={handleClearTask}
          handleSaveTask={handleSaveTask}
        ></TaskView>
      </>
    )
  }

  return (
    <>
      {isAddingProject
        ? displayAddingProjectView()
        : selectedProject()
        ? displaySelectedProjectView()
        : displayNoProjectSelectedView()}
    </>
  )
}
