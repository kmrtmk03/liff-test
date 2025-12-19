import './App.sass'
import type { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLiff } from './hooks/useLiff'

function App(): ReactElement {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </main>
  )
}

// トップページ：LINEログインボタンを表示
function HomePage(): ReactElement {
  const { isInit, error, login } = useLiff()

  if (!isInit) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="home">
      <h1>Welcome</h1>
      <button onClick={login} className="login-button">
        LINEでログイン
      </button>
    </div>
  )
}

// プロフィールページ：ログイン後の挨拶を表示
function ProfilePage(): ReactElement {
  const { isInit, error, profile, isLoggedIn } = useLiff()

  if (!isInit) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!isLoggedIn || !profile) return <p>ログインしていません</p>

  return (
    <div className="profile">
      <h1>{profile.displayName}さん、こんにちは！</h1>
      {profile.pictureUrl && (
        <img src={profile.pictureUrl} alt="プロフィール画像" className="profile-image" />
      )}
    </div>
  )
}

export default App
