'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatedSection } from '@/components/AnimatedSection';

interface BlogPost {
  image: string;
  title: string;
  date: string;
  content: string;
  url: string;
}

const MEDIUM_RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@tanawat-p';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function stripHtml(html: string): string {
  if (typeof document !== 'undefined') {
    const el = document.createElement('div');
    el.innerHTML = html;
    return el.textContent || '';
  }
  return html.replace(/<[^>]*>/g, '');
}

function getThumbnail(title: string, thumbnail: string): string {
  if (thumbnail) return thumbnail;
  if (title.toLowerCase().includes('grafana')) return '/images/thumbnail-grafana.webp';
  if (title.toLowerCase().includes('elasticsearch')) return '/images/thumbnail-elasticsearch.png';
  return '/images/thumbnail-default.jpg';
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(MEDIUM_RSS_URL);
        const data = await res.json();
        const items = data.items
          ?.filter((item: { content: string }) => !item.content.includes('ลองมาทบทวน Dockerfile'))
          ?.slice(0, 6)
          ?.map((item: { thumbnail: string; title: string; pubDate: string; content: string; link: string }) => {
            const date = new Date(item.pubDate);
            return {
              image: getThumbnail(item.title, item.thumbnail),
              title: item.title,
              date: `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
              content: stripHtml(item.content).slice(0, 120) + '...',
              url: item.link,
            };
          }) || [];
        setPosts(items);
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-24 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest <span className="gradient-text">Blog</span>
          </h2>
          <div className="section-divider" />
          <p className="text-sm text-text-secondary mt-4">
            Articles from my{' '}
            <a href="https://medium.com/@tanawat-p" target="_blank" rel="noreferrer" className="text-primary-light hover:underline">
              Medium
            </a>
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <AnimatedSection key={post.title} delay={i * 0.1}>
                <a href={post.url} target="_blank" rel="noreferrer" className="group block h-full">
                  <div className="glass-card overflow-hidden h-full flex flex-col hover:scale-[1.03] transition-all duration-300">
                    {/* Image with gradient overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      {/* Gradient overlay on image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-70" />
                      {/* Date badge */}
                      <span className="absolute bottom-3 left-4 text-xs font-semibold text-primary-light bg-surface/60 backdrop-blur-sm px-3 py-1 rounded-full">
                        {post.date}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary-light transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-text-secondary line-clamp-3 flex-1">{post.content}</p>
                      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary-light opacity-0 group-hover:opacity-100 transition-opacity">
                        Read more
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
