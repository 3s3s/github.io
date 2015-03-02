var _3s3sObjectAD = 
{
	aWhiteADList: [
		"ameblo.jp",
		"kasparov.ru",
		"grani.ru",
		"3s3s.org",
		"lostfilm.tv",
		"topix.com",
		"directadvert.ru",
		"censor.net.ua",
		"vesti-ukr.com",
		"navalny.com",
		"ficbook.net",
		"ej.ru",
		"vk.com",
		"ok.ru",
		"800notes.com"
		],
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
	
	showOneBaner: function()
	{
		var places = document.body.getElementsByClassName("aa_container size468x60");
		if ((!places) || (!places.length))
			return;

		var placeFirst = places[0];//[places.length*Math.random() | 0];
		var adArray = placeFirst.getElementsByClassName("row");

		if (adArray.length == 0)
		{
			console.log("onLoad: ad slots not found!");
			return;
		}
		
		var nIndex = 1; //adArray.length*Math.random() | 0;
		for (var i = 0; i<_3s3sObjectAD.aWhiteADList.length; i++)
		{
			if (window.top.location.href.indexOf(_3s3sObjectAD.aWhiteADList[i]) != -1)
			{
				nIndex = 0;
				break;
			}
		}

		adArray[nIndex].style.display = 'block';
		
		placeFirst.parentNode.style.display = 'block';
	},
	
	onLoadJQuery: function()
	{
		$(".ad_root").show();
		$(".row").show();
		
		$("#main_content").load("http://adcontent.3s3s.org #mainDiv");
		$(".content").show();
	},
	
	onLoad: function()
	{
		if (window.top !== window.self)
		{
			_3s3sObjectAD.showOneBaner();
			return;
		}
			
		if(!window.jQuery)
		{
		   var script = document.createElement('script');
		   script.type = "text/javascript";
		   script.src = "http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
		   
		   // Attach handlers for all browsers
		   script.onload = script.onreadystatechange = function() {
				if ((!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
					// callback function provided as param
					_3s3sObjectAD.onLoadJQuery();
					script.onload = script.onreadystatechange = null;
				}
		   };
		   
		   document.getElementsByTagName('head')[0].appendChild(script);
		}			
	}
}

if (window.addEventListener) {
	window.addEventListener('load', _3s3sObjectAD.onLoad, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', _3s3sObjectAD.onLoad );
}
