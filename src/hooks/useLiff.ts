import { useEffect, useState } from 'react'
import liff from '@line/liff'

export interface LiffState {
  isInit: boolean
  isLoggedIn: boolean
  error: string | null
  profile: {
    displayName: string
    pictureUrl?: string
    userId: string
  } | null
  accessToken: string | null
}

export const useLiff = () => {
  const [liffState, setLiffState] = useState<LiffState>({
    isInit: false,
    isLoggedIn: false,
    error: null,
    profile: null,
    accessToken: null,
  })

  const [isInClient, setIsInClient] = useState(false)

  useEffect(() => {

    const initLiff = async () => {
      try {
        const liffId = import.meta.env.VITE_LIFF_ID
        if (!liffId) {
          throw new Error('LIFF ID is not defined in .env')
        }

        await liff.init({ liffId })

        setIsInClient(liff.isInClient())
        console.log("isLoggedIn", liff.isLoggedIn())

        // MEMO: 通常ブラウザではいつもfalseを返す
        const loggedIn = liff.isLoggedIn()

        if (loggedIn) {
          try {
            // ログイン済みの場合、プロフィールを取得
            const profile = await liff.getProfile()
            const accessToken = liff.getAccessToken()
            setLiffState({
              isInit: true,
              isLoggedIn: true,
              error: null,
              profile: {
                displayName: profile.displayName,
                pictureUrl: profile.pictureUrl,
                userId: profile.userId,
              },
              accessToken,
              // TODO: プロフィールページに遷移する処理
            })
          } catch (e) {
            // トークンが期限切れの場合、再ログインを試みる
            if (e instanceof Error && e.message.includes('access token expired')) {
              console.warn('Access token expired, logging in again...')
              liff.login()
              return
            }
            throw e
          }
        } else {
          // LINE内Webviewの場合、自動的にログイン処理を行う
          if (liff.isInClient()) {
            liff.login()
            return
          }

          // 未ログインの場合、初期化のみ完了
          setLiffState({
            isInit: true,
            isLoggedIn: false,
            error: null,
            profile: null,
            accessToken: null,
          })
        }
      } catch (e) {
        setLiffState((prev) => ({
          ...prev,
          isInit: true,
          error: e instanceof Error ? e.message : 'LIFF initialization failed',
        }))
      }
    }

    initLiff()
  }, [])

  // 手動ログイン関数（ログイン後は/profileにリダイレクト）
  const login = () => {
    liff.login({ redirectUri: window.location.origin + '/profile' })
  }

  return {
    ...liffState,
    login,
    isInClient,
  }
}
