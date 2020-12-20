export function scheduleCallback(cb) {
  return window.requestAnimationFrame(cb)
}

export function cancelCallback(handle) {
  window.cancelAnimationFrame(handle)
}
