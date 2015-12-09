var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var RADIUS = 20;

var dots = []
dots.push({x:-50, y:-50, r:RADIUS, c:"red"}) //fix mystery bug when dragging without drawing dot

var KEY_MAP = {37:"left", 38:"up", 39:"right", 40:"down"}

// var pastActions = [{type:"create", x: 10, y: 10}, {type:"move", dots:[], dx: 10, dy: 10}]
var pastActions = []

document.getElementById("clear").onclick = function(){
    clearC()
    dots = []
    history = []
}

document.getElementById("undo").onclick = function(){
    clearC()

    var lastAction = pastActions.pop()
    if(lastAction.type == "create"){
        console.log(dots)
        dots.pop()
        console.log(dots)
    }
    else if(lastAction.type == "move"){
        moveSpecific(lastAction.dots, -lastAction.dx, -lastAction.dy)
    }

    drawDots()
}

document.getElementById("replay").onclick = function(){
    clearC()
    dots = []
    for(var i = 0; i<pastActions.length; i++){
        if(pastActions[i].type == "create"){
            resetDots()
            dots.push({x:pastActions[i].x, y:pastActions[i].y, r:RADIUS, c:"red"})
        }
        else if(pastActions[i].type == "move"){
            moveSpecific(pastActions[i].dots, pastActions[i].dx, pastActions[i].dy)
        }
        drawDots()
        alert("move on?")
    }
}

function clearC(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawDots(){
    for(var i = 0; i<dots.length; i++){
        if(dots[i].c == "blue"){
            ctx.fillStyle = "#3d97ca"
        }
        else{
            ctx.fillStyle = "#c20030"
        }
        // ctx.fillStyle = dots[i].c
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
    var m = 1;
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

function moveSelected(dx, dy){

    for(var i = 0; i<dots.length; i++){
        if(dots[i].c == "red"){
            dots[i].x += dx
            dots[i].y += dy
        }
    }
}

function moveSpecific(arr, dx, dy){
    for(var i = 0; i<arr.length; i++){
        if(arr[i].c == "red"){
            arr[i].x += dx
            arr[i].y += dy
        }
    }

}

function findSelectedDot(loc){
    for(var i = 0; i<dots.length; i++){
        if(loc.x > dots[i].x - RADIUS && loc.x < dots[i].x + RADIUS){ //within x threshold
            if(loc.y > dots[i].y - RADIUS && loc.y < dots[i].y + RADIUS){ //within y threshold
                // if(ctrlPressed){
                //     resetDots()
                // }
                // console.log(ctrlPressed)
                if(!ctrlPressed && dots[i].c == "blue"){
                    resetDots()
                } //these two if statements don't work together


                if(dots[i].c == "blue"){
                    originallyBlue = true
                }
                else{
                    originallyBlue = false
                }

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

var originallyBlue = true


//toggle ability with control click

c.onmousedown = function(e){
    var coords = canvas.relMouseCoords(e);
    startLoc = {x:coords.x, y:coords.y}

    
    drawing = true;

    if(e.metaKey || e.ctrlKey){
        ctrlPressed = true;
    }

    selectedDot = findSelectedDot(startLoc)

    

}
c.onmousemove = function(e){

    clearC()
    var coords = canvas.relMouseCoords(e);

    var dist = Math.pow(startLoc.x - currLoc.x, 2) + Math.pow(startLoc.y - currLoc.y, 2)
    maxDist = (dist>maxDist) ? dist : maxDist

    if(selectedDot){ //dragging a dot

        if(currLoc.x && currLoc.y){
            var dx = coords.x - currLoc.x
            var dy = coords.y - currLoc.y
            moveSelected(dx, dy)
            
            
        }

        currLoc = {x:coords.x, y:coords.y}
    }
    else if(drawing){ //selecting dots\

        currLoc = {x:coords.x, y:coords.y}

        drawTwoPointRect(startLoc, currLoc)

        
    }

    drawDots()
}
c.onmouseup = function(e){
    var coords = canvas.relMouseCoords(e);
    finalLoc = {x:coords.x, y:coords.y}
    
    if(selectedDot){
        clearC()

        if(maxDist < 75){
            if(ctrlPressed){
                selectedDot.c = (originallyBlue) ? "red" : "blue"
            }
        }

        var selected = []
        for(var i = 0; i<dots.length; i++){
            if(dots[i].c == "red"){ selected.push(dots[i]) }
        }
        var dx = finalLoc.x - startLoc.x
        var dy = finalLoc.y - startLoc.y
        pastActions.push({"type":"move", "dots":selected, "dx": dx, "dy": dy})
        console.log(pastActions)

        drawDots()
    }
    else{
        if(maxDist < 75){ //just clicked
            clearC()

            if(!ctrlPressed){
                resetDots()
            }

            dots.push({x:coords.x, y:coords.y, r:RADIUS, c:"red"}) 

            pastActions.push({type:"create", x: coords.x, y: coords.y})
            console.log(pastActions)

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
    originallyBlue = true;
}
document.onkeydown = function(e){
    if(e.keyCode == 27){ //escape
        clearC()
        resetDots()
        drawDots()
    }
    else if(KEY_MAP[e.keyCode]){
        clearC()
        // moveDots(KEY_MAP[e.keyCode])

        var dx = 0
        var dy = 0
        direction = KEY_MAP[e.keyCode]
        if(direction == "left")
            dx = -1
        else if(direction == "right")
            dx = 1
        else if(direction == "up")
            dy = -1
        else if(direction == "down")
            dy = 1

        moveSelected(dx, dy)

        var selected = []
        for(var i = 0; i<dots.length; i++){
            if(dots[i].c == "red"){ selected.push(dots[i]) }
        }
        pastActions.push({"type":"move", "dots":selected, "dx": dx, "dy": dy})
        console.log(pastActions)

        drawDots()
    }
    else if(e.keyCode == 189){ //minus pressed
        if(e.altKey){
            RADIUS--;
        }
        else{
            clearC()
            for(var i = 0; i<dots.length; i++){
                dots[i].r--;
            }
            drawDots()
        }
    }
    else if(e.keyCode == 107 || (e.keyCode == 187 && e.shiftKey)){ //plus pressed
        if(e.altKey){
            RADIUS++;
        }
        else{
            clearC()
            for(var i = 0; i<dots.length; i++){
                dots[i].r++;
            }
            drawDots()
        }
    }
    console.log(e);
}

// function undo(){
//     if(type is create)
//         delete that index from the dots array
//     if type is move
//         move to negative dx and negative dy

// }