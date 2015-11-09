var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var dots = []


//http://stackoverflow.com/a/5932203/3861396
function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

c.onclick = function(e) {


	coords = canvas.relMouseCoords(e);
	canvasX = coords.x;
	canvasY = coords.y;
	console.log(canvasX, canvasY)


	ctx.fillStyle = "blue";
	ctx.beginPath();
	ctx.arc(canvasX,canvasY,20,0,2*Math.PI);
	ctx.fill();
    dots.push({x:canvasX, y:canvasY, r:20, c:"blue"})
}
document.getElementById("clear").onclick = function(){

    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots = []
}

function drawDots(arr){
    for(var i = 0; i<arr.length; i++){
        ctx.fillStyle = arr[i].c
        ctx.beginPath();
        ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0,2*Math.PI)
        ctx.fill()
    }
}

