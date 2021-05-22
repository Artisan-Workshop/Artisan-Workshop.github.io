let touchStartX = null, touchOffsetX = null

window.addEventListener('touchstart', function(event) {
	touchStartX = event.touches[0].clientX;
})

window.addEventListener('touchend', function(event) {
	if(event.touches.length == 0){
		touchOffsetX = event.changedTouches[event.changedTouches.length - 1].clientX - touchStartX;
		if(Math.abs(touchOffsetX) >= window.innerWidth/3){
			if(touchOffsetX > 0)
				document.getElementsByTagName("nav")[0].setAttribute("class", "active")
			else
				document.getElementsByTagName("nav")[0].removeAttribute("class");
		}
	}
})

function includeHTML() {
	var z, file, xhttp;
	z = document.getElementsByTagName("*");
	for (var i = 0; i < z.length; i++) {
		file = z[i].getAttribute("htmlsrc");
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) z[i].innerHTML += this.responseText;
					else z[i].innerHTML = "Include \""+ file + "\" Failed: " + this.status;
					z[i].removeAttribute("htmlsrc");
					includeHTML();
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}
}

window.onload = function(){
	includeHTML();
	document.body.removeAttribute("class");
}