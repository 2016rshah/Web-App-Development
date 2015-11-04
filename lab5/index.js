var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

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

	//clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);


	coords = canvas.relMouseCoords(e);
	canvasX = coords.x;
	canvasY = coords.y;
	console.log(canvasX, canvasY)


	ctx.strokeStyle = "#FF0000";
	ctx.beginPath();
	ctx.arc(e.pageX,e.pageY,40,0,2*Math.PI);
	ctx.stroke();


	ctx.strokeStyle = "#00FF00";
	ctx.beginPath();
	ctx.arc(canvasX,canvasY,40,0,2*Math.PI);
	ctx.stroke();
}


