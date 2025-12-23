import './App.sass'
import type { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLiff } from './hooks/useLiff'
import { HomePage } from './components/HomePage'
import { ProfilePage } from './components/ProfilePage'
import { LoginPage } from './components/LoginPage'

function App(): ReactElement {
  // profileをApp.tsxで一元管理
  const { isInit, isLoggedIn, error, profile, login, logout, isInClient } = useLiff()

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<HomePage isInit={isInit} error={error} />}
        />
        <Route
          path="/login"
          element={<LoginPage isInit={isInit} error={error} login={login} isLoggedIn={isLoggedIn} isInClient={isInClient} />}
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              isInit={isInit}
              isLoggedIn={isLoggedIn}
              error={error}
              profile={profile}
              logout={logout}
            />
          }
        />
      </Routes>
    </main>
  )
}

export default App
