// Run: node scripts/generate-icons.mjs
// Requires: npm install sharp (dev only)
// OR just use https://favicon.io to generate icons and place in public/icons/

import { createCanvas } from "canvas";
import { writeFileSync, mkdirSync } from "fs";

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

mkdirSync("public/icons", { recursive: true });

for (const size of sizes) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Background
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, "#eab308");
  grad.addColorStop(1, "#f97316");
  ctx.fillStyle = grad;
  ctx.roundRect(0, 0, size, size, size * 0.2);
  ctx.fill();

  // Text
  ctx.fillStyle = "#000";
  ctx.font = `bold ${size * 0.35}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("বচ", size / 2, size / 2);

  writeFileSync(`public/icons/icon-${size}x${size}.png`, canvas.toBuffer("image/png"));
  console.log(`✓ icon-${size}x${size}.png`);
}
console.log("Done! Icons generated in public/icons/");
