var _3s3sObjectAD = 
{
	sendRequest: function(url,callback,postData) {
		var req = _3s3sObject.createXMLHTTPObject();
		if (!req) return;
		var method = (postData) ? "POST" : "GET";
		req.open(method,url,true);
		req.setRequestHeader('User-Agent','XMLHTTP/1.0');
		if (postData)
			req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		req.onreadystatechange = function ()
		{
			if (req.readyState != 4) return;
			if (req.status != 200 && req.status != 304)
			{
				// alert('HTTP error ' + req.status);
				return;
			}
			callback(req);
		}
		if (req.readyState == 4) return;
		req.send(postData);
	},
	
	XMLHttpFactories: [
		function () {return new XMLHttpRequest()},
		function () {return new ActiveXObject("Msxml2.XMLHTTP")},
		function () {return new ActiveXObject("Msxml3.XMLHTTP")},
		function () {return new ActiveXObject("Microsoft.XMLHTTP")}
	],
	
	createXMLHTTPObject: function() {
		var xmlhttp = false;
		for (var i=0;i<_3s3sObject.XMLHttpFactories.length;i++) {
			try {
				xmlhttp = _3s3sObject.XMLHttpFactories[i]();
			}
			catch (e) {
				continue;
			}
			break;
		}
		return xmlhttp;
	},
	
	onLoad: function()
	{
		var places = document.body.getElementsByClassName("aa_container size468x60");
		if ((!places) || (!places.length))
			return;
		
		var placeFirst = places[0];
		var adArray = placeFirst.getElementsByClassName("row");

		if (adArray.length == 0)
		{
			console.log("onLoad: ad slots not found!");
			return;
		}
		if (window.top === window.self)
		{
			for (var i=0; i<adArray.length; i++)
				adArray[i].style.display = 'block';

			placeFirst.parentNode.style.display = 'block';
			return;
		}
			
		var nIndex = adArray.length*Math.random() | 0;
		
		/*if (top.location.indexOf("grani.ru.3s3s.org") != -1)
		{
			nIndex = 0;
			placeFirst.getElementsByClassName("aa_panel")[0].style.display = 'none';
		}
		else
		{
			if (nIndex == 0) 
				nIndex = 1;
		}*/

		adArray[nIndex].style.display = 'block';
		
		placeFirst.parentNode.style.display = 'block';
		
	}
}

if (window.addEventListener) {
	window.addEventListener('load', _3s3sObjectAD.onLoad, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', _3s3sObjectAD.onLoad );
}
