// Create a new canvas element
var canvas = document.createElement('canvas');
canvas.id = 'analog-clock-canvas';
canvas.width = 200;
canvas.height = 200;

// Get the context of the canvas
var ctx = canvas.getContext('2d');

// Draw the clock face
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = 'black';
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, 0, 2 * Math.PI);
ctx.stroke();

// Draw the clock hands
function drawClockHands() {
  // Calculate the current time
  var now = new Date();

  // Calculate the angle of the hour hand
  var hourAngle = (now.getHours() + now.getMinutes() / 60) * 360 / 12;

  // Calculate the angle of the minute hand
  var minuteAngle = (now.getMinutes() + now.getSeconds() / 60) * 360 / 60;

  // Calculate the angle of the second hand
  var secondAngle = now.getSeconds() * 360 / 60;

  // Draw the hour hand
  ctx.fillStyle = 'black';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(canvas.width / 2 + 50 * Math.cos(hourAngle * Math.PI / 180), canvas.height / 2 + 50 * Math.sin(hourAngle * Math.PI / 180));
  ctx.stroke();

  // Draw the minute hand
  ctx.fillStyle = 'black';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(canvas.width / 2 + 70 * Math.cos(minuteAngle * Math.PI / 180), canvas.height / 2 + 70 * Math.sin(minuteAngle * Math.PI / 180));
  ctx.stroke();

  // Draw the second hand
  ctx.fillStyle = 'red';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(canvas.width / 2 + 90 * Math.cos(secondAngle * Math.PI / 180), canvas.height / 2 + 90 * Math.sin(secondAngle * Math.PI / 180));
  ctx.stroke();
}

// Start the clock
function startClock() {
  // Draw the clock hands
  drawClockHands();

  // Update the clock hands every second
  setInterval(drawClockHands, 1000);
}

// Initialize the analog clock
startClock();
