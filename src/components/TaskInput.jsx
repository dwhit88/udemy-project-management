import { useRef } from 'react'

export default function TaskInput({ handleSaveTask }) {
  const addedTask = useRef()

  function handleAddTask() {
    addedTask.current.value && handleSaveTask(addedTask.current.value)
    addedTask.current.value = ''
  }

  return (
    <>
      <input ref={addedTask}></input>
      <button onClick={handleAddTask}>Add Task</button>
    </>
  )
}
