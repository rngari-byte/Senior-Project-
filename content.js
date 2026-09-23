// content.js
// Runs on Instagram/TikTok web pages. Finds images, attaches a small badge
// to each one, and requests a detection result when the user clicks it.

const MIN_IMAGE_SIZE = 150; // ignore tiny icons/avatars/emoji
const processedImages = new WeakSet();

function shouldSkipImage(img) {
  if (processedImages.has(img)) return true;
  if (img.naturalWidth && img.naturalWidth < MIN_IMAGE_SIZE) return true;
  if (img.naturalHeight && img.naturalHeight < MIN_IMAGE_SIZE) return true;
  if (!img.src || img.src.startsWith("data:")) return true; // skip inline/base64 icons
  return false;
}

function createBadge(img) {
  const badge = document.createElement("div");
  badge.className = "ai-checker-badge";
  badge.textContent = "AI?";
  badge.title = "Click to check if this image is AI-generated";

  // Position the badge over the image's parent container.
  img.parentElement.style.position =
    img.parentElement.style.position || "relative";

  badge.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    runDetection(img, badge);
  });

  img.parentElement.appendChild(badge);
}

function runDetection(img, badge) {
  badge.textContent = "…";
  badge.classList.add("ai-checker-loading");

  chrome.runtime.sendMessage(
    { type: "DETECT_IMAGE", imageUrl: img.currentSrc || img.src },
    (response) => {
      badge.classList.remove("ai-checker-loading");

      if (!response || response.error) {
        badge.textContent = "!";
        badge.title = response?.error || "Detection failed";
        badge.classList.add("ai-checker-error");
        return;
      }

      const { label, confidence } = response;
      const pct = Math.round(confidence * 100);

      if (label === "ai_generated") {
        badge.textContent = `AI ${pct}%`;
        badge.classList.add("ai-checker-flagged");
      } else {
        badge.textContent = `Real ${pct}%`;
        badge.classList.add("ai-checker-clear");
      }
      badge.title = `Confidence: ${pct}% ${label.replace("_", " ")}`;
    }
  );
}

function scanForImages() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (shouldSkipImage(img)) return;
    processedImages.add(img);

    // Wait for the image to actually have real dimensions before badging it,
    // since Instagram/TikTok lazy-load a lot of placeholder images.
    if (img.complete && img.naturalWidth > 0) {
      if (!shouldSkipImage(img)) createBadge(img);
    } else {
      img.addEventListener(
        "load",
        () => {
          if (!shouldSkipImage(img)) createBadge(img);
        },
        { once: true }
      );
    }
  });
}

// Initial scan
scanForImages();

// Instagram/TikTok are single-page apps that constantly inject new content
// as you scroll, so we watch the page for changes instead of scanning once.
const observer = new MutationObserver(() => {
  scanForImages();
});
observer.observe(document.body, { childList: true, subtree: true });
