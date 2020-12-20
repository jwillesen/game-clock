import { useEffect, useState } from 'react'
import moment from 'moment'
import addDurationFormat from 'moment-duration-format'

addDurationFormat(moment)

export default function TimeDisplay({ duration }) {
  const [startTime] = useState(window.performance.now())
  const [currentTime, setCurrentTime] = useState(startTime)
  const diff = currentTime - startTime
  const timeLeft = duration - diff

  useEffect(() => {
    let handle
    if (timeLeft > 0) {
      handle = window.requestAnimationFrame(() =>
        setCurrentTime(window.performance.now())
      )
    }

    if (handle) return () => window.cancelAnimationFrame(handle)
  })

  function formatTimeLeft() {
    return moment
      .duration(Math.max(timeLeft, 0))
      .format('hh:mm:ss.SSS', { trim: false })
  }

  return (
    <>
      <pre>time left: {formatTimeLeft()}</pre>
    </>
  )
}
