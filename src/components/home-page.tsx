'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import SiteHeader, { hasNavigatedAwayFromHome } from '@/components/site-header'

let introPlayedInCurrentDocument = false

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false)
  const [showReturnImage, setShowReturnImage] = useState(() => hasNavigatedAwayFromHome || introPlayedInCurrentDocument)
  const [menuRevealStep, setMenuRevealStep] = useState(0)
  const [rooftopRevealed, setRooftopRevealed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const menuSectionRef = useRef<HTMLElement>(null)
  const rooftopSectionRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') {
      introPlayedInCurrentDocument = true
      setShowReturnImage(true)
      videoRef.current?.pause()
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const returningFromAnotherPage = hasNavigatedAwayFromHome || introPlayedInCurrentDocument
    if (reduceMotion || returningFromAnotherPage) {
      setIntroComplete(true)
      setShowReturnImage(true)
      return
    }

    videoRef.current?.play().catch(() => setIntroComplete(true))
  }, [pathname])

  useEffect(() => {
    if (introComplete) return

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
    }
  }, [introComplete])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMenuRevealStep(3)
      return
    }

    const updateRevealStep = () => {
      const section = menuSectionRef.current
      if (!section) return
      const scrollDistance = section.offsetHeight - window.innerHeight
      const progress = scrollDistance > 0 ? Math.max(0, Math.min(1, -section.getBoundingClientRect().top / scrollDistance)) : 1
      setMenuRevealStep(progress < .22 ? 0 : progress < .52 ? 1 : progress < .76 ? 2 : 3)
    }

    updateRevealStep()
    window.addEventListener('scroll', updateRevealStep, { passive: true })
    window.addEventListener('resize', updateRevealStep)
    return () => {
      window.removeEventListener('scroll', updateRevealStep)
      window.removeEventListener('resize', updateRevealStep)
    }
  }, [])

  useEffect(() => {
    const section = rooftopSectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRooftopRevealed(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      setRooftopRevealed(entry.isIntersecting)
    }, { threshold: .2 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return <main className={`min-h-screen home-page ${introComplete ? 'hero-intro-complete' : 'hero-intro-pending'}`}>
    <SiteHeader activePage="home" home />

    <section className="hero-video-section" id="top">
      {showReturnImage
        ? <div className="hero-return-art"><Image src="/assets/Hero%20section.png" alt="Rockstar Cafe interior" fill priority sizes="100vw" /></div>
        : <video ref={videoRef} className="hero-video" muted playsInline controls={false} preload="auto" aria-label="Rockstar Cafe and Restaurant" onPlay={() => { introPlayedInCurrentDocument = true }} onEnded={() => setIntroComplete(true)}>
          <source src="/assets/rockstar-hero.mp4" type="video/mp4" />
        </video>}
      <div className="hero-video-shade" />
      <div className="hero-copy">
        <div className="eyebrow"><span className="live-dot" /> ISLAMABAD · OPEN UNTIL 3 AM</div>
        <h1>GOOD FOOD.<br /><em>GREAT NIGHTS.</em></h1>
        <p>Make a night of it. Catch your favourites, find your rooftop table, and stay a little longer.</p>
        <div className="hero-actions"><Link className="button button-hot" href="/menu">EXPLORE THE MENU <span>↗</span></Link><a className="text-link" href="#visit">Find your way here <span>↓</span></a></div>
      </div>
      <div className="video-caption"><span>ROCKSTAR CAFE & RESTAURANT</span><span>FAIZABAD · ISLAMABAD</span></div>
    </section>

    <section className="home-menu" id="menu" ref={menuSectionRef}>
      <div className="home-menu-stage" data-step={menuRevealStep}>
      <div className="section-heading"><div><div className="eyebrow">THE FULL SETLIST</div><h2>YOUR TABLE.<br /><em>YOUR CALL.</em></h2></div><p>From the first bite to the last round.<br />Pick your favourites.</p></div>
      <div className="home-menu-cards" data-step={menuRevealStep}>
        <Link className="home-menu-card" href="/menu?category=Burgers%20%26%20Sandwiches" tabIndex={menuRevealStep > 0 ? 0 : -1} aria-hidden={menuRevealStep === 0}><Image src="/assets/burger/Burger_Rockstar%20special%20burger.png" alt="Rockstar Special Burger" fill sizes="(max-width: 700px) 100vw, 50vw" /><span>01 / THE HEADLINERS</span><b>BURGERS &<br />SANDWICHES ↗</b></Link>
        <Link className="home-menu-card" href="/menu?category=Steaks" tabIndex={menuRevealStep > 1 ? 0 : -1} aria-hidden={menuRevealStep < 2}><Image src="/assets/steak/rockstar_special%20steak.png" alt="Rockstar Special Steak" fill sizes="(max-width: 700px) 100vw, 50vw" /><span>02 / THE MAIN EVENT</span><b>STEAKS &<br />SEAFOOD ↗</b></Link>
        <Link className="home-menu-card" href="/menu?category=Cocktails" tabIndex={menuRevealStep > 2 ? 0 : -1} aria-hidden={menuRevealStep < 3}><Image src="/assets/cocktail/cocktail_rock%20star%20special.png" alt="Rockstar Special cocktail" fill sizes="(max-width: 700px) 100vw, 50vw" /><span>03 / THE ENCORE</span><b>DRINKS &<br />SOMETHING SWEET ↗</b></Link>
      </div>
      <Link className="all-menu-link" href="/menu" tabIndex={menuRevealStep === 3 ? 0 : -1}>SEE THE FULL MENU <span>↗</span></Link>
      </div>
    </section>

    <div className="ticker" aria-label="Good food, good vibes, open late, rooftop views, and great company">
      <div className="ticker-track">
        <div className="ticker-group">{['GOOD FOOD', 'GOOD VIBES ONLY', 'OPEN LATE', 'ROOFTOP VIEWS', 'MADE FOR GOOD TIMES', 'YOUR NIGHT, YOUR WAY'].map(item => <span key={item}>{item} <b>✳</b></span>)}</div>
        <div className="ticker-group" aria-hidden="true">{['GOOD FOOD', 'GOOD VIBES ONLY', 'OPEN LATE', 'ROOFTOP VIEWS', 'MADE FOR GOOD TIMES', 'YOUR NIGHT, YOUR WAY'].map(item => <span key={item}>{item} <b>✳</b></span>)}</div>
      </div>
    </div>

    <section className="rooftop-section" id="rooftop" ref={rooftopSectionRef} data-revealed={rooftopRevealed}>
      <div className="rooftop-photo"><Image src="/assets/Hero%20section.png" alt="Inside the colourful Rockstar Cafe, Islamabad" fill sizes="(max-width: 800px) 100vw, 55vw" /></div>
      <div className="rooftop-copy"><div className="eyebrow">A CHANGE OF SCENERY</div><h2>TAKE IT<br />TO THE <em>TOP.</em></h2><p>Catch the city after dark from our rooftop. Fresh air, good company, and your new favourite table above the noise.</p><a href="#visit" className="button button-outline">FIND YOUR WAY UP <span>↗</span></a><div className="roof-stamp" aria-hidden="true">ROOFTOP<br />SEATING<br /><b>✳</b></div></div>
    </section>

    <section className="visit-section section-pad" id="visit">
      <div className="section-heading"><div><div className="eyebrow">SAVE US A SEAT</div><h2>SEE YOU <em>SOON.</em></h2></div><span className="visit-mark">ISLAMABAD, PK <b>✳</b></span></div>
      <div className="visit-grid">
        <div className="visit-card visit-address"><span className="visit-number">01 / FIND THE PLACE</span><h3>UP ABOVE<br /><em>MURTAZA HEIGHTS.</em></h3><address>1st Floor, Murtaza Heights<br />Street 94, Faizabad, I-8/4<br />Islamabad, 44000</address><a className="under-link" href="https://maps.google.com/?q=Rockstar+Cafe+and+Restaurant+Murtaza+Heights+Islamabad" target="_blank" rel="noreferrer">OPEN IN GOOGLE MAPS <span>↗</span></a></div>
        <div className="visit-card visit-phone"><span className="visit-number">02 / GIVE US A RING</span><a className="phone-big" href="tel:+92514866611">051 486 6611</a><a className="under-link" href="tel:+92514866611">TAP TO CALL <span>↗</span></a></div>
        <div className="visit-card visit-hours"><span className="visit-number">03 / THE LATE SHIFT</span><div className="hours-open"><span className="live-dot" /> OPEN DAILY</div><div className="closing-time">TILL <em>3</em> AM</div><p>For the after-hours appetite.</p><div className="tiny-stars">✳ &nbsp; ✳ &nbsp; ✳ &nbsp; ✳ &nbsp; ✳</div></div>
      </div>
    </section>

    <footer className="footer"><a className="footer-brand" href="#top">ROCKSTAR <em>CAFE.</em></a><span>GOOD FOOD. GOOD VIBES ONLY.</span><Link href="/menu">ORDER ONLINE ↗</Link><div className="footer-copyright">© 2026 ROCKSTAR CAFE & RESTAURANT · ISLAMABAD</div></footer>
  </main>
}
