import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import type { LiffState } from '../hooks/useLiff'

interface ProfilePageProps {
  isInit: boolean
  isLoggedIn: boolean
  error: string | null
  profile: LiffState['profile']
  logout: () => void
}

export function ProfilePage({ isInit, isLoggedIn, error, profile, logout }: ProfilePageProps): ReactElement {
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
