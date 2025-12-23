import type { ReactElement } from 'react'

export function HomePage(): ReactElement {
  return (
    <div className="home">
      <h1>Welcome</h1>

      <a href="https://liff.line.me/2008731406-k7SGqB1P/login" className="login-button">
        ログインページへ
      </a>
    </div>
  )
}
