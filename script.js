// Live Countdown Timer to Fest Start
const festStartDate = new Date("2027-04-18T09:00:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = festStartDate - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Light / Dark Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-theme");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
});

// Mobile Navigation Drawer Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.setAttribute("aria-expanded", "false");
hamburger.setAttribute("aria-controls", "nav-menu");

function setMobileMenu(open) {
  navMenu.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", String(open));
}

hamburger.addEventListener("click", () => {
  setMobileMenu(!navMenu.classList.contains("open"));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMobileMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMobileMenu(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) setMobileMenu(false);
});

// Schedule Data & Tab Switching
const scheduleByDay = {
  day1: [
    { time: "09:00 AM", event: "Opening Ceremony & Club Showcase", track: "General", location: "Main Auditorium" },
    { time: "10:00 AM", event: "HackPulse 24-Hr Hackathon Kickoff", track: "Technical", location: "Computing Lab 3" },
    { time: "01:30 PM", event: "PixelCraft UI/UX Sprint", track: "Design", location: "Design Studio 2" },
    { time: "06:00 PM", event: "Acoustic Evening & Open Mic", track: "Cultural", location: "Open Air Theatre" }
  ],
  day2: [
    { time: "10:00 AM", event: "Hackathon Demos & Judging", track: "Technical", location: "Seminar Hall A" },
    { time: "11:00 AM", event: "CyberClash Esports Arena", track: "Gaming", location: "Student Activity Hall" },
    { time: "02:00 PM", event: "RoboWars & Line Follower", track: "Robotics", location: "Central Quadrangle" },
    { time: "06:30 PM", event: "DJ Night & Campus Jam", track: "Cultural", location: "Tech Quad" }
  ],
  day3: [
    { time: "10:30 AM", event: "Web & Career Lightning Talks", track: "Workshop", location: "Main Auditorium" },
    { time: "02:00 PM", event: "Student Club Project Expo", track: "Exhibition", location: "Atrium Hall" },
    { time: "05:00 PM", event: "RhythmX: Battle of the Bands", track: "Cultural", location: "Open Air Theatre" },
    { time: "08:00 PM", event: "Awards & Closing Ceremony", track: "Ceremony", location: "Main Auditorium" }
  ]
};

const scheduleTbody = document.getElementById("schedule-tbody");
const dayTabs = document.querySelectorAll(".day-tab");

function renderSchedule(dayKey) {
  const rows = scheduleByDay[dayKey] || [];
  scheduleTbody.innerHTML = rows
    .map(
      (item) => `
      <tr>
        <td><strong>${item.time}</strong></td>
        <td>${item.event}</td>
        <td>${item.track}</td>
        <td>${item.location}</td>
      </tr>
    `
    )
    .join("");
}

dayTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    dayTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    renderSchedule(tab.dataset.day);
  });
});

renderSchedule("day1");

// Registration Form Validation & Confirmation
const regForm = document.getElementById("registration-form");
const feedbackEl = document.getElementById("form-status");

regForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email-address").value.trim();
  const college = document.getElementById("college-club").value.trim();
  const year = document.getElementById("academic-year").value;
  const selectedEvents = Array.from(regForm.querySelectorAll('input[name="eventChoice"]:checked')).map(
    (cb) => cb.value
  );

  if (!name || !email || !college || !year) {
    feedbackEl.className = "form-status error";
    feedbackEl.textContent = "Please fill in all required fields.";
    return;
  }

  if (selectedEvents.length === 0) {
    feedbackEl.className = "form-status error";
    feedbackEl.textContent = "Please select at least one event to register.";
    return;
  }

  feedbackEl.className = "form-status success";
  feedbackEl.textContent = `Registered ${name} (${year}) for ${selectedEvents.join(", ")}. Confirmation details will be sent to ${email}.`;
  regForm.reset();
});

// Highlight the navigation link for the section currently in view
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const observedSections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) return;

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visibleEntry.target.id}`);
    });
  },
  {
    rootMargin: "-68px 0px -55% 0px",
    threshold: [0.05, 0.15, 0.3, 0.5]
  }
);

observedSections.forEach((section) => sectionObserver.observe(section));