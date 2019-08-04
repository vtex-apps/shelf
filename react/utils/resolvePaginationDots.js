export function resolvePaginationDots(visibility, isMobile) {
  return !!(
    visibility === 'visible' ||
    (visibility === 'mobileOnly' && isMobile) ||
    (visibility === 'desktopOnly' && !isMobile)
  )
}
