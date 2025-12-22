import './App.sass'
import type { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLiff } from './hooks/useLiff'
import { HomePage } from './components/HomePage'
import { ProfilePage } from './components/ProfilePage'

function App(): ReactElement {
  // profileをApp.tsxで一元管理
  const { isInit, isLoggedIn, error, profile, login, isInClient } = useLiff()

  return (
    <main>
      <p>isInClient: {isInClient.toString()}</p>
      <p>isLoggedIn: {isLoggedIn.toString()}</p>
      <Routes>
        <Route
          path="/"
          element={<HomePage isInit={isInit} error={error} login={login} />}
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              isInit={isInit}
              isLoggedIn={isLoggedIn}
              error={error}
              profile={profile}
            />
          }
        />
      </Routes>
    </main>
  )
}

export default App
