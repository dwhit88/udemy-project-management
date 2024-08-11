import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ProjectView from './components/ProjectView'

// FOR REFERENCE
// const projectSchema = {
//   id: 1,
//   title: 'title',
//   desc: 'description',
//   dueDate: 'due date',
//   isSelected: true,
//   tasks: [
//     {
//       id: 1,
//       title: '',
//     },
//     {
//       id: 2,
//       title: '',
//     },
//   ],
// }

function App() {
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [projects, setProjects] = useState([])

  return (
    <>
      <h1 className="my-8 text-center text-5xl font-bold">Hello World</h1>
      <Sidebar
        projects={projects}
        setProjects={setProjects}
        setIsAddingProject={setIsAddingProject}
      />
      <ProjectView
        isAddingProject={isAddingProject}
        projects={projects}
        setIsAddingProject={setIsAddingProject}
        setProjects={setProjects}
      />
    </>
  )
}

export default App
