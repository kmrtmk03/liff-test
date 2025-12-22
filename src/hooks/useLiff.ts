import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import liff from '@line/liff'

/**
 * LIFFの状態を管理するインターフェース
 */
export interface LiffState {
  /** 初期化が完了したかどうか */
  isInit: boolean
  /** ログイン済みかどうか */
  isLoggedIn: boolean
  /** エラーが発生した場合のメッセージ */
  error: string | null
  /** ユーザーのプロフィール情報 */
  profile: {
    displayName: string
    pictureUrl?: string
    userId: string
  } | null
  /** アクセストークン */
  accessToken: string | null
}

/**
 * LIFF (LINE Front-end Framework) を扱うためのカスタムフック
 * 初期化、ログイン状態の管理、プロフィール取得、ログイン処理を提供します。
 */
export const useLiff = () => {
  // LIFFの状態を一括管理
  const [liffState, setLiffState] = useState<LiffState>({
    isInit: false,
    isLoggedIn: false,
    error: null,
    profile: null,
    accessToken: null,
  })

  const navigate = useNavigate()
  const location = useLocation()

  // LINEアプリ内（LIFFブラウザ）で動作しているかどうか
  const [isInClient, setIsInClient] = useState(false)

  /**
   * 状態を更新（主に初期化失敗時や未ログイン時に使用）
   */
  const updateState = useCallback((params: Partial<LiffState>) => {
    setLiffState((prev) => ({ ...prev, ...params }))
  }, [])

  /**
   * ユーザープロフィールを取得して状態を更新
   */
  const fetchProfile = async () => {
    try {
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
        },
      })

      // ルートパスにいる場合はプロフィールページへ遷移
      if (location.pathname === '/') {
        navigate('/profile')
      }

    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)

      // アクセストークンの期限切れなどのエラーが発生した場合、一旦ログアウトを試みる
      if (msg.includes('access token') && msg.includes('expired')) {
        try {
          liff.logout()
        } catch (logoutError) {
          console.error('Logout failed:', logoutError)
        }
      }

      updateState({ isInit: true, error: msg, isLoggedIn: false })
    }
  }

  /**
   * LIFFの初期化処理
   */
  const initLiff = async () => {
    try {
      const liffId = import.meta.env.VITE_LIFF_ID
      if (!liffId) {
        throw new Error('LIFF ID is not defined in .env')
      }

      // LIFFの初期化
      await liff.init({ liffId })

      // クライアント判定
      setIsInClient(liff.isInClient())

      // ログイン状態に応じた処理
      if (liff.isLoggedIn()) {
        await fetchProfile()
      } else {
        updateState({ isInit: true, isLoggedIn: false })
      }
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'LIFF initialization failed'
      console.error('LIFF init error:', errorMsg)
      updateState({ isInit: true, error: errorMsg })
    }
  }

  // マウント時に一度だけ初期化を実行
  useEffect(() => {
    initLiff()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * ログイン処理を実行し、ログイン後にプロフィールページへ遷移させる
   */
  const login = useCallback(() => {
    liff.login({ redirectUri: `${window.location.origin}/profile` })
  }, [])

  return {
    ...liffState,
    login,
    isInClient,
  }
}
