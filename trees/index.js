currElem = null
document.body.addEventListener('click', function(e){
	if(currElem) borderElement(currElem, "")
	currElem = e.target
	borderElement(currElem, "1px solid red")
})
function borderElement(elem, border){
	elem.style.border = border
}

// function highlightElement(elem, color){
// 	elem.style.backgroundColor = color
// }