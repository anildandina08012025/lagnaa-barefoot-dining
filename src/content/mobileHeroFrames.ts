// Mobile-only scroll sequence supplied for the Home-page hero.
const mobileFrameModules = import.meta.glob<string>('../assets/heroimages-mobile-new-sequence/lagnaa-barefoot-dining-mobile-hero-*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
})

export const mobileHeroFrames = Object.entries(mobileFrameModules)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, source]) => source)
