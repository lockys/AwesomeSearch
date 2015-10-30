var list = {};
var awesome = require('./data/awesome.json');
var options = {
  keys: ['name', 'description', 'cate'],
};
var f;
var d = [];
var $awesome = $('.awesome');
var $searchResult = $('.search-result');

getAllAwesome();

function getAllAwesome(cate) {
  $awesome.html('');
  Object.keys(awesome).forEach(function(e) {
    d = d.concat(awesome[e]);
    var title = '<h2>' + e + '</h2>';
    $awesome.append(title);
    awesome[e].forEach(function(e) {
      var id = e.name.replace(/\W/g, '').toLowerCase();
      var href = id === 'nodejs' ? '' : ' href="' + e.url + '" ';
      var link = '<a class="mui-btn mui-btn--small mui-btn--primary" id="' + id + '"' + href + 'target="_blank">' +  e.name + '</a>';
      $awesome.append(link);
    });
  });

  f = new Fuse(d, options);
}

$('#nodejs').on('click', function(e) {
  list.nodejs = require('./data/nodejs.json');
  d = [];
  $('.cate').html('nodejs');
  $awesome.html('');
  $awesome.append('<a href="/awesome-search/"><- Back to Awesome</a>');

  $('#returnAwesome').on('click', function() {
    getAllAwesome();
  });

  Object.keys(list.nodejs).forEach(function(e) {
    d = d.concat(list.nodejs[e]);
    var title = '<h2>' + e + '</h2>';
    $awesome.append(title);
    list.nodejs[e].forEach(function(e) {
      var id = e.name.replace(/\W/g, '').toLowerCase();
      var href = id === 'nodejs' ? '' : ' href="' + e.url + '" ';
      var link = '<a class="mui-btn mui-btn--small mui-btn--primary" id="' + id + '"' + href + 'target="_blank"><span class="mui--text-black-87">' +  e.name + '</span><span class="mui--text-white"> - ' + e.description + '</span></a>';
      $awesome.append(link);
    });
  });

  f = new Fuse(d, options);
});

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
