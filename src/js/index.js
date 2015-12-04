$(document).ready(function() {
  var f;
  var d;
  var haveParse = true; // the repos has been parsed or not ?
  var isAwesome = false; // is it sindre/awesome repo ?
  var options = {
    keys: ['name'],
  };
  var $awesome = $('.awesome-block');
  var $searchResult = $('.search-result');
  var $innerDropDownMenu = $('.mui-dropdown__menu');
  var $dropDownMenu = $('.mui-dropdown');

  /**
  * Retrieve the readme file of an awesome repo from github and store the json for searching.
  * @param e It's an object containing repo name and url.
  * @param cate The repo name we want to get.
  * @return null
  **/
  var getCateList = function(e, cate) {
    var repoName = 'awesome';
    d = [];
    isAwesome = cate === 'awesome' ? 1 : 0;
    haveParse = !isAwesome;
    jsonURL = isAwesome ? 'https://raw.githubusercontent.com/lockys/awesome.json/master/awesome/awesome.json' : 'https://raw.githubusercontent.com/lockys/awesome.json/master/output/' + cate + '.json';

    $dropDownMenu.removeClass('content-hidden');
    $searchResult.addClass('content-hidden');

    $awesome.html('');
    $searchResult.html('');
    $innerDropDownMenu.html('');
    $('.alert').html('');
    $('.awesome-input').val('');

    /**
    * Get readme of awesome repo
    **/
    if (!isAwesome) {
      var repoURL = e.url;
      var originRepoHTML = '<a href="' + repoURL + '" target="_blank">Go To Original Repo</a><br/><br/>';
      repoName = e.name;

      // Update the title
      $('.cate').html(repoName);
      $awesome.html('Retrieving repo...');

      getReadme(repoURL, function(content) {
        $awesome.html('').append(originRepoHTML).append(content);
        var anchor = $('h6 a, h5 a, h4 a, h3 a, h2 a, h1 a');
        var maintainer = repoURL.split('/')[3];
        var repo = repoURL.split('/')[4];
        var githubRawURL = 'https://raw.githubusercontent.com/' + maintainer + '/' + repo + '/master/';
        var tagLevel;
        var categoryStyle = 'style=';

        /**
        * Dealing with some repos use relative image path.
        **/
        var imgArr = $('img');

        for (var i = 0, len = imgArr.length; i < len; ++i) {
          var relativeSrc = $(imgArr[i]).attr('src');
          if (!isURL(relativeSrc)) {
            $(imgArr[i]).attr('src', githubRawURL + relativeSrc);
          }
        }

        /**
        * Build Category List.
        **/
        for (var i = 0, len = anchor.length; i < len; ++i) {
          anchor[i].id = anchor[i].id.replace('user-content-', '');
          categoryStyle = 'style=';

          if (anchor[i].id) {
            tagLevel = $(anchor[i]).parent()[0].nodeName;
            if (tagLevel === 'H1') {
              categoryStyle += '"font-size: 18px;"';
            } else if (tagLevel === 'H2') {
              categoryStyle += '"font-size: 16px; color:#3C3C3C;"';
            } else if (tagLevel === 'H3') {
              categoryStyle += '"font-size: 14px; color:#7B7B7B;"';
            } else if (tagLevel === 'H4') {
              categoryStyle += '"font-size: 12px; color:#ADADAD;"';
            } else if (tagLevel === 'H5') {
              categoryStyle += '"font-size: 12px; color:#D9006C;"';
            } else if (tagLevel === 'H6') {
              categoryStyle += '"font-size: 12px; color:#EA0000;"';
            }

            $innerDropDownMenu.append('<li><a ' + categoryStyle + ' href="#' + anchor[i].id + '">' + $(anchor[i]).parent('h6, h5, h4, h3, h2, h1').text() + '</a></li>');
          }
        }
      });

      $awesome.addClass('awesome-background');

    }else {
      /**
      * show awesome repo
      **/
      $awesome.html('Please wait a moment, it won\'t take long.');

      $('.search-holder').html('Search the awesome world.');

      // Update the title
      $('.cate').html(repoName);

      $awesome.removeClass('awesome-background');

    }

    /**
    * Get json format of awesome for searching.
    **/
    $.getJSON(jsonURL, function(data) {
      var list = data;

      if (!isAwesome) {
        /**
        * Category has not been parsed yet.
        **/
        if (Object.keys(list).length === 0) {
          haveParse = false;
          $('.alert').html('<span style="color: red;">This repo has not been parsed yet, so what you search is awesome repo</span><br/>');
          return;
        }

        /**
        * Fill in to data for searching
        **/
        list.forEach(function(e) {
          d = d.concat(e);
        });
      }else {
        $awesome.html('');
        Object.keys(list).forEach(function(e) {
          var _cateID = e.replace(/\W/g, '').toLowerCase();
          var title = '<h2 id="' + _cateID + '">' + e + '</h2>';
          d = d.concat(list[e]);

          $innerDropDownMenu.append('<li><a href="#' + _cateID + '">' + e + '</a></li>');
          $awesome.append(title);

          list[e].forEach(function(e) {
            var id = e.name.replace(/\W/g, '').toLowerCase();
            var link = '';
            var description = e.description ? ' - ' + e.description : '';
            if (e.url.split('/').indexOf('github.com') > -1) {
              link = '<a class="mui-btn mui-btn--small mui-btn--primary ' + id + '" href="#repos/' + id + '" data-url="' + e.url + '" data-name="' + e.name + '"><span class="mui--text-white" data-url="' + e.url + '" data-name="' + e.name + '">' +  e.name + '</span></a>';
            } else {
              link = '<a class="mui-btn mui-btn--small mui-btn--primary ' + id + '" href="' + e.url + '" data-name="' + e.name + '" target="_blank"><span class="mui--text-white" data-url="' + e.url + '" data-name="' + e.name + '">' +  e.name + '</span></a>';
            }

            $awesome.append(link);
          });
        });
      }

      f = new Fuse(d, options);
    });
  };

  $('.awesome-input').on('input', function(e) {

    var query = $(this).val();
    var LENGTH_LIMIT = 20;

    $searchResult.removeClass('content-hidden');
    $searchResult.html('');

    if (!query) {
      $searchResult.addClass('content-hidden');
    }

    var result = f.search(query);
    var link = '';
    var description = '';

    if (!result.length) {
      $searchResult.html('No result :(');
    }

    for (var i = 0, len = LENGTH_LIMIT; i < len; ++i) {
      if (result[i]) {
        var id = result[i].name.replace(/\W/g, '').toLowerCase();
        var href = ' href="' + result[i].url + '" ';

        if (isAwesome) {
          href = '';
        }

        // console.log(d);
        description = result[i].description ? ' - ' + result[i].description + '</br>' : '<br/>';

        if (haveParse) {
          // if parsed(and it is not the top awesome repo), show the searching result about the current repo.
          $searchResult.append('<a class="' + id + ' search-repo-link"' + href + 'data-url="' + result[i].url + '" data-name="' + result[i].name + '" target="_blank">' +  result[i].name + '</a>' + description);
        } else {
          // if not parsed or it is the top awesome repo, show the searching result about the top awesome repo.
          if (result[i].url.split('/').indexOf('github.com') > -1) {
            $searchResult.append('<a class="' + id + ' search-repo-link" data-url="' + result[i].url + '" data-name="' + result[i].name + '" href="#/repos/' + id + '">' +  result[i].name + '</a>' + description);
          } else {
            $searchResult.append('<a class="' + id + ' search-repo-link" data-url="' + result[i].url + '" data-name="' + result[i].name + '" href="' + result[i].url + '" target="_blank">' +  result[i].name + '</a>' + description);
          }
        }

      }
    }

  });

  /**
  * @param repoURL
  * @param cb to dealing with html of readme.
  **/
  function getReadme(repoURL, cb) {
    var maintainer = repoURL.split('/')[3];
    var repo = repoURL.split('/')[4];
    var apiURL = 'https://api.github.com/repos/' + maintainer + '/' + repo + '/readme';

    $.ajax({
      url: apiURL,
      headers: {
        accept: 'application/vnd.github.v3.html',
      },
      success: cb,
    });
  }

  $('body').click(function(event) {
    if ($(event.target).is('.back-button')) {
      event.preventDefault();
      window.location.hash = '/';
      getCateList(null, 'awesome');
    }

  });

  $('.to-top-arrow').click(function() {
    $('html, body').animate({
      scrollTop: 0,
    }, 600);
    return false;
  });

  var AwesomeRouter = Backbone.Router.extend({
    routes: {
      'repos/:cate': 'getRepos',
    },
  });

  var awesomeRouter = new AwesomeRouter();

  awesomeRouter.on('route:getRepos', function(cate) {
    var repoInfo = {};
    var urlMap = 'https://raw.githubusercontent.com/lockys/awesome.json/master/name-map/awesome.json';

    $.getJSON(urlMap, getAwesome);

    function getAwesome(d) {
      var k = Object.keys(d);

      for (var i = 0, len = k.length; i < len; ++i) {

        if (k[i].replace(/\W/g, '').toLowerCase() === cate) {
          repoInfo = {
                name: k[i],
                url: d[k[i]],
              };
          $('.search-holder').html('Search the ' + repoInfo.name);
          getCateList(repoInfo, cate);
          break;
        }

      }
    }

  });

  /**
  * To check if a string is a url
  * @return true or false
  **/
  function isURL(str) {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return pattern.test(str);
  }

  Backbone.history.start();
  getCateList(null, 'awesome');
});
