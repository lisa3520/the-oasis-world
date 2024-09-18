import { useEffect, useRef } from 'react'

export function useOutsideClick(handle, listenCapturing = true) {
  const ref = useRef()
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handle()
        }
      }
      document.addEventListener('click', handleClick, listenCapturing)
      return () =>
        document.removeEventListener('click', handleClick, listenCapturing)
    },
    [handle, listenCapturing]
  )
  return ref
}
