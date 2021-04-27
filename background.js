function listener(details) {
  if(details.url.match(/dood/g))
  {
    console.log(details.url);
  }
  else if(details.url.match(/googleapis/g))
  {
    console.log(details.url);
  }
  else
  {

  
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  filter.ondata = event => {
    let str = decoder.decode(event.data, {stream: true});
    var k = str.toString();
    //console.log(k);
    var doodexp = /https:\\\/\\\/d.*\"/g;
    var dudregex = new RegExp(doodexp);
    
    var f = details.url.match(/tle=.*?&/g)[0]; 
    console.log(f.slice(4,f.length-1).replace(/\+/g," "));
    if(k.match(dudregex)){
    console.log(k.match(dudregex)[0].replace(/\\|\"/g,""));
  }
    var expression = /https:\\.*?mp4/;
    var regex = new RegExp(expression);
    if(k.match(regex)){
      var f = k.match(regex)[0];
      var z = f.replace(/\\/g,"");
      var h  = new URL(z);
      console.log(h.href);
      window.open(h.href,"_blank");
    }
    filter.write(encoder.encode(str));
    filter.disconnect();
  }
}
  return {};
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {urls: ["https://vidnext.net/ajax.php?*","https://dood.to/e/*","https://storage.googleapis.com/*"]},
  ["blocking"]
);
