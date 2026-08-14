const mobileFrameModules = import.meta.glob<string>('../assets/heroimages-new/frame_*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
})

export const mobileHeroFrames = Object.entries(mobileFrameModules)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, source]) => source)
