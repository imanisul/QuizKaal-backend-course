/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://quizkaal.in',
  generateRobotsTxt: true,
  // Exclude administrative, API, and non-SEO utility pages from sitemap
  exclude: ['/admin/*', '/api/*', '/playground/*', '/contact', '/about', '/community', '/coming-soon'],
  
  // Custom transform to prioritize specific courses and ensure proper structure
  transform: async (config, path) => {
    // Only allow specific top-level navigation pages
    const allowedPaths = [
      '/',
      '/roadmap',
      '/backend-engineering',
      '/system-design',
      '/mobile-course',
      '/ai-prompt-engineering',
      '/react-course',
      '/javascript-course',
      '/cicd',
      '/agentic-ai',
      '/genai',
      '/python-course',
      '/java-course',
      '/oop-course',
      '/interview'
    ];

    if (!allowedPaths.includes(path)) {
      return null;
    }

    let priority = config.priority;
    let changefreq = config.changefreq;

    // Highest priority for main landing pages and core courses
    if (path === '/' || path === '/javascript-course' || path === '/system-design') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (path.includes('-course')) {
      priority = 0.9;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/playground'],
      },
    ],
  },
};

