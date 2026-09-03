// The original mobile frames are 2160×3840. This curated 720×1280 sequence
// preserves the scroll animation without forcing a phone to download ~25 MB.
const mobileFrameModules = import.meta.glob<string>('../assets/heroimages-mobile-optimized/lagnaa-barefoot-dining-mobile-hero-{007,013,019,025,031,037,043,049,055,061,066}.webp', {
  eager: true,
  import: 'default',
  query: '?url',
})

export const mobileHeroFrames = ['/hero-mobile-lcp.webp', ...Object.entries(mobileFrameModules)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, source]) => source)]
