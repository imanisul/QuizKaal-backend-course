export default function manifest() {
  return {
    name: 'QuizKaal Learn',
    short_name: 'QuizKaal',
    description: 'An immersive, interactive backend engineering course. Master HTTP, auth, databases, caching, and scaling.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#4F46E5',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      },
    ],
  }
}
