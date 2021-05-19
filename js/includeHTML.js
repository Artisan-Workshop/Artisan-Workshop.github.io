function includeHTML() {
	var z, elmnt, file, xhttp;
	z = document.getElementsByTagName("*");
	for (var i = 0; i < z.length; i++) {
		elmnt = z[i];
		file = elmnt.getAttribute("htmlsrc");
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						elmnt.innerHTML = this.responseText;
					}
					else {
						elmnt.innerHTML = "Include \""+ file + "\" Failed: " + this.status;
					}
					elmnt.removeAttribute("htmlsrc");
					includeHTML();
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}
}