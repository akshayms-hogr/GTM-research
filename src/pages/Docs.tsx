import React from 'react';
import { BookOpen, Code, Zap, MousePointer2, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import './Docs.css';

export const Docs: React.FC = () => {
  return (
    <div className="docs-container">
      <motion.header 
        className="docs-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="docs-title"><BookOpen className="inline-icon" /> Documentation</h1>
        <p className="docs-subtitle">Mastering GTM through hands-on research and implementation.</p>
      </motion.header>

      <div className="docs-grid">
        <aside className="docs-sidebar">
          <nav>
            <ul>
              <li><a href="#features">Website Features</a></li>
              <li><a href="#gtm-logic">GTM Core Logic</a></li>
              <li><a href="#event-types">Event Implementation</a></li>
              <li><a href="#debugging">Research Tools</a></li>
            </ul>
          </nav>
        </aside>

        <main className="docs-content">
          <section id="features" className="docs-section">
            <h2><Zap className="section-icon" /> Website Features</h2>
            <div className="feature-doc">
              <h3>Click Tracking Research</h3>
              <p>Simulates link clicks and button interactions to test "All Elements" and "Just Links" triggers in GTM.</p>
            </div>
            <div className="feature-doc">
              <h3>Form Interaction Lab</h3>
              <p>Research how GTM handles form submissions and field-level interactions (focus/blur events).</p>
            </div>
            <div className="feature-doc">
              <h3>E-commerce Simulator</h3>
              <p>A full funnel simulation to test GA4 Enhanced E-commerce events: <code>view_item</code>, <code>add_to_cart</code>, and <code>purchase</code>.</p>
            </div>
          </section>

          <section id="gtm-logic" className="docs-section">
            <h2><Code className="section-icon" /> GTM Core Logic</h2>
            <div className="feature-doc">
              <h3>Custom Hook Implementation</h3>
              <p>Our implementation uses a custom hook <code>useGTM</code> to manage interactions with the Google Tag Manager container. Here is how the push event logic is structured:</p>
              <pre className="code-snippet">
                <span className="tk-kw">const</span> <span className="tk-fn">pushEvent</span> = (<span className="tk-pr">eventData</span>: <span className="tk-ty">GTMEvent</span>) ={">"} {'{'}
  <span className="tk-pr">window</span>.dataLayer = <span className="tk-pr">window</span>.dataLayer || [];
  <span className="tk-pr">window</span>.dataLayer.push({'{'}
    ...<span className="tk-pr">eventData</span>,
    <span className="tk-pr">gtm_debug</span>: <span className="tk-kw">true</span>,
    <span className="tk-pr">timestamp</span>: <span className="tk-kw">new</span> <span className="tk-pr">Date</span>().toISOString(),
  {'}'});
{'}'};
              </pre>
            </div>
          </section>

          <section id="event-types" className="docs-section">
            <h2><Terminal className="section-icon" /> Event Implementation</h2>
            
            <div className="event-doc">
              <h3>1. General Interactions</h3>
              <p>Used for simple clicks and navigation events.</p>
              <pre className="code-snippet">
                <span className="tk-fn">pushEvent</span>({'{'}
  <span className="tk-pr">event</span>: <span className="tk-st">'cta_click'</span>,
  <span className="tk-pr">cta_label</span>: <span className="tk-st">'Start Testing'</span>,
  <span className="tk-pr">page_location</span>: <span className="tk-st">'/home'</span>
{'}'});
              </pre>
            </div>

            <div className="event-doc">
              <h3>2. Form Research</h3>
              <p>Triggers when users interact with fields or submit the research form.</p>
              <pre className="code-snippet">
                <span className="tk-fn">pushEvent</span>({'{'}
  <span className="tk-pr">event</span>: <span className="tk-st">'form_submission'</span>,
  <span className="tk-pr">form_id</span>: <span className="tk-st">'contact_research_form'</span>,
  <span className="tk-pr">form_name</span>: <span className="tk-st">'GTM Research Contact'</span>
{'}'});
              </pre>
            </div>

            <div className="event-doc">
              <h3>3. Timer Tracking</h3>
              <p>Engagement tracking that fires every 15 seconds to measure session depth.</p>
              <pre className="code-snippet">
                <span className="tk-fn">pushEvent</span>({'{'}
  <span className="tk-pr">event</span>: <span className="tk-st">'timer_threshold'</span>,
  <span className="tk-pr">seconds_elapsed</span>: <span className="tk-num">15</span>
{'}'});
              </pre>
            </div>

            <div className="event-doc">
              <h3>4. E-commerce Funnel</h3>
              <p>Follows GA4 schema for modern analytics implementation.</p>
              <pre className="code-snippet">
                <span className="tk-fn">pushEvent</span>({'{'}
  <span className="tk-pr">event</span>: <span className="tk-st">'add_to_cart'</span>,
  <span className="tk-ecommerce">ecommerce</span>: {'{'}
    <span className="tk-pr">currency</span>: <span className="tk-st">'USD'</span>,
    <span className="tk-pr">value</span>: <span className="tk-num">99.00</span>,
    <span className="tk-pr">items</span>: [
      {'{'}
        <span className="tk-pr">item_id</span>: <span className="tk-st">'prod_1'</span>,
        <span className="tk-pr">item_name</span>: <span className="tk-st">'GTM Course'</span>
      {'}'}
    ]
  {'}'}
{'}'});
              </pre>
            </div>
          </section>

          <section id="debugging" className="docs-section">
            <h2><MousePointer2 className="section-icon" /> Research Tools</h2>
            <p>We've implemented a custom <strong>Data Layer Monitor</strong> (visible at the bottom of the screen) that captures all <code>gtm_push</code> events in real-time, allowing you to see exactly what GTM sees without opening the browser console.</p>
          </section>
        </main>
      </div>
    </div>
  );
};
