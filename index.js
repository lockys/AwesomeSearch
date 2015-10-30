var nodejs = require('./data/awesome-nodejs.json');
var awesome = require('./data/awesome.json');
var options = {
  keys: ['name', 'description', 'cate'],
};
var d = [];
var $awesome = $('.awesome');
var $searchResult = $('.search-result');

Object.keys(nodejs).forEach(function(e) {
  d = d.concat(nodejs[e]);
});

Object.keys(awesome).forEach(function(e) {
  d = d.concat(awesome[e]);
  var title = '<h2>' + e + '</h2>';
  $awesome.append(title);
  awesome[e].forEach(function(e) {
    var link = '<a class="mui-btn mui-btn--small mui-btn--primary" href="' + e.url + '" target="_blank">' +  e.name + '</a>';
    $awesome.append(link);
  });
});

var f = new Fuse(d, options);

$('.awesome-input').on('input', function(e) {

  var query = $(this).val();
  $awesome.addClass('content-hidden');
  $searchResult.html('');

  if (!query) {
    $awesome.removeClass('content-hidden');
  }

  var result = f.search(query);
  var link = '';
  var description = '';
  for (var i = 0, len = result.length; i < len; ++i) {
    if (result[i]) {
      description = result[i].description ? ' - ' + result[i].description + '</br>' : '<br/>';
      link += '<a class="" href="' + result[i].url + '" target="_blank">' +  result[i].name + '</a>' + description;
    }
  }

  $searchResult.html(link);
});
