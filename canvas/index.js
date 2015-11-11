var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var dots = []

//http://stackoverflow.com/a/5932203/3861396
function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var coords = {x:0, y:0}
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    coords.x = event.pageX - totalOffsetX;
    coords.y = event.pageY - totalOffsetY;

    return {x:coords.x, y:coords.y}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

document.getElementById("clear").onclick = clearC

function clearC(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawDots(arr){
    for(var i = 0; i<arr.length; i++){
        ctx.fillStyle = arr[i].c
        ctx.beginPath();
        ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0,2*Math.PI)
        ctx.fill()
    }
}

function drawTwoPointRect(l1, l2){
    var ix = l1.x
    var iy = l1.y
    var dx = l2.x - l1.x
    var dy = l2.y - l1.y
    ctx.rect(ix, iy, dx, dy);
    ctx.stroke();
}

function convertDots(startLoc, finalLoc){
    var xi = startLoc.x
    var xf = finalLoc.x
    var yi = startLoc.y
    var yf = finalLoc.y

    for(var i = 0; i<dots.length; i++){
        var xt = dots[i].x
        var yt = dots[i].y

        if((xt > xi && xt < xf) || (xt < xi && xt > xf)){ //xs pass
            if((yt > yi && yt < yf) || (yt < yi && yt > yf)){ //ys pass
                dots[i].c = "red"
            }
        }
    }
}

function resetDots(){
    for(var i = 0; i<dots.length; i++){
        dots[i].c = "blue"
    }
}

var startLoc = {}
var currLoc = {}
var finalLoc = {}

var drawing = false;

c.onmousedown = function(e){
    var coords = canvas.relMouseCoords(e);
    startLoc = {x:coords.x, y:coords.y}

    drawing = true;
}
c.onmousemove = function(e){
    if(drawing){
        clearC()

        var coords = canvas.relMouseCoords(e);
        currLoc = {x:coords.x, y:coords.y}
        drawTwoPointRect(startLoc, currLoc)
        
        drawDots(dots)
    }
}
c.onmouseup = function(e){

    drawing = false;

    var coords = canvas.relMouseCoords(e);

    finalLoc = {x:coords.x, y:coords.y}

    if(finalLoc.x == startLoc.x && finalLoc.y == startLoc.y){
        clearC()
        dots.push({x:coords.x, y:coords.y, r:20, c:"blue"})
        drawDots(dots)
    }
    else{

        clearC()

        console.log(e.ctrlKey, event.button == 2 )
        if(!e.ctrlKey){
            resetDots()
        }


        convertDots(startLoc, finalLoc)

        drawDots(dots)
    }
    startLoc = {}
    currLoc = {}
    finalLoc = {}
}

