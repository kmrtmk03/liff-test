import type { ReactElement } from 'react'

interface HomePageProps {
  isInit: boolean
  error: string | null
}

export function HomePage({ isInit, error }: HomePageProps): ReactElement {
  if (!isInit) return <p>Loading...</p>

  return (
    <div className="home">
      {
        error && (
          <p>Error: {error}</p>
        )
      }
      <h1>Welcome</h1>

      <a href="https://liff.line.me/2008731406-k7SGqB1P/login" className="login-button">
        ログインページへ
      </a>
    </div>
  )
}
