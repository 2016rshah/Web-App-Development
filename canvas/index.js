var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var dots = []

document.getElementById("clear").onclick = deleteEverything

function deleteEverything(){
    dots = []
    clearC()
}

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
    var dx = l2.x - l1.x
    var dy = l2.y - l1.y
    ctx.rect(l1.x, l1.y, dx, dy);
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

var ctrlPressed = false;

var maxDist = 0

c.onmousedown = function(e){
    var coords = canvas.relMouseCoords(e);
    startLoc = {x:coords.x, y:coords.y}
    drawing = true;

    if(e.metaKey || e.ctrlKey){
        ctrlPressed = true;
    }

}
c.onmousemove = function(e){
    if(drawing){
        clearC()

        var coords = canvas.relMouseCoords(e);
        currLoc = {x:coords.x, y:coords.y}

        drawTwoPointRect(startLoc, currLoc)

        drawDots(dots)

        var dist = Math.pow(startLoc.x - currLoc.x, 2) + Math.pow(startLoc.y - currLoc.y, 2)
        maxDist = (dist>maxDist) ? dist : maxDist
        console.log(maxDist)
    }
}
c.onmouseup = function(e){
    var coords = canvas.relMouseCoords(e);
    finalLoc = {x:coords.x, y:coords.y}

    if(maxDist < 75){ //just clicked
        clearC()

        if(!ctrlPressed){
            resetDots()
        }

        dots.push({x:coords.x, y:coords.y, r:20, c:"red"}) 

        drawDots(dots)
    }
    else{ //dragged over
        clearC()

        //control key part of lab
        console.log(e.metaKey, e.ctrlKey)
        if(!ctrlPressed){
            resetDots()
        }

        convertDots(startLoc, finalLoc)
        drawDots(dots)
    }

    //reset everything
    ctrlPressed = false;
    drawing = false;
    startLoc = {}
    currLoc = {}
    finalLoc = {}
    maxDist = 0
}