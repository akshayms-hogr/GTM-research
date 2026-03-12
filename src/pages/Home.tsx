import React from 'react';
import { MousePointer2, FormInput, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGTM } from '../hooks/useGTM';
import './Home.css';

interface HomeProps {
  onNavigate: (page: 'home' | 'sandbox' | 'docs') => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { pushEvent } = useGTM();

  const handleCTAClick = (label: string) => {
    pushEvent({
      event: 'cta_click',
      cta_label: label,
      page_location: window.location.pathname,
    });
  };

  const handleFeatureClick = (feature: string) => {
    pushEvent({
      event: 'feature_interaction',
      feature_name: feature,
      interaction_type: 'click',
    });
  };

  return (
    <div className="home-container">
      <motion.section 
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="hero-tag">GTM Implementation Research</span>
        <h1 className="hero-title">
          The Ultimate <span className="logo-accent">Research Lab</span> for Google Tag Manager
        </h1>
        <p className="hero-description">
          Test your triggers, validate your variables, and master your tags in an environment built specifically for analytics research.
        </p>
        <div className="hero-actions">
          <button 
            className="btn-primary" 
            onClick={() => {
              handleCTAClick('Start Testing');
              onNavigate('sandbox');
            }}
          >
            Start Testing
          </button>
          <button 
            className="btn-secondary"
            onClick={() => {
              handleCTAClick('Documentation');
              onNavigate('docs');
            }}
          >
            View Docs
          </button>
        </div>
      </motion.section>

      <div className="features-grid">
        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.02 }}
          onClick={() => handleFeatureClick('Click Tracking')}
        >
          <div className="feature-icon"><MousePointer2 /></div>
          <h3 className="feature-title">Click Tracking</h3>
          <p className="feature-description">
            Test elementary click triggers, link trackers, and custom data attributes.
          </p>
        </motion.div>

        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.02 }}
          onClick={() => handleFeatureClick('Form Research')}
        >
          <div className="feature-icon"><FormInput /></div>
          <h3 className="feature-title">Form Research</h3>
          <p className="feature-description">
            Experiment with form submission, field interaction, and validation error tracking.
          </p>
        </motion.div>

        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.02 }}
          onClick={() => handleFeatureClick('E-commerce')}
        >
          <div className="feature-icon"><ShoppingBag /></div>
          <h3 className="feature-title">E-commerce</h3>
          <p className="feature-description">
            Master GA4 Enhanced E-commerce events with our dedicated shop simulator.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
