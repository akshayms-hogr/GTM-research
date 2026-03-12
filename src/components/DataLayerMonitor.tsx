import React, { useState, useEffect } from 'react';
import { Terminal, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import './DataLayerMonitor.css';

export const DataLayerMonitor: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleGTMPush = (e: any) => {
      setEvents((prev) => [e.detail, ...prev].slice(0, 50));
    };

    window.addEventListener('gtm_push', handleGTMPush);
    return () => window.removeEventListener('gtm_push', handleGTMPush);
  }, []);

  return (
    <div className={`monitor-container ${!isExpanded ? 'collapsed' : ''}`}>
      <div 
        className="monitor-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="monitor-title-group">
          <Terminal size={18} />
          <span className="monitor-title">Data Layer Monitor</span>
          <span className="monitor-count">
            {events.length}
          </span>
        </div>
        <div className="monitor-actions">
          <button 
            onClick={(e) => { e.stopPropagation(); setEvents([]); }}
            className="monitor-clear-btn"
            title="Clear events"
          >
            <Trash2 size={16} />
          </button>
          {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </div>
      </div>

      {isExpanded && (
        <div className="monitor-content">
          {events.length === 0 ? (
            <div className="empty-state">
              No events captured yet...
            </div>
          ) : (
            events.map((ev, i) => (
              <div key={i} className="event-card">
                <div className="event-card-header">
                  <span className="event-name">{ev.event}</span>
                  <span className="event-time">{new Date().toLocaleTimeString()}</span>
                </div>
                <pre className="event-data">
                  {JSON.stringify(ev, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
