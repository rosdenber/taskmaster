import React, { useState, useEffect } from 'react';
import useMousePosition from '../hooks/useMousePosition';

const MouseParticles = () => {
  const mousePosition = useMousePosition();
  const [particles, setParticles] = useState([]);

  // Create particles that follow mouse with delay
  useEffect(() => {
    const updateParticles = () => {
      setParticles(prev => {
        const newParticle = {
          id: Date.now(),
          x: mousePosition.x,
          y: mousePosition.y,
          createdAt: Date.now()
        };
        
        // Keep only particles created in the last 1.5 seconds
        const filtered = prev.filter(p => Date.now() - p.createdAt < 1500);
        return [...filtered, newParticle];
      });
    };

    // Update particles less frequently to create trailing effect
    const interval = setInterval(updateParticles, 100);
    
    return () => clearInterval(interval);
  }, [mousePosition]);

  // Clean up old particles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.createdAt < 1500));
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <>
      {particles.map((particle) => {
        
        const style = {
          position: 'fixed',
          left: particle.x,
          top: particle.y,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(103, 232, 249, 0.1) 70%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.1s, height 0.1s, opacity 0.1s',
          mixBlendMode: 'screen'
        };

        return <div key={particle.id} style={style} />;
      })}
    </>
  );
};

export default MouseParticles;