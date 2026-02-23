import DecorativeElements from './DecorativeElements'
import HeroLeft from './HeroLeft'
import HeroRight from './HeroRight'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f9f7ef_0%,#f2f7ff_52%,#f6f2ff_100%)] px-[60px] pb-16 pt-32"
    >
      <div className="mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-2">
        <HeroLeft />
        <HeroRight />
      </div>
      <DecorativeElements />
    </section>
  )
}
