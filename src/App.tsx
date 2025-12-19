import './App.sass'
import type { ReactElement } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useLiff } from './hooks/useLiff'

function App(): ReactElement {
  return (
    <BrowserRouter basename="/game">
      <main>
        <AppContent />
      </main>
    </BrowserRouter>
  )
}

function AppContent(): ReactElement {
  const { isInit, error, profile } = useLiff()

  if (!isInit) return <p>Loading LIFF...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>App</h1>
            {profile && <p>{profile.displayName}さん、こんにちは！</p>}
          </div>
        }
      />
    </Routes>
  )
}

export default App
