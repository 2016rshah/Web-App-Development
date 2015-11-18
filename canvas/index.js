var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var RADIUS = 20;

var dots = []
dots.push({x:-50, y:-50, r:RADIUS, c:"red"}) //fix mystery bug when dragging without drawing dot

var KEY_MAP = {37:"left", 38:"up", 39:"right", 40:"down"}

document.getElementById("clear").onclick = clearC

function clearC(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots = []
}

function drawDots(){
    for(var i = 0; i<dots.length; i++){
        ctx.fillStyle = dots[i].c
        ctx.beginPath();
        ctx.arc(dots[i].x, dots[i].y, dots[i].r, 0,2*Math.PI)
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
function moveDots(direction){
    var m = 5; //magnitude of shift
    for(var i = 0; i<dots.length; i++){
        if(dots[i].c == "red"){
            if(direction == "left")
                dots[i].x -= m
            else if(direction == "right")
                dots[i].x += m
            else if(direction == "up")
                dots[i].y -= m
            else if(direction == "down")
                dots[i].y += m
        }
    }
}
function findSelectedDot(loc){
    for(var i = 0; i<dots.length; i++){
        if(loc.x > dots[i].x - RADIUS && loc.x < dots[i].x + RADIUS){ //within x threshold
            if(loc.y > dots[i].y - RADIUS && loc.y < dots[i].y + RADIUS){ //within y threshold
                resetDots()
                dots[i].c = "red"
                return dots[i]
            }
        }
    }
    return false
}

var startLoc = {}
var currLoc = {}
var finalLoc = {}
var selectedDot = false

var drawing = false;

var ctrlPressed = false;

var maxDist = 0

c.onmousedown = function(e){
    var coords = canvas.relMouseCoords(e);
    startLoc = {x:coords.x, y:coords.y}

    
    drawing = true;

    selectedDot = findSelectedDot(startLoc)

    if(e.metaKey || e.ctrlKey){
        ctrlPressed = true;
    }

}
c.onmousemove = function(e){
    if(selectedDot){
        clearC()
        var coords = canvas.relMouseCoords(e);
        currLoc = {x:coords.x, y:coords.y}
        selectedDot.x = currLoc.x
        selectedDot.y = currLoc.y
        drawDots()
    }
    else if(drawing){
        clearC()

        var coords = canvas.relMouseCoords(e);
        currLoc = {x:coords.x, y:coords.y}

        drawTwoPointRect(startLoc, currLoc)

        drawDots()

        var dist = Math.pow(startLoc.x - currLoc.x, 2) + Math.pow(startLoc.y - currLoc.y, 2)
        maxDist = (dist>maxDist) ? dist : maxDist
    }
}
c.onmouseup = function(e){
    var coords = canvas.relMouseCoords(e);
    finalLoc = {x:coords.x, y:coords.y}
    
    if(selectedDot){
        clearC()
        selectedDot.x = finalLoc.x
        selectedDot.y = finalLoc.y
        drawDots()
    }
    else{
        if(maxDist < 75){ //just clicked
            clearC()

            if(!ctrlPressed){
                resetDots()
            }

            dots.push({x:coords.x, y:coords.y, r:RADIUS, c:"red"}) 

            drawDots()
        }
        else{ //dragged over
            clearC()

            //control key part of lab
            if(!ctrlPressed){
                resetDots()
            }

            convertDots(startLoc, finalLoc)
            drawDots()
        }
    }



    //reset everything
    ctrlPressed = false;
    drawing = false;
    startLoc = {}
    currLoc = {}
    finalLoc = {}
    selectedDot = false
    maxDist = 0
}
document.onkeydown = function(e){
    if(e.keyCode == 27){ //escape
        clearC()
        resetDots()
        drawDots()
    }
    else if(KEY_MAP[e.keyCode]){
        clearC()
        moveDots(KEY_MAP[e.keyCode])
        drawDots()
    }
}