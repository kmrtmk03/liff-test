import { useOutletContext } from 'react-router-dom'
import type { useLiff } from '../hooks/useLiff'

/**
 * 子コンポーネントでLIFF状態を取得するためのカスタムフック
 */
export function useLiffContext() {
  return useOutletContext<ReturnType<typeof useLiff>>()
}
