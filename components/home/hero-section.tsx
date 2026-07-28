"use client"

import React, { useRef } from "react"
import { ArrowRight, Zap, Cpu, ShieldCheck, Factory, Zap as ZapIcon } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

/* ─── Data ─── */
const METRICS = [
  { icon: Factory,     value: "3.2 GWh",   label: "Annual Manufacturing\nCapacity" },
  { icon: Zap,         value: "LFP & NMC", label: "Battery\nTechnologies" },
  { icon: Cpu,         value: "Smart BMS", label: "Engineering" },
  { icon: ShieldCheck, value: "AIS 156",   label: "Safety\nCompliance" },
]

/* ─── Component ─── */
export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null)
  const rm  = useReducedMotion()
  const a   = !rm

  return (
    <section ref={ref} aria-label="PowerMetz — Advanced Battery Engineering" className="pm-hero">

      {/* ── Video Background ── */}
      <div aria-hidden="true" className="pm-hero__bg">
        <video src="/HeroSection_BG.mp4" autoPlay loop muted playsInline preload="auto" className="pm-hero__video" />
        {/* Base dark overlay */}
        <div className="pm-hero__overlay" />
        {/* Left-to-right gradient: dark on left (text legibility) → transparent on right (video shows) */}
        <div className="pm-hero__fade" />
      </div>

      {/* ── Content ── */}
      <div className="pm-hero__wrap">
        <div className="pm-hero__inner">

          {/* Badge */}
          <motion.div
            className="pm-hero__badge"
            initial={a ? { opacity: 0 } : false}
            animate={a ? { opacity: 1 } : false}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <ZapIcon className="pm-hero__badge-icon" aria-hidden="true" />
            <span>Powering India&apos;s Energy Transition</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="pm-hero__h1"
            initial={a ? { opacity: 0, y: 24 } : false}
            animate={a ? { opacity: 1, y: 0  } : false}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            Engineering Advanced{" "}
            <span className="pm-hero__accent">Battery Energy</span>{" "}
            Storage Systems
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="pm-hero__sub"
            initial={a ? { opacity: 0, y: 16 } : false}
            animate={a ? { opacity: 1, y: 0  } : false}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Delivering intelligent Lithium-Ion Battery Packs, Battery Energy Storage Systems
            (BESS), and custom OEM energy solutions engineered for electric mobility, renewable
            energy, industrial backup, and utility-scale applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="pm-hero__btns"
            initial={a ? { opacity: 0, y: 12 } : false}
            animate={a ? { opacity: 1, y: 0  } : false}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="mailto:support@metzbattery.in"   className="pm-btn pm-btn--primary">
              Get a Quote <ArrowRight className="pm-btn__icon" aria-hidden="true" />
            </a>
            <a href="#solutions" className="pm-btn pm-btn--ghost">
              Explore Solutions <ArrowRight className="pm-btn__icon" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Trust Metrics */}
          <motion.div
            className="pm-hero__metrics"
            initial={a ? { opacity: 0 } : false}
            animate={a ? { opacity: 1 } : false}
            transition={{ duration: 0.6, delay: 0.36 }}
          >
            {METRICS.map((m, i) => (
              <motion.div
                key={m.value}
                className="pm-metric"
                initial={a ? { opacity: 0, y: 10 } : false}
                animate={a ? { opacity: 1, y: 0  } : false}
                transition={{ duration: 0.4, delay: 0.40 + i * 0.07 }}
              >
                <div className="pm-metric__icon-box" aria-hidden="true">
                  <m.icon className="pm-metric__icon" strokeWidth={1.8} />
                </div>
                <div className="pm-metric__text">
                  <p className="pm-metric__value">{m.value}</p>
                  <p className="pm-metric__label">{m.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ── Scoped Styles ── */}
      <style>{`

        /* ════════════════════════════
           SECTION
        ════════════════════════════ */
        .pm-hero {
          position: relative;
          overflow: hidden;
          background: #05070a;
          color: #fff;
          display: flex;
          align-items: center;
          height: 100dvh;
          padding-top: var(--header-height, 80px);
          box-sizing: border-box;
        }

        /* ════════════════════════════
           VIDEO BACKGROUND
        ════════════════════════════ */
        .pm-hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .pm-hero__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        /* Uniform dark base */
        .pm-hero__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.52);
        }
        /* Left-to-right fade: text side dark → video side shows through */
        .pm-hero__fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            rgba(0, 0, 0, 0.68) 0%,
            rgba(0, 0, 0, 0.42) 40%,
            rgba(0, 0, 0, 0.10) 70%,
            transparent 100%
          );
        }

        /* ════════════════════════════
           CONTENT WRAPPER
        ════════════════════════════ */
        .pm-hero__wrap {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1700px;
          margin: 0 auto;
          padding: clamp(1rem, 3vw, 3.5rem) clamp(1.25rem, 5vw, 5rem);
          box-sizing: border-box;
        }

        /* Content column — full width mobile, 55% desktop */
        .pm-hero__inner {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        /* ════════════════════════════
           BADGE
        ════════════════════════════ */
        .pm-hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.9rem;
          border-radius: 9999px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          margin-bottom: clamp(0.8rem, 1.5vw, 1.2rem);
          align-self: flex-start;
        }
        .pm-hero__badge-icon {
          width: 0.72rem;
          height: 0.72rem;
          color: #FF8A1C;
          fill: #FF8A1C;
          flex-shrink: 0;
        }
        .pm-hero__badge span {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
        }

        /* ════════════════════════════
           HEADING  — 3 lines on desktop
        ════════════════════════════ */
        .pm-hero__h1 {
          font-family: var(--font-headings, var(--font-sans));
          /* Fluid: small phone → huge desktop */
          font-size: clamp(2rem, 4.5vw, 4.5rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: #fff;
          margin: 0 0 clamp(0.8rem, 1.5vw, 1.2rem);
          /* Don't over-constrain — let the column width control wrapping */
          max-width: none;
        }
        .pm-hero__accent { color: #FF8A1C; }

        /* ════════════════════════════
           SUB-HEADLINE
        ════════════════════════════ */
        .pm-hero__sub {
          font-size: clamp(0.82rem, 1.1vw, 0.98rem);
          color: rgba(255, 255, 255, 0.78);
          line-height: 1.70;
          max-width: none;
          margin: 0 0 clamp(1.2rem, 2vw, 1.8rem);
        }

        /* ════════════════════════════
           CTA BUTTONS
        ════════════════════════════ */
        .pm-hero__btns {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          margin-bottom: clamp(1.4rem, 2.5vw, 2.2rem);
        }
        .pm-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          border-radius: 6px;
          font-size: clamp(0.80rem, 0.95vw, 0.88rem);
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          padding: clamp(0.55rem, 1vw, 0.70rem) clamp(1.1rem, 1.8vw, 1.5rem);
          transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .pm-btn__icon { width: 0.9em; height: 0.9em; flex-shrink: 0; }

        .pm-btn--primary {
          background: #FF8A1C;
          color: #fff;
          border: 2px solid transparent;
        }
        .pm-btn--primary:hover {
          background: #e07818;
        }
        .pm-btn--ghost {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border: 2px solid rgba(255, 255, 255, 0.32);
          backdrop-filter: blur(6px);
        }
        .pm-btn--ghost:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.55);
        }

        /* ════════════════════════════
           TRUST METRICS  (no glass cards)
        ════════════════════════════ */
        .pm-hero__metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.9rem 1.6rem;
          padding-top: clamp(0.8rem, 1.5vw, 1.2rem);
          border-top: 1px solid rgba(255, 255, 255, 0.14);
        }

        /* Each metric: icon-box + text — no glass background */
        .pm-metric {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        /* Icon: just the icon without the box */
        .pm-metric__icon-box {
          width: 3rem;
          height: 3rem;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pm-metric__icon {
          width: 2rem;
          height: 2rem;
          color: #FF8A1C;
          stroke-width: 1.5;
        }

        /* Metric text */
        .pm-metric__text { display: flex; flex-direction: column; }
        .pm-metric__value {
          font-size: 0.90rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
        }
        .pm-metric__label {
          font-size: 0.64rem;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.35;
          margin-top: 0.12rem;
          white-space: pre; /* strictly obey \n, don't auto wrap */
        }

        /* ════════════════════════════
           MOBILE — full width, allow scroll
        ════════════════════════════ */
        @media (max-width: 767px) {
          .pm-hero { 
            height: auto; 
            min-height: 100dvh; 
            align-items: flex-start; /* Stop vertical centering */
            padding-top: calc(var(--header-height, 80px) + 1.5rem);
            padding-bottom: 3rem;
          }
          .pm-hero__inner   { max-width: 100%; }
          .pm-hero__h1      { max-width: 100%; margin-bottom: 1.2rem; }
          .pm-hero__sub     { max-width: 100%; margin-bottom: 1.8rem; }
          .pm-hero__btns    { margin-bottom: 2.5rem; }
          .pm-hero__metrics { 
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem 1rem; 
            padding-top: 1.8rem;
          }
        }

        /* ════════════════════════════
           TABLET — 768px
        ════════════════════════════ */
        @media (min-width: 768px) and (max-width: 1023px) {
          .pm-hero {
            height: auto;
            min-height: 100dvh;
            align-items: flex-start; /* Stop vertical centering */
            padding-top: calc(var(--header-height, 80px) + 3rem);
            padding-bottom: 4rem;
          }
          .pm-hero__h1      { margin-bottom: 1.5rem; }
          .pm-hero__sub     { margin-bottom: 2rem; }
          .pm-hero__btns    { margin-bottom: 3rem; }
        }
        @media (min-width: 768px) {
          .pm-hero__metrics { grid-template-columns: repeat(4, 1fr); }
          .pm-hero__inner   { max-width: 70%; }
        }

        /* ════════════════════════════
           DESKTOP — 1024px
           Content left 55%, right video
        ════════════════════════════ */
        @media (min-width: 1024px) {
          .pm-hero__inner { max-width: 55%; }
          .pm-hero__h1    { max-width: none; }
          .pm-hero__metrics { grid-template-columns: repeat(4, 1fr); }
        }

        /* ════════════════════════════
           LARGE — 1280px
        ════════════════════════════ */
        @media (min-width: 1280px) {
          .pm-hero__inner { max-width: 52%; }
          .pm-hero__h1    { font-size: clamp(2.6rem, 3.8vw, 4.8rem); }
        }

        /* ════════════════════════════
           XL — 1536px+
        ════════════════════════ */
        @media (min-width: 1536px) {
          .pm-hero__inner { max-width: 50%; }
          .pm-hero__h1    { font-size: clamp(3rem, 4vw, 5.2rem); }
        }

      `}</style>
    </section>
  )
}
