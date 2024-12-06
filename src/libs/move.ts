const constellation =
  document.getElementById("constellation");
const box = document.getElementById("box");
document.addEventListener("mousemove", (event) => {
  const xPosition = event.clientX;
  const yPosition = event.clientY;
  if (!box) return;
  let rect = box.getBoundingClientRect();
  if (box) {
    let { x, y } = transforms(xPosition, yPosition, box);

    console.log({ x, y }, "YPOSITION");
    if (constellation)
      constellation.style.transform = `rotateX(${x}deg) rotateY(${y + 30}deg)`;
  }

  // Apply the rotation to the element
});
let constrain = 20;

function transforms(x: number, y: number, el: HTMLElement) {
  let box = el.getBoundingClientRect();

  const h = box.height / 2;
  const w = box.width / 2;
  let calcX = -(y - h) / constrain;
  let calcY = (x - w) / constrain;

  return { x: calcX, y: calcY };
}
