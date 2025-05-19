// Toggle mobile menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Sticky header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// Back to top button
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("active");
  } else {
    backToTopButton.classList.remove("active");
  }
});

// Add click event listener to back to top button
backToTopButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Project filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    projectCards.forEach((card) => {
      if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Add animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".about-content, .skills-content, .project-card, .contact-content"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Set initial styles for animation
document
  .querySelectorAll(
    ".about-content, .skills-content, .project-card, .contact-content"
  )
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "all 0.5s ease";
  });

// Run animation on scroll and load
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);


const btn = document.getElementById('button');
const spinner = document.getElementById('spinner');
const form = document.getElementById('contactForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Disable the button and show the spinner
  btn.disabled = true;
  btn.value = 'Sending...';
  spinner.style.display = 'inline';

  const serviceID = 'default_service';
  const templateID = 'template_p65zqaz';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.disabled = false;
      btn.value = 'Send Email';
      spinner.style.display = 'none';

      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Your email has been successfully sent.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then(() => {
        form.reset(); // Reset the form after success
      });

    }, (err) => {
      btn.disabled = false;
      btn.value = 'Send Email';
      spinner.style.display = 'none';

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: `<pre>${JSON.stringify(err, null, 2)}</pre>`,
        confirmButtonColor: '#d33'
      });
    });
});