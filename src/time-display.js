import { useState, useRef } from 'react'
import moment from 'moment'
import addDurationFormat from 'moment-duration-format'
import Timer from './time/timer'

addDurationFormat(moment)

export default function TimeDisplay({ duration }) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const timerRef = useRef(new Timer(duration, setTimeLeft))
  const timer = timerRef.current

  function pad(n, size) {
    return n.toString().padStart(size, '0')
  }

  function formatTimeLeft() {
    duration = moment.duration(timeLeft)
    const hours = duration.hours()
    const minutes = duration.minutes()
    const seconds = duration.seconds()
    const ms = Math.floor(duration.milliseconds())
    const result = `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(
      seconds,
      2
    )}.${pad(ms, 3)}`
    return result
  }

  return (
    <>
      <pre>time left: {formatTimeLeft()}</pre>
      <button type="button" onClick={timer.start}>
        start
      </button>
      <button type="button" onClick={timer.pause}>
        pause
      </button>
      <button type="button" onClick={timer.reset}>
        reset
      </button>
    </>
  )
}
