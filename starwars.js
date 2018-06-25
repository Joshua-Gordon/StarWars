var brush = 3;
var colors = ["#000000", "#0000FF", "#00A0FF", "#FFFFFF"];
var grid = /** @class */ (function () {
    /*
    * Star wars rules
    * A cell survives if 3,4, or 5 of it's neighbors are fully alive
    * A cell becomes alive if 2 of it's neighbors are
    * There are four states, alive, dying1, dying2, and dead
    */
    function grid(cellSize, cells) {
        this.numX = window.innerWidth / cellSize;
        this.numY = window.innerHeight / cellSize;
        if (cells) {
            this.cells = cells;
            this.cellSize = cellSize;
        }
        else {
            this.cells = [];
            for (var x = 0; x < this.numX; ++x) {
                this.cells[x] = [];
                for (var y = 0; y < this.numY; ++y) {
                    //console.log("Adding cell at location " + x + "," + y);
                    this.cells[x][y] = 0;
                }
            }
            this.cellSize = cellSize;
        }
    }
    grid.prototype.flipCell = function (x, y) {
        console.log("X: " + x);
        console.log("Y: " + y);
        this.cells[Math.floor(x)][Math.floor(y)] = brush;
    };
    grid.prototype.getNeighbors = function (x, y) {
        var sum = 0;
        for (var dx = -1; dx < 2; ++dx) {
            for (var dy = -1; dy < 2; ++dy) {
                try {
                    var cell = this.cells[x + dx][y + dy];
                    if (cell == 3 && (dx != 0 || dy != 0)) {
                        sum++;
                    }
                }
                catch (e) {
                }
            }
        }
        return sum;
    };
    grid.prototype.stepGrid = function () {
        var newCells = [];
        for (var x = 0; x < this.numX; ++x) {
            newCells[x] = [];
            for (var y = 0; y < this.numY; ++y) {
                var oldCell = this.cells[x][y];
                if (oldCell == 3 || oldCell == 0) {
                    var numNeighbors = this.getNeighbors(x, y);
                    if (numNeighbors > 2 && numNeighbors < 6) {
                        newCells[x][y] = oldCell;
                    }
                    else if (numNeighbors == 2 && oldCell == 0) {
                        //console.log("New cell!");
                        newCells[x][y] = 3;
                    }
                    else {
                        newCells[x][y] = oldCell > 0 ? oldCell - 1 : 0;
                    }
                }
                else {
                    newCells[x][y] = oldCell > 0 ? oldCell - 1 : 0;
                }
            }
        }
        return newCells;
    };
    grid.prototype.draw = function (ctx) {
        for (var x = 0; x < this.numX; ++x) {
            for (var y = 0; y < this.numY; ++y) {
                var cell = this.cells[x][y];
                ctx.fillStyle = colors[cell];
                ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    };
    return grid;
}());
function stepAmount(i, g, ctx) {
    var nums = g.stepGrid();
    var newgrid = new grid(g.cellSize, nums);
    newgrid.draw(ctx);
    if (i > 0) {
        stepAmount(i - 1, newgrid, ctx);
    }
}
function cycleBrush() {
    brush = (brush + 1) % 4;
    var b = document.getElementById("brush");
    b.style.backgroundColor = colors[brush];
    if (brush == 0) {
        b.style.color = "white";
    }
    else {
        b.style.color = "black";
    }
}
