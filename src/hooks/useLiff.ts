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
      // liff.initが正常に動いた場合
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

        // ログイン済みの場合
        if (loggedIn) {

          // liff.getProfile()が正常に値を取得できた場合
          try {
            // ログイン済みの場合、プロフィールを取得
            const profile = await liff.getProfile()
            const accessToken = liff.getAccessToken()
            setLiffState({
              isInit: true,
              isLoggedIn: true,
              error: null,
              accessToken,
              profile: {
                displayName: profile.displayName,
                pictureUrl: profile.pictureUrl,
                userId: profile.userId,
              }
            })

            // TODO: プロフィールページに遷移する処理

            // liff.getProfile()が正常に値を取得できなかった場合
          } catch (e) {

            const msg = e instanceof Error ? e.message : String(e)

            // access tokenのエラーが起きている場合、一旦ログアウト処理を挟む
            if (msg.includes('access token') && msg.includes('expired')) {
              try { liff.logout() } catch { }
            }

            // 初期化
            initLiffState(true, msg)
          }

          // 未ログインの場合、初期化のみ完了
        } else {
          initLiffState(true)
        }


        // liff.initが正常に動かなかった場合
      } catch (e) {
        initLiffState(true, e instanceof Error ? e.message : 'LIFF initialization failed')
      }
    }

    initLiff()
  }, [])

  // 手動ログイン関数（ログイン後は/profileにリダイレクト）
  const login = () => {
    liff.login({ redirectUri: window.location.origin + '/profile' })
  }

  const initLiffState = (isInit: boolean, _error: string | null = null) => {
    // 初期化
    setLiffState({
      isInit: isInit,
      isLoggedIn: false,
      error: _error,
      profile: null,
      accessToken: null,
    })
  }

  return {
    ...liffState,
    login,
    isInClient,
  }
}
