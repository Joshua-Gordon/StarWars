window.onload = init;

var canvas : HTMLCanvasElement;
var ctx : CanvasRenderingContext2D;
var g : grid;
var gen : number;
var old : grid[];
var counter : HTMLElement;
var stepping : number;
var autoStepOn : boolean;

function init() : void {
  canvas = <HTMLCanvasElement>document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  g = new grid(15);
  gen = 0;
  old = [];
  counter = document.getElementById("counter");
  counter.innerHTML="Generation: " + gen.toString();
  autoStepOn = false;
  resizeCanvas(canvas);
  //testLine(ctx);
  const cellSize = 15;
  drawGrid(cellSize,ctx);
  //testGrid(ctx);
  g.flipCell(20,20);
  g.flipCell(21,20);
  g.draw(ctx);

  canvas.addEventListener("click",(e) => clickHandler(canvas,e));
}

function testLine(ctx : CanvasRenderingContext2D) : void {
  ctx.moveTo(0,0);
  ctx.lineTo(200,100);
  ctx.stroke();
}

function resizeCanvas(canvas : HTMLCanvasElement) : void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawGrid(cellSize : number, ctx : CanvasRenderingContext2D) : void {
  var x : number, y : number;
  ctx.strokeStyle = "#FFFFFF";
  for(x = 0; x < window.innerWidth; x+=cellSize) {
    ctx.moveTo(x,0);
    ctx.lineTo(x,window.innerHeight);
  }
  for(y = 0; y < window.innerHeight; y+=cellSize) {
    ctx.moveTo(0,y);
    ctx.lineTo(window.innerWidth,y);
  }
  ctx.stroke();
}


function testGrid(ctx : CanvasRenderingContext2D) : void {
  var g = new grid(15);
  g.flipCell(20,20);
  g.flipCell(20,21);
  stepAmount(50,g,ctx);
}

function step() : void {
  var nums = g.stepGrid();
  var newgrid = new grid(g.cellSize,nums);
  newgrid.draw(ctx);
  old[gen] = g;
  gen++;
  g = newgrid;
  counter.innerHTML="Generation: " + gen.toString();
}

function goBack() : void {
  gen--;
  g = old[gen];
  g.draw(ctx);
  counter.innerHTML="Generation: " + gen.toString();
}

function clearScreen() : void {
  console.log("Clearing");
  g = new grid(15);
  old = [];
  gen = 0;
  counter.innerHTML="Generation: " + gen.toString();
  g.draw(ctx);
}

function clickHandler(can : HTMLCanvasElement, event : MouseEvent) : any {
  console.log("Clicked");
  var rect = can.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  g.flipCell(x/g.cellSize,y/g.cellSize);
  g.draw(ctx);
}

function beginStep() {
  if(!autoStepOn){
    stepping = setInterval(step,500);
    autoStepOn = true;
  }
}

function stopStep() {
  if(autoStepOn) {
    clearInterval(stepping);
    autoStepOn = false;
  }
}