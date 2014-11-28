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
		var ndList = document.body.childNodes;
		var adArray = [];
		for (var i = 0; i < ndList.length; i++)
		{
			if (!ndList[i].className) continue;
			if (ndList[i].className == "ad_root")
			{
				var adList = ndList[i].childNodes;
				for (var j=0; j<adList.length; j++)
				{
					if (!adList[j].className) continue;
					if (adList[j].className != "row") continue;
					
					adList[j].style.display = 'none';
					adArray.push(adList[j]);
				}
			}
		}
		
		var nIndex = adArray.length*Math.random() | 0;
		adArray[nIndex].style.display = 'block';
  }
}

if (window.addEventListener) {
	window.addEventListener('load', _3s3sObjectAD.onLoad, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', _3s3sObjectAD.onLoad );
}
