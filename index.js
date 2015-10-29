var nodejs = require('./data/awesome-nodejs.json');
var awesome = require('./data/awesome.json');
var options = {
  keys: ['name', 'description'],
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

$('.awesome-input').on('input', function() {
  var query = $(this).val();
  $awesome.addClass('content-hidden');
  $searchResult.html('');

  if (!query) {
    $awesome.removeClass('content-hidden');
  }

  var result = f.search(query);
  result.forEach(function(e) {
    var description = e.description ? ' - ' + e.description + '</br>' : '<br/>';
    var link = '<a class="" href="' + e.url + '" target="_blank">' +  e.name + '</a>' + description;
    $searchResult.append(link);
  });
});
