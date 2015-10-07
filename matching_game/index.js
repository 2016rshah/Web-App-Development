$(document).ready(function() {
	var teal = "#16a085"
	var lightBlue = "#206592"
	var darkBlue = "#3a5c7e"
	var lightGreen = "#2ecc71"
	var darkGreen = "#27ae60"

	var flagColors = ["#E0162B","#0052A5"]
	var redOrBlue = 0

	var abbrToState = {"al":"alabama","ak":"alaska","az":"arizona","ar":"arkansas","ca":"california","co":"colorado","ct":"connecticut","de":"delaware","fl":"florida","ga":"georgia","hi":"hawaii","id":"idaho","il":"illinois","in":"indiana","ia":"iowa","ks":"kansas","ky":"kentucky","la":"louisiana","me":"maine","md":"maryland","ma":"massachusetts","mi":"michigan","mn":"minnesota","ms":"mississippi","mo":"missouri","mt":"montana","ne":"nebraska","nv":"nevada","nh":"new hampshire","nj":"new jersey","nm":"new mexico","ny":"new york","nc":"north carolina","nd":"north dakota","oh":"ohio","ok":"oklahoma","or":"oregon","pa":"pennsylvania","ri":"rhode island","sc":"south carolina","sd":"south dakota","tn":"tennessee","tx":"texas","ut":"utah","vt":"vermont","va":"virginia","wa":"washington","wv":"west virginia","wi":"wisconsin","wy":"wyoming"}
	found_states = []
	var status = document.getElementById("status")
	$('#map').usmap({
		stateHoverAnimation: 300,
		showLabels:false,
		stateStyles: {fill: '#fff'},
		stateHoverStyles : {fill: lightGreen},
		click: function(event, data) {
			var name = data.name.toLowerCase()
			var guess = prompt("What is the name of the highlighted state?", "name or abbreviation").toLowerCase()
			if(guess == name || guess == abbrToState[name]){
				if(found_states.indexOf(abbrToState[name]) > -1){
					status.style.backgroundColor = "yellow"
					status.innerText="You've already found that state"
				}
				else{
					addState(abbrToState[name], name)
				}
			}
			else{
				status.innerText = "That is incorrect"
				status.style.backgroundColor = "red"
			}
		}
	});
	String.prototype.capitalizeFirstLetter = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}
	function addState(name, abbr){
		name = name.capitalizeFirstLetter()
		found_states.push(name)
		status.style.backgroundColor = lightGreen
		status.innerText = "Nice!"
		var f = document.getElementById("found")
		if(f.innerText == ""){
			f.innerText = name
		}
		else{
			f.innerText = f.innerText + ", " + name 
		}

		$('#'+abbr.toUpperCase()).css('fill', darkGreen)

		if(found_states.length == 50){
			gameEnd()
		}
	}
	function gameEnd(){
		status.innerText = "You win!"
		var intervalID = window.setInterval(changeAll, 500);
	}
	function changeAll(color){
		var ks = Object.keys(abbrToState)
		var r = Math.floor(Math.random() * 2)
		for(var i = 0; i< ks.length; i++){
			$("#"+ks[i].toUpperCase()).css('fill', flagColors[redOrBlue])
		}
		
		redOrBlue == 0 ? redOrBlue = 1 : redOrBlue = 0 //ternary operator!
	}


	$("#promptInput").focus()
});

