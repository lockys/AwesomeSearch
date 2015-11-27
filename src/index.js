$(document).ready(function() {
  var f;
  var d;
  var haveParse = true;
  var onClick = false;
  var isAwesome = false;
  var options = {
    keys: ['name', 'description', 'cate'],
  };
  var $awesome = $('.awesome-block');
  var $searchResult = $('.search-result');
  var $innerDropDownMenu = $('.mui-dropdown__menu');
  var $dropDownMenu = $('.mui-dropdown');

  var getCateList = function(e, cate) {
    var list;
    cate = cate || 'null';
    d = [];
    isAwesome = cate === 'awesome' ? 1 : 0;

    $awesome.addClass('content-hidden');
    $dropDownMenu.removeClass('content-hidden');

    $.getJSON('https://raw.githubusercontent.com/lockys/awesome.json/master/output/' + cate + '.json', function(data) {
      list = data;
      haveParse = cate !== 'awesome' && true;
      var originalHTML;
      $awesome.html('');
      $searchResult.html('');

      if (cate !== 'awesome') {
        var repoURL = $(e.target).data('url');
        var originalName = $(e.target).data('name');
        originalHTML = '<a href="/awesome-search/"><- Back to Awesome</a><br/><a href="' + repoURL + '" target="_blank">-> Original Repo</a>';

        $('.cate').html(originalName);
        $awesome.append(originalHTML);
      }

      if (Object.keys(list).length === 0) {
        /**
        * Category has not been parsed yet.
        **/
        haveParse = false;
        $awesome.html('Retrieving repos...');

        $.get(getRawReadme(repoURL), function(content) {
          $awesome.html('');
          $awesome.append(originalHTML);
          $awesome.append(marked(content));
        });

        $awesome.css({'background-color': '#eee', padding: '50px', 'border-radius': '5px', '-moz-border-radius': '5px', '-o-border-radius': '5px', '-webkit-border-radius': '5px'});
        $awesome.removeClass('content-hidden');
        $dropDownMenu.addClass('content-hidden');
        return;
      }

      $innerDropDownMenu.html('');

      Object.keys(list).forEach(function(e) {
        var _cateID = e.replace(/\W/g, '').toLowerCase();
        d = d.concat(list[e]);
        var title = '<h2 id="' + _cateID + '">' + e + '</h2>';
        $innerDropDownMenu.append('<li><a href="#' + _cateID + '">' + e + '</a></li>');
        $awesome.append(title);

        list[e].forEach(function(e) {
          var id = e.name.replace(/\W/g, '').toLowerCase();
          var href = ' href="' + e.url + '" ';

          if (isAwesome) {
            href = '';
          }

          var description = e.description ? ' - ' + e.description : '';
          var link = '<a class="mui-btn mui-btn--small mui-btn--primary ' + id + '"' + href + 'target="_blank" data-url="' + e.url + '" data-name="' + e.name + '"><span class="mui--text-white" data-url="' + e.url + '" data-name="' + e.name + '">' +  e.name + '</span><span style="color: #7CF1F7" class="" data-url="' + e.url + '" data-name="' + e.name + '">' + description + '</span></a>';
          $awesome.append(link);
        });
      });

      f = new Fuse(d, options);

      $.getJSON('https://raw.githubusercontent.com/lockys/awesome.json/master/output/nameMap.json', function(data) {
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

        console.log(d);
        description = result[i].description ? ' - ' + result[i].description + '</br>' : '<br/>';
        if (haveParse) {
          $searchResult.append('<a class="' + id + ' search-repo-link"' + href + 'data-url="' + result[i].url + '" data-name="' + result[i].name + '" target="_blank">' +  result[i].name + '</a>' + description);
          (function(id) {
            $('.' + id).off('click', function(e) {
              getCateList(e, id);
            });
          })(id);
        } else {
          $searchResult.append('<span class="' + id + ' search-repo-link"' + href + 'data-url="' + result[i].url + '" data-name="' + result[i].name + '">' +  result[i].name + '</span>' + description);
          (function(id) {
            $('.' + id).on('click', function(e) {
              getCateList(e, id);
            });
          })(id);
        }

      }
    }

  });

  /**
  * @param repoURL
  * @return rawURL
  **/
  function getRawReadme(repoURL) {
    var maintainer = repoURL.split('/')[3];
    var repo = repoURL.split('/')[4];
    var rawURL = 'https://raw.githubusercontent.com/' + maintainer + '/' + repo + '/master/README.md';
    return rawURL;
  }

  $('.to-top-arrow').click(function() {
      $('html, body').animate({
        scrollTop: 0,
      }, 600);
      return false;
    });
});
