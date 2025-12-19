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
}

export const useLiff = () => {
  const [liffState, setLiffState] = useState<LiffState>({
    isInit: false,
    isLoggedIn: false,
    error: null,
    profile: null,
  })

  useEffect(() => {
    const initLiff = async () => {
      try {
        const liffId = import.meta.env.VITE_LIFF_ID
        if (!liffId) {
          throw new Error('LIFF ID is not defined in .env')
        }

        await liff.init({ liffId })

        const loggedIn = liff.isLoggedIn()

        if (loggedIn) {
          // ログイン済みの場合、プロフィールを取得
          const profile = await liff.getProfile()
          setLiffState({
            isInit: true,
            isLoggedIn: true,
            error: null,
            profile: {
              displayName: profile.displayName,
              pictureUrl: profile.pictureUrl,
              userId: profile.userId,
            },
          })
        } else {
          // 未ログインの場合、初期化のみ完了
          setLiffState({
            isInit: true,
            isLoggedIn: false,
            error: null,
            profile: null,
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

  return { ...liffState, login }
}
