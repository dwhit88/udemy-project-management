import TaskInput from './TaskInput'

export default function TaskView({
  selectedProject,
  handleClearTask,
  handleSaveTask,
}) {
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

  return (
    <>
      <h1>Tasks</h1>
      <TaskInput handleSaveTask={handleSaveTask}></TaskInput>
      <section>{doesProjectHaveTasks()}</section>
    </>
  )
}
