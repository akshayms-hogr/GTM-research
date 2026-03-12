import React, { useState, useEffect, useRef } from 'react';
import { FormInput, Eye, MoveDown, Clock } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useGTM } from '../hooks/useGTM';
import './Sandbox.css';

export const Sandbox: React.FC = () => {
  const { pushEvent } = useGTM();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [timer, setTimer] = useState(0);
  const visibilityRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Timer tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        const next = prev + 5;
        if (next % 15 === 0) {
          pushEvent({
            event: 'timer_threshold',
            seconds_elapsed: next,
          });
        }
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Visibility tracking (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          pushEvent({
            event: 'element_visibility',
            element_id: 'visibility-test-box',
            visibility_ratio: entry.intersectionRatio,
          });
        }
      },
      { threshold: [0.5, 0.9] }
    );

    if (visibilityRef.current) observer.observe(visibilityRef.current);
    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    pushEvent({
      event: 'form_submission',
      form_id: 'contact_research_form',
      form_name: 'GTM Research Contact',
      form_destination: 'mock-api-endpoint',
    });
    alert('Form submitted! Check the Data Layer Monitor.');
  };

  const handleFieldFocus = (fieldName: string) => {
    pushEvent({
      event: 'form_start',
      field_name: fieldName,
    });
  };

  return (
    <div className="sandbox-container">
      <motion.div 
        className="scroll-progress" 
        style={{ 
          scaleX,
          position: 'fixed',
          top: '4rem',
          left: 0,
          right: 0,
          height: '4px',
          background: '#3b82f6',
          transformOrigin: '0%',
          zIndex: 100
        }} 
      />

      <header className="section-header">
        <h2 className="section-title">Analytics Sandbox</h2>
        <p className="section-description">
          A controlled environment to research and validate complex GTM triggers.
        </p>
      </header>

      <div className="sandbox-grid">
        {/* Form Tracking Section */}
        <section className="sandbox-card">
          <h3 className="card-title"><FormInput size={24} /> Form Interaction</h3>
          <p className="card-description">Test Form Submission and Field Interaction triggers.</p>
          
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="John Doe"
                onFocus={() => handleFieldFocus('name')}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="john@example.com"
                onFocus={() => handleFieldFocus('email')}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-primary">Submit Research Form</button>
          </form>
        </section>

        {/* Timer Tracking Section */}
        <section className="sandbox-card">
          <h3 className="card-title"><Clock size={24} /> Timer Trigger</h3>
          <p className="card-description">Currently tracking engagement time. Events fire every 15 seconds.</p>
          <div className="timer-display" style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6' }}>
            {timer}s <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>elapsed</span>
          </div>
        </section>

        {/* Scroll & Visibility Section */}
        <section className="sandbox-card">
          <h3 className="card-title"><Eye size={24} /> Visibility & <MoveDown size={24} /> Scroll</h3>
          <p className="card-description">Scroll down to see the progress bar and trigger visibility events.</p>
          
          <div className="scroll-demo">
            <p className="text-slate-400">Keep scrolling...</p>
            <div ref={visibilityRef} className="visibility-box">
              Visibility Anchor
            </div>
            <p className="text-slate-400">You reached the bottom!</p>
          </div>
        </section>
      </div>
    </div>
  );
};
