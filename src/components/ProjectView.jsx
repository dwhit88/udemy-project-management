import { useRef } from 'react'
import TaskInput from './TaskInput'

export default function ProjectView({
  isAddingProject,
  projects,
  setIsAddingProject,
  setProjects,
}) {
  const newProjectTitle = useRef()
  const newProjectDesc = useRef()
  const newProjectDate = useRef()

  const selectedProject = projects.find((project) => project.isSelected)

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
    const updatedSelectedProject = selectedProject
    updatedSelectedProject.tasks.push({
      id: Date.now(),
      title: task,
    })

    const updatedProjectList = projects.map((project) => {
      return project.id === updatedSelectedProject.id
        ? updatedSelectedProject
        : project
    })

    setProjects(updatedProjectList)
  }

  function handleAddingProject() {
    setIsAddingProject(true)
  }

  function handleClearTask(targetTaskId) {
    const updatedSelectedProjectTasks = selectedProject.tasks.filter(
      (task) => task.id != targetTaskId
    )

    const updatedSelectedProject = selectedProject
    updatedSelectedProject.tasks = updatedSelectedProjectTasks

    const updatedProjectList = projects.map((project) => {
      return project.id === updatedSelectedProject.id
        ? updatedSelectedProject
        : project
    })

    setProjects(updatedProjectList)
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

  function doesProjectHaveTasks() {
    return (
      <>
        {selectedProject.tasks.length
          ? displaySavedTasks()
          : 'This project does not have any tasks yet.'}
      </>
    )
  }

  function displaySavedTasks() {
    return (
      <>
        <ol>
          {selectedProject.tasks.map((task) => (
            <li key={task.id}>
              {task.title}
              <button onClick={() => handleClearTask(task.id)}>Clear</button>
            </li>
          ))}
        </ol>
      </>
    )
  }

  function displaySelectedProjectView() {
    return (
      <>
        <h1>{selectedProject.title}</h1>
        <button>Delete</button>
        <p>{selectedProject.dueDate}</p>
        <p>{selectedProject.desc}</p>
        {/* <line></line> */}
        <h1>Tasks</h1>
        <TaskInput handleSaveTask={handleSaveTask}></TaskInput>
        <section>{doesProjectHaveTasks()}</section>
      </>
    )
  }

  return (
    <>
      {isAddingProject
        ? displayAddingProjectView()
        : selectedProject
        ? displaySelectedProjectView()
        : displayNoProjectSelectedView()}
    </>
  )
}
