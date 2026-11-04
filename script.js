document.documentElement.classList.add("js");

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Keep the shared navigation compact on phones, including the utility pages.
document.querySelectorAll(".site-header").forEach((header, index) => {
  const navigation = header.querySelector(".site-nav");
  const inner = header.querySelector(".site-header__inner");
  if (!navigation || !inner) return;
  navigation.id ||= `primary-navigation-${index}`;
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "nav-toggle";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", navigation.id);
  toggle.innerHTML = '<span>Menu</span><svg class="nav-toggle__open" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg><svg class="nav-toggle__close" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
  inner.insertBefore(toggle, navigation);
  const close = (returnFocus = false) => {
    header.dataset.menuOpen = "false";
    toggle.setAttribute("aria-expanded", "false");
    if (returnFocus) toggle.focus();
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    header.dataset.menuOpen = String(open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") close(true);
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) close();
  });
});

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const cardLanes = document.querySelector("[data-card-lanes]");
if (cardLanes) {
  const laneTracks = Array.from(cardLanes.querySelectorAll(".card-lane__track"));
  let rafId = 0;
  const resetLanes = () => laneTracks.forEach((track) => track.style.setProperty("--lane-shift", "0px"));
  const updateLanes = () => {
    rafId = 0;
    if (motionPreference.matches) { resetLanes(); return; }
    const rect = cardLanes.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const progress = (viewportHeight - rect.top) / (rect.height + viewportHeight);
    const centredProgress = Math.max(-1, Math.min(1, progress * 2 - 1));
    const mobile = window.innerWidth < 720;
    const scale = Math.min(window.innerWidth / 1440, 1);
    laneTracks.forEach((track) => {
      const amount = Number.parseFloat(track.parentElement?.dataset.laneShift || "0");
      // Small mobile shifts preserve a fully readable central card.
      const distance = mobile ? Math.sign(amount) * 22 : amount * scale;
      track.style.setProperty("--lane-shift", `${(distance * centredProgress).toFixed(2)}px`);
    });
  };
  const requestLaneUpdate = () => {
    if (!rafId) rafId = window.requestAnimationFrame(updateLanes);
  };
  const handleMotionChange = () => motionPreference.matches ? resetLanes() : requestLaneUpdate();
  window.addEventListener("scroll", requestLaneUpdate, {passive: true});
  window.addEventListener("resize", requestLaneUpdate);
  if (typeof motionPreference.addEventListener === "function") motionPreference.addEventListener("change", handleMotionChange);
  else motionPreference.addListener(handleMotionChange);
  requestLaneUpdate();
}

// Illustrative saved-context examples. These do not read source apps or run models.
document.querySelectorAll("[data-context-explorer]").forEach((explorer) => {
  const choices = Array.from(explorer.querySelectorAll("[data-context-choice]"));
  const examples = Array.from(explorer.querySelectorAll("[data-context-example]"));
  choices.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.contextChoice;
      choices.forEach((choice) => choice.setAttribute("aria-pressed", String(choice === button)));
      examples.forEach((example) => { example.hidden = example.dataset.contextExample !== selected; });
    });
  });
});
