document.documentElement.classList.add("js");

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const cardLanes = document.querySelector("[data-card-lanes]");

if (cardLanes) {
  const laneTracks = Array.from(cardLanes.querySelectorAll(".card-lane__track"));
  let rafId = 0;

  const resetLanes = () => {
    laneTracks.forEach((track) => {
      track.style.setProperty("--lane-shift", "0px");
    });
  };

  const updateLanes = () => {
    rafId = 0;

    if (motionPreference.matches) {
      resetLanes();
      return;
    }

    const rect = cardLanes.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const progress = (viewportHeight - rect.top) / (rect.height + viewportHeight);
    const centredProgress = Math.max(-1, Math.min(1, progress * 2 - 1));
    const scale = Math.min(window.innerWidth / 1440, 1);

    laneTracks.forEach((track) => {
      const amount = Number.parseFloat(track.parentElement?.dataset.laneShift || "0");
      const shift = amount * centredProgress * scale;
      track.style.setProperty("--lane-shift", `${shift.toFixed(2)}px`);
    });
  };

  const requestLaneUpdate = () => {
    if (rafId) {
      return;
    }

    rafId = window.requestAnimationFrame(updateLanes);
  };

  const handleMotionChange = () => {
    if (motionPreference.matches) {
      resetLanes();
      return;
    }

    requestLaneUpdate();
  };

  window.addEventListener("scroll", requestLaneUpdate, { passive: true });
  window.addEventListener("resize", requestLaneUpdate);

  if (typeof motionPreference.addEventListener === "function") {
    motionPreference.addEventListener("change", handleMotionChange);
  } else {
    motionPreference.addListener(handleMotionChange);
  }

  requestLaneUpdate();
}
