import { Outlet } from 'react-router-dom'
import { useLiff } from '../hooks/useLiff'

/**
 * LIFF状態を管理するレイアウトコンポーネント
 * LIFFが必要なルート（/login, /profile）をこのレイアウトでラップする
 */
export function LiffLayout() {
  const liff = useLiff()

  // Outlet経由で子ルートにLIFF状態を渡す
  return <Outlet context={liff} />
}

