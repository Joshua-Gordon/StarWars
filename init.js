window.onload = init;
var canvas;
var ctx;
var g;
var gen;
var old;
var counter;
var stepping;
var autoStepOn;
function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    g = new grid(15);
    gen = 0;
    old = [];
    counter = document.getElementById("counter");
    counter.innerHTML = "Generation: " + gen.toString();
    autoStepOn = false;
    resizeCanvas(canvas);
    //testLine(ctx);
    var cellSize = 15;
    drawGrid(cellSize, ctx);
    //testGrid(ctx);
    g.flipCell(20, 20);
    g.flipCell(21, 20);
    g.draw(ctx);
    canvas.addEventListener("click", function (e) { return clickHandler(canvas, e); });
}
function testLine(ctx) {
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
}
function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function drawGrid(cellSize, ctx) {
    var x, y;
    ctx.strokeStyle = "#FFFFFF";
    for (x = 0; x < window.innerWidth; x += cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, window.innerHeight);
    }
    for (y = 0; y < window.innerHeight; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(window.innerWidth, y);
    }
    ctx.stroke();
}
function testGrid(ctx) {
    var g = new grid(15);
    g.flipCell(20, 20);
    g.flipCell(20, 21);
    stepAmount(50, g, ctx);
}
function step() {
    var nums = g.stepGrid();
    var newgrid = new grid(g.cellSize, nums);
    newgrid.draw(ctx);
    old[gen] = g;
    gen++;
    g = newgrid;
    counter.innerHTML = "Generation: " + gen.toString();
}
function goBack() {
    gen--;
    g = old[gen];
    g.draw(ctx);
    counter.innerHTML = "Generation: " + gen.toString();
}
function clearScreen() {
    console.log("Clearing");
    g = new grid(15);
    old = [];
    gen = 0;
    counter.innerHTML = "Generation: " + gen.toString();
    g.draw(ctx);
}
function clickHandler(can, event) {
    console.log("Clicked");
    var rect = can.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    g.flipCell(x / g.cellSize, y / g.cellSize);
    g.draw(ctx);
}
function beginStep() {
    if (!autoStepOn) {
        stepping = setInterval(step, 500);
        autoStepOn = true;
    }
}
function stopStep() {
    if (autoStepOn) {
        clearInterval(stepping);
        autoStepOn = false;
    }
}