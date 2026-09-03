// The supplied desktop frames are substantially larger than the previous hero
// sequence. Using every third frame keeps the scroll motion while restoring a
// practical first-load size for desktop visitors.
const frameModules = import.meta.glob<string>('../assets/heroimages-desktop/lagnaa-barefoot-dining-hero-{004,007,010,013,016,019,022,025,028,031,034,037,040,043,046,049,052,055,058,061,064,065}.webp', {
  eager: true,
  import: 'default',
  query: '?url',
})

export const galleryHeroFrames = ['/hero-lcp.webp', ...Object.entries(frameModules)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, source]) => source)]
