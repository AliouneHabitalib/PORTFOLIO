document.addEventListener("DOMContentLoaded", () => {

  // ---------------------------
  // VARIABLES
  // ---------------------------
  const headerOffset = 60; // hauteur du header
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav ul li a');
  const revealElements = document.querySelectorAll("section, .skill, .project, .loisir-card");

  // ---------------------------
  // MENU ACTIF
  // ---------------------------
  const setActiveMenu = () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerOffset;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', setActiveMenu);
  setActiveMenu(); // initial

  // ---------------------------
  // SCROLL FLUIDE
  // ---------------------------
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });

  // ---------------------------
  // SCROLL REVEAL & PROGRESS BARS
  // ---------------------------
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add("active");

        // animation des barres de compétences
        el.querySelectorAll('.progress').forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width;
        });
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // déclenchement au chargement
});
