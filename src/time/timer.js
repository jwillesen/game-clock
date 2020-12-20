import { scheduleCallback, cancelCallback } from './schedule'

export default class Timer {
  constructor(duration, cb, now = null) {
    this.startDuration = duration
    this.cb = cb
    this.getNow = now
    if (!this.getNow) this.getNow = window.performance.now
  }

  destroy = () => {
    cancelCallback(this.scheduleHandle)
  }

  active = () => {
    return this.running
  }

  start = () => {
    if (!this.running) {
      this.running = true
      this.lastTimestamp = window.performance.now()
      scheduleCallback(this.advance)
    }
  }

  pause = () => {
    if (this.running) {
      this.running = false
      this.advance()
    }
  }

  reset = () => {
    this.timeElapsed = 0
    this.cb(this.timeLeft())
  }

  advance = () => {
    const now = window.performance.now()
    this.timeElapsed += now - this.lastTimestamp
    this.lastTimestamp = now
    this.cb(this.timeLeft())
    if (this.timeLeft() === 0) this.running = false
    if (this.running) this.scheduleHandle = scheduleCallback(this.advance)
  }

  duration = () => {
    return this.startDuration
  }

  elapsed = () => {
    return this.timeElapsed
  }

  timeLeft = () => {
    return Math.max(this.duration() - this.elapsed(), 0)
  }

  finished = () => {
    return this.timeLeft() === 0
  }

  scheduleHandle = null
  running = false
  startDuration = 0
  timeElapsed = 0
  lastTimestamp = 0
}
