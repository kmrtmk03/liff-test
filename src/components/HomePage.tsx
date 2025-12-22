import type { ReactElement } from 'react'

interface HomePageProps {
  isInit: boolean
  error: string | null
  login: () => void
}

export function HomePage({ isInit, error, login }: HomePageProps): ReactElement {
  if (!isInit) return <p>Loading...</p>

  return (
    <div className="home">
      {
        error && (
          <p>Error: {error}</p>
        )
      }
      <h1>Welcome</h1>
      <button onClick={login} className="login-button">
        LINEでログイン
      </button>
    </div>
  )
}
