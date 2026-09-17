const storyLines = [
  "Some stories are written.",
  "Some are simply lived.",
  "Ours started with a moment.",
  "Then came a thousand little ones.",
  "The jokes.",
  "The late-night conversations.",
  "The memories we never planned.",
  "And somehow, they became everything.",
  "So this is a little place for all of it."
];

const storyText = document.getElementById("storyText");
const progress = document.getElementById("storyProgress");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const enterBtn = document.getElementById("enterBtn");
const story = document.getElementById("story");
let index = 0;
let animating = false;

function renderLine(direction = "in") {
  if (animating) return;
  animating = true;

  storyText.classList.remove("entering", "leaving");
  storyText.classList.add("leaving");

  setTimeout(() => {
    storyText.textContent = storyLines[index];
    storyText.classList.remove("leaving");
    storyText.classList.add("entering");

    progress.style.width = `${((index + 1) / storyLines.length) * 100}%`;
    backBtn.style.visibility = index === 0 ? "hidden" : "visible";

    const final = index === storyLines.length - 1;
    nextBtn.hidden = final;
    enterBtn.hidden = !final;

    setTimeout(() => {
      animating = false;
    }, 700);
  }, 450);
}

nextBtn.addEventListener("click", () => {
  if (index < storyLines.length - 1) {
    index++;
    renderLine("next");
  }
});

backBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    renderLine("back");
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight" && !nextBtn.hidden) nextBtn.click();
  if (e.key === "ArrowLeft" && index > 0) backBtn.click();
});

enterBtn.addEventListener("click", () => {
  story.classList.add("fade-away");
  setTimeout(() => {
    story.hidden = true;
    document.getElementById("heroVideo").hidden = false;
    window.scrollTo({ top: 0, behavior: "instant" });
    document.body.classList.add("entered");
  }, 650);
});

renderLine();

/* Video controls — intentionally only play/pause is exposed. */
document.querySelectorAll(".play-toggle").forEach(button => {
  const video = document.getElementById(button.dataset.video);

  const sync = () => {
    button.classList.toggle("is-playing", !video.paused);
    button.setAttribute("aria-label", video.paused ? "Play video" : "Pause video");
  };

  button.addEventListener("click", () => {
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  });
  video.addEventListener("play", sync);
  video.addEventListener("pause", sync);
  video.addEventListener("ended", sync);
});

/* Reveal animations */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll(".gallery figure, .chat-card, .section-intro").forEach(el => observer.observe(el));

/* Birthday card */
const birthdayCard = document.getElementById("birthdayCard");
document.getElementById("openBirthday").addEventListener("click", () => {
  birthdayCard.classList.add("open");
});
document.getElementById("closeBirthday").addEventListener("click", () => {
  birthdayCard.classList.remove("open");
});
