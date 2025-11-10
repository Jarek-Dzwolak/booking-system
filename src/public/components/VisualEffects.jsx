import { useEffect } from 'react';
import useSalonConfig from '../hooks/useSalonConfig';

const VisualEffects = () => {
  const { effects, colors } = useSalonConfig();

  useEffect(() => {
    // Cursor trail effect
    if (effects.cursorTrail) {
      const handleMouseMove = (e) => {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.width = '10px';
        trail.style.height = '10px';
        trail.style.borderRadius = '50%';
        trail.style.background = 'rgba(255, 107, 157, 0.3)';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.pointerEvents = 'none';
        trail.style.transition = 'all 0.5s ease';
        trail.style.zIndex = '9999';

        document.body.appendChild(trail);

        setTimeout(() => {
          trail.style.opacity = '0';
          trail.style.transform = 'scale(2)';
        }, 10);

        setTimeout(() => {
          if (document.body.contains(trail)) {
            document.body.removeChild(trail);
          }
        }, 500);
      };

      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [effects.cursorTrail]);

  useEffect(() => {
    // Floating particles effect
    if (effects.floatingParticles) {
      const createParticle = () => {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.background = 'rgba(255, 192, 203, 0.5)';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';

        document.body.appendChild(particle);

        const duration = (Math.random() * 3000 + 2000) / effects.animationSpeed;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = elapsed / duration;

          if (progress < 1) {
            particle.style.top = window.innerHeight - progress * window.innerHeight + 'px';
            particle.style.opacity = 1 - progress;
            requestAnimationFrame(animate);
          } else {
            if (document.body.contains(particle)) {
              document.body.removeChild(particle);
            }
          }
        };

        animate();
      };

      const interval = setInterval(createParticle, 3000 / effects.animationSpeed);

      return () => {
        clearInterval(interval);
      };
    }
  }, [effects.floatingParticles, effects.animationSpeed]);

  return null; // Ten komponent nie renderuje nic wizualnie
};

export default VisualEffects;
