import type { ReactElement } from 'react'
import type { LiffState } from '../hooks/useLiff'

interface ProfilePageProps {
  isInit: boolean
  isLoggedIn: boolean
  error: string | null
  profile: LiffState['profile']
}

export function ProfilePage({ isInit, isLoggedIn, error, profile }: ProfilePageProps): ReactElement {
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
