import type { ReactElement } from 'react'

interface LoginPageProps {
  isInit: boolean
  error: string | null
  login: () => void
  isLoggedIn: boolean
  isInClient: boolean
}

export function LoginPage({ isInit, error, login, isLoggedIn, isInClient }: LoginPageProps): ReactElement {
  if (!isInit) return <p>Loading...</p>

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
