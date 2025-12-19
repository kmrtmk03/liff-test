import './App.sass'
import type { ReactElement } from 'react'
import { useLiff } from './hooks/useLiff'

function App(): ReactElement {
  return (
    <main>
      <AppContent />
    </main>
  )
}

function AppContent(): ReactElement {
  const { isInit, error, profile } = useLiff()

  if (!isInit) return <p>Loading LIFF...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>App</h1>
      {profile && <p>{profile.displayName}さん、こんにちは！</p>}
    </div>
  )
}

export default App
