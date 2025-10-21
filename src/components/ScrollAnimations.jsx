import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ScrollAnimations = () => {
  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();
    
    // Animate all sections on scroll
    const sections = gsap.utils.toArray('section');
    sections.forEach((section, i) => {
      // Section fade and scale animation
      gsap.fromTo(
        section,
        {
          opacity: 0.3,
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );
    });
    
    // Parallax effect for all headings
    const headings = gsap.utils.toArray('h1, h2, h3');
    headings.forEach((heading) => {
      gsap.to(heading, {
        y: -50,
        scrollTrigger: {
          trigger: heading,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    });
    
    // Zoom in effect for cards and images
    const cards = gsap.utils.toArray('.project-card, .skill-card, .recognition-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          scale: 0.8,
          opacity: 0,
          rotationY: -30,
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    
    // Text reveal animations
    const textElements = gsap.utils.toArray('.animate-text');
    textElements.forEach((text) => {
      const chars = text.textContent.split('');
      text.innerHTML = chars
        .map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');
      
      gsap.fromTo(
        text.querySelectorAll('.char'),
        {
          opacity: 0,
          y: 20,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    
    // Smooth scroll with GSAP
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          gsap.to(window, {
            duration: 1.5,
            scrollTo: {
              y: target,
              offsetY: 80,
            },
            ease: 'power3.inOut',
          });
        }
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  
  return null;
};

export default ScrollAnimations;
