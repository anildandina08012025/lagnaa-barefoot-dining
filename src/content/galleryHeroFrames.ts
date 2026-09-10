// Desktop-only scroll sequence supplied for the Home-page hero. Mobile uses
// its separate compact sequence until new mobile frames are provided.
const frameModules = import.meta.glob<string>('../assets/heroimages-desktop-new/lagnaa-barefoot-dining-desktop-hero-*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
})

export const galleryHeroFrames = Object.entries(frameModules)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, source]) => source)
