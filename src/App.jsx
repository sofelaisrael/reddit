import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import SubmitPage from './pages/SubmitPage'
import PostPage from './pages/PostPage'
import ProfilePage from './pages/ProfilePage'
import SubredditPage from './pages/SubredditPage'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Homepage />} />
            <Route path='r/:subredditName' element={<SubredditPage />} />
            <Route path='r/:subredditName/submit' element={<SubmitPage />} />
            <Route path='u/:username' element={<ProfilePage />} />
            <Route path='post/:postId' element={<PostPage />} />
            <Route path='*' element={<Navigate to={"/"} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
