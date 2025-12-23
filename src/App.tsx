import './App.sass'
import type { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { ProfilePage } from './components/ProfilePage'
import { LoginPage } from './components/LoginPage'
import { LiffLayout } from './layouts/LiffLayout'

function App(): ReactElement {
  return (
    <main>
      <Routes>
        {/* トップページはLIFFに依存しない */}
        <Route path="/" element={<HomePage />} />

        {/* LIFFが必要なルートをLiffLayoutでラップ */}
        <Route element={<LiffLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
