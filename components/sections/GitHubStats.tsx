import Image from 'next/image';
import { AnimatedSection } from '@/components/AnimatedSection';

const GITHUB_USERNAME = 'tanawat011';

export function GitHubStats() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <div className="section-divider" />
          <p className="text-sm text-text-secondary mt-4">
            Open source contributions &amp; coding streaks
          </p>
        </AnimatedSection>

        <div className="grid gap-6">
          {/* GitHub Stats */}
          <AnimatedSection>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Image
                src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=1e293b&title_color=818cf8&icon_color=22d3ee&text_color=94a3b8`}
                alt="GitHub Stats"
                width={495}
                height={195}
                className="rounded-xl"
                unoptimized
              />
              <Image
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=tokyonight&hide_border=true&bg_color=1e293b&title_color=818cf8&text_color=94a3b8`}
                alt="Top Languages"
                width={350}
                height={195}
                className="rounded-xl"
                unoptimized
              />
            </div>
          </AnimatedSection>

          {/* GitHub Streak */}
          <AnimatedSection delay={0.2}>
            <div className="flex justify-center">
              <Image
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=tokyonight&hide_border=true&background=1e293b&ring=818cf8&fire=22d3ee&currStreakLabel=818cf8`}
                alt="GitHub Streak"
                width={495}
                height={195}
                className="rounded-xl"
                unoptimized
              />
            </div>
          </AnimatedSection>
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-8">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary-light font-medium hover:bg-primary/20 hover:scale-105 transition-all duration-200"
          >
            <Image src="/icons/github-alt-brands.svg" alt="GitHub" width={18} height={18} style={{ filter: 'brightness(0) invert(1)' }} />
            View on GitHub
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
