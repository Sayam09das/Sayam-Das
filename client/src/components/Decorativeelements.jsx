export default function DecorativeElements({ sparklesRef, wavesRef }) {
  return (
    <>
      <div
        ref={sparklesRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-24 z-[2] hidden h-24 w-24 rounded-full bg-[#C6F54D]/20 blur-2xl md:block"
      />
      <div
        ref={wavesRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-6 z-[2] hidden h-20 w-40 rounded-full border border-[#E2E8C0] bg-[#EEF2D3]/70 md:block dark:border-[#2A2A2A] dark:bg-[#1A1A1A]/70"
      />
    </>
  )
}
