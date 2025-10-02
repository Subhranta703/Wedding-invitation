// Initialize Swiper
const swiper = new Swiper(".swiper", {
  loop: false,
  pagination: { el: ".swiper-pagination" },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
});

// Make text-box draggable inside card
function makeDraggable(el) {
  let offsetX, offsetY, isDragging = false;

  el.addEventListener("mousedown", (e) => {
    // Only drag when clicking on box, not resizing
    if (e.target === el) {
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      el.style.cursor = "grabbing";
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      let parent = el.parentElement;
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;

      // Keep inside card boundaries
      newX = Math.max(0, Math.min(newX, parent.clientWidth - el.offsetWidth));
      newY = Math.max(0, Math.min(newY, parent.clientHeight - el.offsetHeight));

      el.style.left = newX + "px";
      el.style.top = newY + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    el.style.cursor = "move";
  });
}

// Apply draggable & click to all initial text-boxes
let activeBox = null;
document.querySelectorAll(".text-box").forEach(box => {
  makeDraggable(box);
  box.addEventListener("click", () => activeBox = box);
});

// Font controls
document.getElementById("fontFamily").addEventListener("change", (e) => {
  if (activeBox) activeBox.style.fontFamily = e.target.value;
});
document.getElementById("fontColor").addEventListener("input", (e) => {
  if (activeBox) activeBox.style.color = e.target.value;
});
document.getElementById("fontSize").addEventListener("input", (e) => {
  if (activeBox) activeBox.style.fontSize = e.target.value + "px";
});

// Add new text box
document.getElementById("addBox").addEventListener("click", () => {
  let activeSlide = document.querySelector(".swiper-slide-active");
  let newBox = document.createElement("div");
  newBox.className = "text-box";
  newBox.contentEditable = "true";
  newBox.innerText = "New Text";
  activeSlide.appendChild(newBox);

  makeDraggable(newBox);
  newBox.addEventListener("click", () => activeBox = newBox);
});
