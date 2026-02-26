export const EASE = Object.freeze({
  standard: 'power2.out',
  smooth: 'power3.out',
  cinematic: 'expo.out',
  inOut: 'power2.inOut',
  confident: 'cubic-bezier(0.22, 1, 0.36, 1)',
})

export const MOTION = Object.freeze({
  fast: 0.35,
  base: 0.6,
  slow: 1,
})

export const isBrowser = typeof window !== 'undefined'

export const prefersReducedMotion = () => {
  if (!isBrowser || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const getScrollVelocity = ({
  currentY,
  previousY,
  currentTime,
  previousTime,
}) => {
  const deltaY = currentY - previousY
  const deltaTime = Math.max(1, currentTime - previousTime)
  return deltaY / deltaTime
}

export const detectDevicePerformance = () => {
  if (!isBrowser) return 'high'
  const memory = navigator.deviceMemory || 8
  const cores = navigator.hardwareConcurrency || 8
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const lowEnd = memory <= 4 || cores <= 4 || coarsePointer
  return lowEnd ? 'low' : 'high'
}

export const applyWillChange = (elements, value = 'transform, opacity') => {
  const list = Array.isArray(elements) ? elements : [elements]
  list.filter(Boolean).forEach((element) => {
    element.style.willChange = value
  })
}

export const clearWillChange = (elements) => {
  const list = Array.isArray(elements) ? elements : [elements]
  list.filter(Boolean).forEach((element) => {
    element.style.willChange = ''
  })
}

export const resolveScope = (scope) => {
  if (!isBrowser) return null
  if (!scope) return document.body
  if (typeof scope === 'string') return document.querySelector(scope)
  return scope
}
