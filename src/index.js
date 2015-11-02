$(document).ready(function() {
  var f;
  var d;
  var onClick = false;
  var isAwesome = false;
  var options = {
    keys: ['name', 'description', 'cate'],
  };
  var $awesome = $('.awesome-block');
  var $searchResult = $('.search-result');

  var getCateList = function(e, cate) {
    cate = cate || 'null';
    var list;
    d = [];
    isAwesome = cate === 'awesome' ? 1 : 0;

    $awesome.addClass('content-hidden');
    $.getJSON('https://github.com/lockys/awesome.json/blob/master/output/' + cate + '.json', function(data) {
      list = data;
      $awesome.html('');
      $searchResult.html('');

      if (cate !== 'awesome') {
        var repoURL = $(e.target).data('url');
        var originalName = $(e.target).data('name');
        $('.cate').html(originalName);
        $awesome.append('<a href="/awesome-search/"><- Back to Awesome</a><br/><a href="' + repoURL + '" target="_blank">-> Original Repo</a>');
      }

      Object.keys(list).forEach(function(e) {
        d = d.concat(list[e]);
        var title = '<h2>' + e + '</h2>';
        $awesome.append(title);
        list[e].forEach(function(e) {
          var id = e.name.replace(/\W/g, '').toLowerCase();
          var href = ' href="' + e.url + '" ';

          if (isAwesome) {
            href = '';
          }

          var description = e.description ? ' - ' + e.description : '';
          var link = '<a class="mui-btn mui-btn--small mui-btn--primary ' + id + '"' + href + 'target="_blank" data-url="' + e.url + '" data-name="' + e.name + '"><span class="mui--text-white" data-url="' + e.url + '" data-name="' + e.name + '">' +  e.name + '</span><span class="mui--text-black-54" data-url="' + e.url + '" data-name="' + e.name + '">' + description + '</span></a>';
          $awesome.append(link);
        });
      });

      f = new Fuse(d, options);

      $.getJSON('https://raw.githubusercontent.com/lockys/awesome-search/gh-pages/data/nameMap.json', function(data) {
        var idArr = Object.keys(data);
        for (var i = 0, len = idArr.length; i < len; ++i) {
          var cate = data[idArr[i]];
          (function(cate) {
            $('.' + cate).on('click', function(e) {
              if (onClick) {
                return false;
              }

              onClick = true;
              getCateList(e, cate);
            });
          })(cate);
        }

        $awesome.removeClass('content-hidden');
      });

      onClick = false;
    });
  };

  getCateList(null, 'awesome');

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
        var id = result[i].name.replace(/\W/g, '').toLowerCase();
        var href = ' href="' + result[i].url + '" ';
        if (isAwesome) {
          href = '';
        }

        description = result[i].description ? ' - ' + result[i].description + '</br>' : '<br/>';
        $searchResult.append('<a class="' + id + '"' + href + 'target="_blank" data-url="' + result[i].url + '" data-name="' + result[i].name + '">' +  result[i].name + '</a>' + description);

        (function(id) {
          $('.' + id).on('click', function(e) {
            getCateList(e, id);
          });
        })(id);
      }
    }

  });
});
