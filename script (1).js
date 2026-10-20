// 1. Mobile menu: show or hide the menu when the Menu button is pressed
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
nav.addEventListener("click", () => nav.classList.remove("open"));

// 2. Gallery filter: show only the photos in the chosen category
const filterButtons = document.querySelectorAll("#filters button");
const photos = document.querySelectorAll("#gallery figure");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("on"));
    button.classList.add("on");
    const chosen = button.dataset.cat;
    photos.forEach((photo) => {
      const show = chosen === "all" || photo.dataset.cat === chosen;
      photo.style.display = show ? "" : "none";
    });
  });
});

// 3. Hide any photo that fails to load, instead of showing a broken box
photos.forEach((photo) => {
  photo.querySelector("img").addEventListener("error", () => {
    photo.style.display = "none";
  });
});

// 4. Quote form: build a WhatsApp message from the form and open it
document.getElementById("quoteForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const text =
    "Hello Big Jay, my name is " + data.get("name") + ".\n" +
    "I need a quote for: " + data.get("service") + ".\n" +
    (data.get("message") ? data.get("message") + "\n" : "") +
    "Phone: " + data.get("phone");
  window.open("https://wa.me/264816016025?text=" + encodeURIComponent(text), "_blank");
});

// 5. Hide a video slot if its video file is missing
document.querySelectorAll(".video-card").forEach((card) => {
  const source = card.querySelector("source");
  source.addEventListener("error", () => { card.style.display = "none"; });
});

// 6. Zoom: click a gallery or job photo to open it large
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
document.addEventListener("click", (event) => {
  const img = event.target.closest(".gallery img, .story img");
  if (!img) return;
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbCap.textContent = img.alt;
  lightbox.showModal();
});
document.getElementById("lbClose").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });

// 7. Hide a job story, or the whole section, until its photos exist
window.addEventListener("load", () => {
  setTimeout(() => {
    const stories = document.querySelectorAll(".story");
    stories.forEach((story) => {
      const missing = [...story.querySelectorAll("img")].some((i) => !(i.complete && i.naturalWidth > 0));
      if (missing) story.style.display = "none";
    });
    const shown = [...stories].filter((s) => s.style.display !== "none");
    if (shown.length === 0) document.getElementById("stories").style.display = "none";
  }, 500);
});
