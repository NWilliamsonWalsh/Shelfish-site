document.documentElement.classList.add("js");

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const cardStreams = document.querySelector("[data-card-streams]");

if (cardStreams) {
  const streamItems = Array.from(cardStreams.querySelectorAll(".card-stream"));
  let rafId = 0;

  const resetStreams = () => {
    streamItems.forEach((item) => {
      item.style.setProperty("--stream-x", "0px");
      item.style.setProperty("--stream-y", "0px");
      item.style.setProperty("--stream-rotate", "0deg");
    });
  };

  const updateStreams = () => {
    rafId = 0;

    if (motionPreference.matches) {
      resetStreams();
      return;
    }

    const rect = cardStreams.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const progress = (viewportHeight - rect.top) / (rect.height + viewportHeight);
    const centredProgress = Math.max(-1, Math.min(1, progress * 2 - 1));
    const scale = Math.min(window.innerWidth / 1440, 1);

    streamItems.forEach((item) => {
      const x = Number.parseFloat(item.dataset.streamX || "0") * centredProgress * scale;
      const y = Number.parseFloat(item.dataset.streamY || "0") * centredProgress * scale;
      const rotation = Number.parseFloat(item.dataset.streamRotate || "0") * centredProgress;

      item.style.setProperty("--stream-x", `${x.toFixed(2)}px`);
      item.style.setProperty("--stream-y", `${y.toFixed(2)}px`);
      item.style.setProperty("--stream-rotate", `${rotation.toFixed(2)}deg`);
    });
  };

  const requestStreamUpdate = () => {
    if (rafId) {
      return;
    }

    rafId = window.requestAnimationFrame(updateStreams);
  };

  const handleMotionChange = () => {
    if (motionPreference.matches) {
      resetStreams();
      return;
    }

    requestStreamUpdate();
  };

  window.addEventListener("scroll", requestStreamUpdate, { passive: true });
  window.addEventListener("resize", requestStreamUpdate);

  if (typeof motionPreference.addEventListener === "function") {
    motionPreference.addEventListener("change", handleMotionChange);
  } else {
    motionPreference.addListener(handleMotionChange);
  }

  requestStreamUpdate();
}
