function(head, req){
  var rows = [];
  // !json templates.itunes
  Mustache = require("vendor/mustache");
  var settings = require("vendor/podcastConfig");

  while(row = getRow()) {
    val = row.value;
    var view = {
      "title": val.title,
      "articleLink": val.articleLink,
      "description": val.description,
      "pubDateTime": val.pubDateTime,
      "url": val.url,
      "length": val._attachments["audio.mp3"].length,
      "contentType": val._attachments["audio.mp3"].content_type,
      "author": val.author,
      "explicit": val.explicit
    };
    rows.push(view);
  }
  
  settings["host"] = req.headers.Host;
  settings["domain"] = host.split(":")[0];
  settings["items"] = rows;
  
  var xml = Mustache.to_html(templates.atom, settings);
  provides("xml",function(){
    return xml;
  });
}