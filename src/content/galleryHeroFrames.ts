const frameModules = import.meta.glob<string>('../assets/heroimages-desktop/lagnaa-barefoot-dining-hero-*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
})

export const galleryHeroFrames = Object.entries(frameModules)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, source]) => source)
