import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLiffContext } from '../hooks/useLiffContext'

export function ProfilePage(): ReactElement {
  const { isInit, isLoggedIn, error, profile, logout } = useLiffContext()
  const navigate = useNavigate()

  // ログアウト処理後に/loginへ遷移
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!isInit) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!isLoggedIn || !profile) return <p>ログインしていません</p>

  return (
    <div className="profile">
      <h1>{profile.displayName}さん、こんにちは！</h1>
      {profile.pictureUrl && (
        <img src={profile.pictureUrl} alt="プロフィール画像" className="profile-image" />
      )}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleLogout} className="logout-button">
          ログアウト
        </button>
      </div>
    </div>
  )
}
