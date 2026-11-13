import { AthleticReveal, ImageMaskReveal } from './MotionPrimitives';

export function CommunitySection() {
  return (
    <section
      id="community"
      className="relative bg-[#08090B] overflow-hidden py-16 sm:py-20 lg:py-28"
    >
      {/* Subtle architectural red diagonal graphic anchored near lower-right edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-44 h-44 sm:w-64 sm:h-64 lg:w-80 lg:h-80 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#A60E19]/40 clip-corner-slash" />
        <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-[#ED1725] clip-corner-slash" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Side: Authentic Candid Friends Photograph */}
          <div className="lg:col-span-7 min-w-0">
            <ImageMaskReveal direction="left">
              <div className="relative overflow-hidden bg-[#111216] aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/images/community-friends.jpg"
                  alt="Friends laughing and tapping paddles across the net after an evening pickleball match"
                  loading="lazy"
                  className="w-full h-full object-cover object-[center_72%]"
                />
                {/* Crisp subtle bottom edge fade */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-tr from-[#08090B]/35 via-transparent to-transparent"
                />
                {/* Minimal red edge accent line */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[3px] w-24 bg-[#ED1725]"
                />
              </div>
            </ImageMaskReveal>
          </div>

          {/* Right Side: Black Editorial Typography */}
          <div className="lg:col-span-5 min-w-0 lg:pl-4 pb-6 lg:pb-0">
            <AthleticReveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-[2px] w-7 bg-[#ED1725]" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C5C8CE]">
                  THE SPARK COMMUNITY
                </span>
              </div>

              <h2 className="font-athletic text-[2.75rem] sm:text-[4.25rem] xl:text-[5.5rem] leading-[0.87] text-white mb-6">
                <span className="block">MORE THAN</span>
                <span className="block text-[#ED1725]">A GAME.</span>
              </h2>

              <p className="text-base sm:text-[1.0625rem] leading-relaxed text-[#C5C8CE] max-w-md mb-8">
                Great rallies are just the beginning. SPARK is about meeting new people,
                sharing the excitement, and creating moments worth coming back for.
              </p>

              <a
                href="#enquiry"
                className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:text-[#ED1725] transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1725]"
              >
                <span className="h-[1px] w-8 bg-[#ED1725] transition-all duration-300 group-hover:w-12" />
                <span>Join Us On Court</span>
              </a>
            </AthleticReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
