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
		
		var strLocation = document.referrer;
	/*	var nIndex = 1; //adArray.length*Math.random() | 0;
		for (var i = 0; i<_3s3sObjectAD.aWhiteADList.length; i++)
		{
			if (strLocation.indexOf(_3s3sObjectAD.aWhiteADList[i]) != -1)
			{
				nIndex = 0;
				
			/*	adArray[nIndex].innerHTML = 
				'<div class="cell">'+
					'<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'+
					'<!-- ads2_2 -->'+
					'<ins class="adsbygoogle"'+
					     'style="display:inline-block;width:468px;height:60px"'+
					     'data-ad-client="ca-pub-9472318620093072"'+
					     'data-ad-slot="7306186144"></ins>'+
					'<script>'+
					'(adsbygoogle = window.adsbygoogle || []).push({});'+
					'</script>'+
				'</div>';*/
	/*			break;
			}
		}*/
		var nIndex = 0;

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
