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
	all_states = Object.keys(abbrToState)
	curr_state = all_states[0]


	var status = document.getElementById("status")
	$('#map').usmap({
		stateHoverAnimation: 300,
		showLabels:false,
		stateStyles: {fill: '#fff'},
		// stateHoverStyles : {fill: lightGreen}
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
	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex ;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}


	$("#promptInput").on("input", function(){
		var guess = $("#promptInput").val().toLowerCase()
		console.log(guess)
		if(guess == curr_state || guess == abbrToState[curr_state]){
			addState(abbrToState[curr_state], curr_state)
			all_states.shift()
			curr_state = all_states[0]
			$("#"+curr_state.toUpperCase()).css('fill', "blue")
			$("#promptInput").val("")
		}
	})


	$("#"+curr_state.toUpperCase()).css('fill', "blue")
});

