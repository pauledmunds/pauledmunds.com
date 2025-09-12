function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noCursor();
  for (let i = 0; i < 200; i++) {
    stars.push(createVector(random(width), random(height), random(1, 3)));
  }
}

let stars = [];
let scanAngle = 0;
let themeColor = '#00ffee';
let pulses = [];

function draw() {
  background(10);
  drawStarfield();
  drawPanels();
  drawRadar();
  drawCrosshair();
  drawReadouts();
  updatePulses();
  scanAngle = (scanAngle + 1) % 360;
}

function drawStarfield() {
  push();
  stroke(themeColor);
  strokeWeight(2);
  stars.forEach((s) => {
    point(s.x, s.y);
    s.y += s.z;
    if (s.y > height) {
      s.y = 0;
      s.x = random(width);
    }
  });
  pop();
}

function drawPanels() {
  push();
  noFill();
  stroke(themeColor);
  rectMode(CORNERS);
  rect(20, 20, width / 4, height - 20);
  rect(width - width / 4, 20, width - 20, height - 20);

  for (let i = 0; i < 10; i++) {
    let x = 30;
    let y = 40 + i * 30;
    let w = map(sin(frameCount + i * 20), -1, 1, 20, width / 4 - 40);
    rect(x, y, x + w, y + 20);
  }

  for (let i = 0; i < 6; i++) {
    let x = width - width / 4 + 20;
    let y = 40 + i * 60;
    let h = map(cos(frameCount + i * 40), -1, 1, 20, 100);
    rect(x, y, x + width / 4 - 40, y + h);
  }
  pop();
}

function drawRadar() {
  push();
  translate(width / 2, height / 2);
  stroke(themeColor);
  noFill();
  ellipse(0, 0, height * 0.6);
  ellipse(0, 0, height * 0.4);
  ellipse(0, 0, height * 0.2);
  line(0, 0, (height * 0.3) * cos(scanAngle), (height * 0.3) * sin(scanAngle));
  pulses.push({r:5});
  pop();
}

function drawReadouts() {
  push();
  fill(themeColor);
  noStroke();
  textSize(16);
  textAlign(CENTER);
  text("STARSHIP OPS", width / 2, height - 40);
  text("X:" + nf(mouseX,3) + " Y:" + nf(mouseY,3), width / 2, height - 20);
  text("PULSES:" + pulses.length, width / 2, height - 60);
  pop();
}

function updatePulses() {
  push();
  stroke(themeColor);
  noFill();
  pulses.forEach((p) => {
    ellipse(width / 2, height / 2, p.r * 2);
    p.r += 2;
  });
  pulses = pulses.filter(p => p.r < height);
  pop();
}

function drawCrosshair() {
  push();
  stroke(themeColor);
  line(mouseX - 10, mouseY, mouseX + 10, mouseY);
  line(mouseX, mouseY - 10, mouseX, mouseY + 10);
  pop();
}

function mousePressed() {
  themeColor = themeColor === '#00ffee' ? '#ff0077' : '#00ffee';
  pulses = [];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
