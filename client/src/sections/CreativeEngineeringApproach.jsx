export default function CreativeEngineeringApproach() {
  return (
    <section
      id="creative-engineering"
      data-scroll-section
      className="bg-[#EEF2D3] px-6 py-20 transition-colors duration-300 dark:bg-[#0F0F0F] md:px-10 md:py-24 lg:px-[60px] lg:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white md:text-5xl">
          Creative Engineering Approach
        </h2>
        <p className="mt-6 max-w-[760px] text-base leading-8 text-zinc-700 dark:text-[#BBBBBB] md:text-lg">
          I build immersive digital experiences. I combine motion, 3D, and performance-first
          development. I engineer animation architecture, not just visuals, and create interactive
          storytelling systems optimized for production reliability.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-4">
          {[
            'React / R3F',
            'Three.js',
            'GSAP',
            'GLSL',
            'Web Audio API',
            'Performance Optimization',
            'Animation Architecture',
            'Scroll Engineering',
            'Interaction Systems',
          ].map((item) => (
            <div key={item} className="rounded-xl border border-[#E2E8C0] bg-[#F5F6ED] px-4 py-3 dark:border-[#2A2A2A] dark:bg-[#1A1A1A]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
