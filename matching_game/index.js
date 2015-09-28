var abbrToState = {"al":"alabama","ak":"alaska","az":"arizona","ar":"arkansas","ca":"california","co":"colorado","ct":"connecticut","de":"delaware","fl":"florida","ga":"georgia","hi":"hawaii","id":"idaho","il":"illinois","in":"indiana","ia":"iowa","ks":"kansas","ky":"kentucky","la":"louisiana","me":"maine","md":"maryland","ma":"massachusetts","mi":"michigan","mn":"minnesota","ms":"mississippi","mo":"missouri","mt":"montana","ne":"nebraska","nv":"nevada","nh":"new hampshire","nj":"new jersey","nm":"new mexico","ny":"new york","nc":"north carolina","nd":"north dakota","oh":"ohio","ok":"oklahoma","or":"oregon","pa":"pennsylvania","ri":"rhode island","sc":"south carolina","sd":"south dakota","tn":"tennessee","tx":"texas","ut":"utah","vt":"vermont","va":"virginia","wa":"washington","wv":"west virginia","wi":"wisconsin","wy":"wyoming"}
$(document).ready(function() {
	$('#map').usmap({
		stateHoverAnimation: 300,
		showLabels:false,
		stateStyles: {fill: '#fff'},
		stateHoverStyles : {fill: '#000'},
		click: function(event, data) {
			var name = data.name.toLowerCase()

			var guess = prompt("What is the name of the highlighted state?", "name or abbreviation").toLowerCase()
			if(guess == name || guess == abbrToState[name]){
				addState(abbrToState[name])
			}

			// $('#map').usmap({
			//   stateSpecificStyles: {
			//     'MD': {fill: 'yellow'},
			//     'VA': {fill: 'teal'}
			//   } 
			// });

		}
	});
});

function addState(name){
	alert(name)
}