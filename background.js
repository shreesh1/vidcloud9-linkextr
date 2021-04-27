function listener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  filter.ondata = event => {
    let str = decoder.decode(event.data, {stream: true});
    var k = str.toString();
    var expression = /https:\\.*?mp4/;
    var regex = new RegExp(expression);
    if(k.match(regex)){
    	var f = k.match(regex)[0];
    	var z = f.replace(/\\/g,"");
    	var h  = new URL(z);
    	console.log(h.href);
    }
    filter.write(encoder.encode(str));
    filter.disconnect();
  }

  return {};
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {urls: ["https://vidnext.net/ajax.php?*"]},
  ["blocking"]
);