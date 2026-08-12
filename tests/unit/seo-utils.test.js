/**
 * Unit Tests for SEO Utilities (lib/seo.js)
 *
 * Tests cover: siteConfig validation, generateSEOMetadata structure,
 * generateSchema JSON-LD output for all supported types.
 */

import { describe, it, expect } from 'vitest';
import { siteConfig, generateSEOMetadata, generateSchema } from '@/lib/seo';

describe('siteConfig', () => {
  it('should have a name', () => {
    expect(siteConfig.name).toBeTruthy();
    expect(typeof siteConfig.name).toBe('string');
  });

  it('should have a valid production URL', () => {
    expect(siteConfig.url).toBe('https://quizkaal.in');
  });

  it('should have a description', () => {
    expect(siteConfig.description).toBeTruthy();
    expect(siteConfig.description.length).toBeGreaterThan(10);
  });

  it('should have an Open Graph image URL', () => {
    expect(siteConfig.ogImage).toBeTruthy();
    expect(siteConfig.ogImage).toMatch(/^https?:\/\//);
  });

  it('should have a Twitter handle starting with @', () => {
    expect(siteConfig.twitterHandle).toBeTruthy();
    expect(siteConfig.twitterHandle.startsWith('@')).toBe(true);
  });

  it('should have an author', () => {
    expect(siteConfig.author).toBeTruthy();
  });
});

describe('generateSEOMetadata()', () => {
  const testInput = {
    title: 'Test Page Title',
    description: 'A test page description',
    url: 'https://quizkaal.in/test-page',
    keywords: ['test', 'seo', 'quizkaal'],
    type: 'article',
  };

  it('should include title and description', () => {
    const metadata = generateSEOMetadata(testInput);
    expect(metadata.title).toBe('Test Page Title');
    expect(metadata.description).toBe('A test page description');
  });

  it('should generate canonical URL in alternates', () => {
    const metadata = generateSEOMetadata(testInput);
    expect(metadata.alternates.canonical).toBe('https://quizkaal.in/test-page');
  });

  it('should generate Open Graph metadata', () => {
    const metadata = generateSEOMetadata(testInput);
    expect(metadata.openGraph).toBeTruthy();
    expect(metadata.openGraph.title).toBe('Test Page Title');
    expect(metadata.openGraph.description).toBe('A test page description');
    expect(metadata.openGraph.url).toBe('https://quizkaal.in/test-page');
    expect(metadata.openGraph.siteName).toBe(siteConfig.name);
    expect(metadata.openGraph.type).toBe('article');
    expect(metadata.openGraph.locale).toBe('en_US');
  });

  it('should generate Open Graph images array', () => {
    const metadata = generateSEOMetadata(testInput);
    expect(Array.isArray(metadata.openGraph.images)).toBe(true);
    expect(metadata.openGraph.images.length).toBeGreaterThan(0);
    expect(metadata.openGraph.images[0].width).toBe(1200);
    expect(metadata.openGraph.images[0].height).toBe(630);
  });

  it('should generate Twitter card metadata', () => {
    const metadata = generateSEOMetadata(testInput);
    expect(metadata.twitter).toBeTruthy();
    expect(metadata.twitter.card).toBe('summary_large_image');
    expect(metadata.twitter.title).toBe('Test Page Title');
    expect(metadata.twitter.creator).toBe(siteConfig.twitterHandle);
  });

  it('should include keywords when provided', () => {
    const metadata = generateSEOMetadata(testInput);
    expect(metadata.keywords).toEqual(['test', 'seo', 'quizkaal']);
  });

  it('should omit keywords when empty array', () => {
    const metadata = generateSEOMetadata({ ...testInput, keywords: [] });
    expect(metadata.keywords).toBeUndefined();
  });

  it('should use default image when not specified', () => {
    const metadata = generateSEOMetadata({
      title: 'No Image',
      description: 'Test',
      url: 'https://quizkaal.in/no-image',
    });
    expect(metadata.openGraph.images[0].url).toBe(siteConfig.ogImage);
  });
});

describe('generateSchema()', () => {
  it('should generate Organization schema', () => {
    const schema = generateSchema('Organization');
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toBe(siteConfig.name);
    expect(schema.url).toBe(siteConfig.url);
    expect(schema.logo).toBeTruthy();
    expect(schema.logo.url).toContain('/logo.png');
  });

  it('should generate WebSite schema with SearchAction', () => {
    const schema = generateSchema('WebSite');
    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).toBe(siteConfig.name);
    expect(schema.potentialAction).toBeTruthy();
    expect(schema.potentialAction['@type']).toBe('SearchAction');
  });

  it('should generate Course schema with provider', () => {
    const schema = generateSchema('Course', {
      title: 'Backend Engineering',
      description: 'Learn backend development',
      time: 'PT40H',
    });
    expect(schema['@type']).toBe('Course');
    expect(schema.name).toBe('Backend Engineering');
    expect(schema.provider.name).toBe(siteConfig.name);
    expect(schema.hasCourseInstance.courseMode).toBe('Online');
  });

  it('should generate BreadcrumbList schema', () => {
    const schema = generateSchema('BreadcrumbList', {
      items: [
        { name: 'Home', url: 'https://quizkaal.in/' },
        { name: 'Backend', url: 'https://quizkaal.in/backend-engineering' },
      ],
    });
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement.length).toBe(2);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
  });

  it('should generate Article schema', () => {
    const schema = generateSchema('Article', {
      title: 'How HTTP Works',
      description: 'Deep dive into HTTP protocol',
      url: 'https://quizkaal.in/lessons/http-https',
    });
    expect(schema['@type']).toBe('Article');
    expect(schema.headline).toBe('How HTTP Works');
    expect(schema.author.name).toBe(siteConfig.author);
    expect(schema.publisher.name).toBe(siteConfig.name);
  });

  it('should handle unknown schema type with spread', () => {
    const schema = generateSchema('CustomType', { customField: 'value' });
    expect(schema['@type']).toBe('CustomType');
    expect(schema.customField).toBe('value');
  });
});
