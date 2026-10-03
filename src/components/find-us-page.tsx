'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import SiteHeader from '@/components/site-header'

export default function FindUsPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return <main className="catalog-page contact-page">
    <SiteHeader activePage="contact" />

    <section className="contact-layout">
      <div className="contact-details">
        <div className="eyebrow">COME FIND US · ISLAMABAD</div>
        <h1>GOOD TIMES<br />ARE <em>UPSTAIRS.</em></h1>
        <p className="contact-intro">Meet us above the everyday for great food, rooftop views, and nights that run a little later.</p>

        <div className="contact-info-list">
          <section className="contact-info-card">
            <span className="contact-index">01 / OUR ADDRESS</span>
            <h2>MURTAZA HEIGHTS</h2>
            <address>1st Floor, Murtaza Heights<br />Street 94, Faizabad, I-8/4<br />Islamabad, 44000, Pakistan</address>
            <a className="under-link" href="https://maps.google.com/?q=Rockstar+Cafe+and+Restaurant+Murtaza+Heights+Islamabad" target="_blank" rel="noreferrer">OPEN IN GOOGLE MAPS <span>↗</span></a>
          </section>
          <section className="contact-info-card contact-info-split">
            <div><span className="contact-index">02 / GIVE US A RING</span><a className="contact-phone" href="tel:+92514866611">051 486 6611</a></div>
            <div><span className="contact-index">03 / THE LATE SHIFT</span><strong className="contact-hours">DAILY · TILL 3 AM</strong></div>
          </section>
        </div>
      </div>

      <section className="contact-form-card" aria-labelledby="contact-form-heading">
        <div className="eyebrow">WE’RE LISTENING</div>
        <h2 id="contact-form-heading">DROP US A LINE.</h2>
        <p>Questions, feedback, or just want to say hello? Leave us a note.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Your name<input name="name" autoComplete="name" placeholder="Name" required /></label>
          <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
          <label>Phone number <span>(optional)</span><input type="tel" name="phone" autoComplete="tel" placeholder="+92" /></label>
          <label>What’s this about?<select name="subject" defaultValue=""><option value="" disabled>Select a topic</option><option>General question</option><option>Feedback</option><option>Visit and reservations</option><option>Something else</option></select></label>
          <label className="contact-message-field">Your message<textarea name="message" rows={5} placeholder="Write your message here..." required /></label>
          <button className="button button-hot contact-submit" type="submit">SEND MESSAGE <span>↗</span></button>
          {submitted && <p className="contact-demo-note" role="status">Thanks for reaching out. This demo form isn’t connected yet, so your message hasn’t been sent. Please call us at (051) 486 6611.</p>}
        </form>
        <div className="contact-form-note">This form is a demo and does not transmit messages.</div>
      </section>
    </section>

    <footer className="footer"><Link className="footer-brand" href="/">ROCKSTAR <em>CAFE.</em></Link><span>GOOD FOOD. GOOD VIBES ONLY.</span><Link href="/menu">EXPLORE THE MENU ↗</Link><div className="footer-copyright">© 2026 ROCKSTAR CAFE & RESTAURANT · ISLAMABAD</div></footer>
  </main>
}
