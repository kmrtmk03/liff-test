import { useEffect, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLiffContext } from '../hooks/useLiffContext'

export function LoginPage(): ReactElement {
  const { isInit, error, login, isLoggedIn, isInClient } = useLiffContext()
  const navigate = useNavigate()

  // 初期化完了後、ログイン済みならプロフィールページにリダイレクト
  useEffect(() => {
    if (isInit && isLoggedIn) {
      navigate('/profile')
    }
  }, [isInit, isLoggedIn, navigate])

  if (!isInit) return <p>Loading...</p>

  // ログイン済みの場合はリダイレクト中の表示
  if (isLoggedIn) {
    return <p>リダイレクト中...</p>
  }

  return (
    <div className="login">
      {
        error && (
          <p>Error: {error}</p>
        )
      }

      <h1>Login</h1>
      <button onClick={login} className="login-button">
        LINEでログイン
      </button>

      <p>isInClient: {isInClient.toString()}</p>
      <p>isLoggedIn: {isLoggedIn.toString()}</p>
    </div>
  )
}
