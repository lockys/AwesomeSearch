$(document).ready(function() {
  var repoFinder;
  var awesomeFinder;
  var haveParse = true; // the repos has been parsed or not ?
  var isAwesome = false; // is it sindre/awesome repo ?
  var urlMap = 'https://raw.githubusercontent.com/lockys/awesome.json/master/name-map/awesome.json';
  var options = {
    keys: ['name'],
  };
  var $awesome = $('.readme-container');
  var $searchResult = $('.search-result');
  var $searchBlock = $('.search-input-section');
  var $innerDropDownMenu = $('.mui-dropdown__menu');
  var $dropDownMenu = $('.mui-dropdown');

  function processReadMe(content, repoURL, originRepoHTML) {
    $awesome.html('').append(content);
    $('#readme').prepend(originRepoHTML);
    var anchor = $('h6 a, h5 a, h4 a, h3 a, h2 a, h1 a');
    var anchorLink = $('#readme a[href^="#"]').not('.anchor');
    var maintainer = repoURL.split('/')[3];
    var repo = repoURL.split('/')[4];
    var githubRawURL = 'https://raw.githubusercontent.com/' + maintainer + '/' + repo + '/master/';
    var githubURL = 'https://github.com/' + maintainer + '/' + repo + '/blob/master';
    var tagLevel;
    var categoryStyle = 'style=';

    /**
    * Dealing with some repos use relative image path.
    **/
    var imgArr = $('img');
    var linksArr = $('#readme a[href^="/"]');

    // decorate the table
    $('#readme table').addClass('mui-table mui-table--bordered');

    for (var i = 0, len = linksArr.length; i < len; ++i) {
      var relativeSrc = $(linksArr[i]).attr('href');
      if (!isURL(relativeSrc)) {
        $(linksArr[i]).attr({href: githubURL + relativeSrc, target: '_blank'});
      }
    }

    for (var i = 0, len = imgArr.length; i < len; ++i) {
      var relativeSrc = $(imgArr[i]).attr('src');
      if (!isURL(relativeSrc)) {
        $(imgArr[i]).attr('src', githubRawURL + relativeSrc);
      }
    }

    /**
      insert data-anchor and class cate-anchor so that when the link is clicked, the page will be scroll the position of anchor.
    **/
    for (var i = 0, len = anchorLink.length; i < len; ++i) {
      var $anchorEle = $(anchorLink[i]);
      $anchorEle.attr('class', 'cate-anchor');
      $anchorEle.attr('data-anchor', $(anchorLink[i]).attr('href'));
      $anchorEle.removeAttr('href');
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

        $innerDropDownMenu.append('<li><a class="cate-anchor" ' + categoryStyle + ' data-anchor="#' + anchor[i].id + '">' + $(anchor[i]).parent('h6, h5, h4, h3, h2, h1').text() + '</a></li>');
      }
    }

    $('.cate-anchor').click(scrollToAnchor);
    $dropDownMenu.removeClass('content-hidden');
  };

  function processAwesomeJSON(data) {
    var list = data;
    var awesomeData = [];
    var $awesomeCate = $('.awesome-cate');
    $awesomeCate.html('');

    Object.keys(list).forEach(function generateTheAwesomeList(e) {
      var _cateID = e.replace(/\W/g, '').toLowerCase();
      var title = '<h2 id="' + _cateID + '">' + e + '</h2>';
      awesomeData = awesomeData.concat(list[e]);

      $awesomeCate.append('<strong><i class="fa fa-terminal" style="color: gray;"></i> ' + e + '</strong><li><ul class="' + _cateID + '-ul"></ul></li>');

      list[e].forEach(function(e) {
        var $cateUl = $('.' + _cateID + '-ul');
        var id = e.name.replace(/\W/g, '').toLowerCase();
        var link = '';
        var description = e.description ? ' - ' + e.description : '';
        if (e.url.split('/').indexOf('github.com') > -1) {
          link = '<li><a class="' + id + '" href="#repos/' + id + '" data-url="' + e.url + '" data-name="' + e.name + '"><span class="" data-url="' + e.url + '" data-name="' + e.name + '"><i class="fa fa-bookmark"></i> ' +  e.name + '</span></a></li>';
        } else {
          link = '<li><a class="' + id + '" href="' + e.url + '" data-name="' + e.name + '" target="_blank"><span class="" data-url="' + e.url + '" data-name="' + e.name + '"><i class="fa fa-bookmark"></i> ' +  e.name + '</span></a></li>';
        }

        $cateUl.append(link);
      });

    });

    var $sidedrawerEl = $('#sidedrawer');
    var $titleEls = $('strong', $sidedrawerEl);
    $titleEls.next().hide();
    $titleEls.off('click');
    $titleEls.on('click', function() {
      $titleEls.not(this).next().hide();
      $(this).next().slideToggle(300);
    });

    awesomeFinder = new Fuse(awesomeData, options);
  }

  /**
  * Retrieve the readme file of an awesome repo from github and store the json for searching.
  * @param e It's an object containing repo name and url.
  * @param cate The repo name we want to get.
  * @return null
  **/
  var getCateList = function(e, cate) {
    // console.log(cate);
    var repoName = 'awesome';
    isAwesome = cate === 'awesome' ? 1 : 0;
    haveParse = !isAwesome;
    jsonURL = 'https://raw.githubusercontent.com/lockys/awesome.json/master/output/' + cate + '.json';
    awesomeJsonURL = 'https://raw.githubusercontent.com/lockys/awesome.json/master/awesome/awesome.json';
    $dropDownMenu.removeClass('content-hidden');
    $searchResult.addClass('content-hidden');

    $searchResult.html('');
    $innerDropDownMenu.html('');
    $('.alert').html('');
    $('.awesome-input').val('');

    /**
    * Get readme of awesome repo
    **/
    if (!isAwesome) {
      var repoURL = e.url;
      var originRepoHTML = '<a href="' + repoURL + '" class="origin-repo-btn" target="_blank">View On <i class="fa fa-github"></i></a><a href="https://github.com/lockys/awesome-search/issues/new" target="_blank" class="origin-repo-btn"><i class="fa fa-exclamation-circle"></i> This Repo Has Some Issues</a><br/><br/>';
      repoName = e.name;

      // Update the title
      $('.cate').html(repoName);
      $awesome.html('<div class="sk-spinner sk-spinner-pulse"></div>');

      getReadme(repoURL, originRepoHTML, processReadMe);

      $.getJSON(jsonURL, function(data) {
        var list = data;
        var d = [];
        /**
        * Category has not been parsed yet.
        **/
        $searchBlock.removeClass('content-hidden');

        if (Object.keys(list).length === 0) {
          haveParse = false;
          $('.alert').html('<span style="color: red;">This repo has not been parsed yet, we will support it soon.</span><br/>');
          $searchBlock.addClass('content-hidden');
          return;
        }

        /**
        * Fill in to data for searching
        **/
        list.forEach(function(e) {
          if (!isURL(e.url)) {
            var maintainer = repoURL.split('/')[3];
            var repo = repoURL.split('/')[4];
            var repoUrlPrefix = 'https://github.com/' + maintainer + '/' + repo + '/blob/master';
            e.url = repoUrlPrefix + e.url;
          }

          d = d.concat(e);
        });

        repoFinder = new Fuse(d, options);
      });

    }else {
      // Update the title
      $('.cate').html(repoName);

      $.getJSON(awesomeJsonURL, processAwesomeJSON);

      $dropDownMenu.addClass('content-hidden');
    }

  };

  $('input').on('input', function(e) {
    var isCateInput = $(e.target).hasClass('cate-input');
    var query = $(this).val();
    var LENGTH_LIMIT = 15;
    $searchResult = isCateInput ? $('.cate-search-result') : $('.search-result');

    $searchResult.removeClass('content-hidden');
    $searchResult.html('');

    if (!query) {
      $searchResult.addClass('content-hidden');
    }

    var result = isCateInput ? awesomeFinder.search(query) : repoFinder.search(query);
    var link = '';
    var description = '';
    if (!result.length) {
      $searchResult.html('No result :(');
    }

    /**
    List the searching result.
    **/
    for (var i = 0, len = LENGTH_LIMIT; i < len; ++i) {
      if (result[i]) {
        var id = result[i].name.replace(/\W/g, '').toLowerCase();
        var href = ' href="' + result[i].url + '" ';

        if (isAwesome) {
          href = '';
        }

        // console.log(d);
        description = result[i].description ? ' - ' + result[i].description + '</br>' : '<br/>';

        if (haveParse && !isCateInput) {
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
    } // end of for loop

  });

  /**
  * @param repoURL
  * @param cb to dealing with html of readme.
  **/
  function getReadme(repoURL, originRepoHTML, cb) {
    var maintainer = repoURL.split('/')[3];
    var repo = repoURL.split('/')[4];
    var apiURL = 'https://api.github.com/repos/' + maintainer + '/' + repo + '/readme';

    $.ajax({
      url: apiURL,
      headers: {
        accept: 'application/vnd.github.v3.html',
      },
      success: function(content) {
        cb(content, repoURL, originRepoHTML);
      },
    });
  }

  // The Backbone router configuration.

  var AwesomeRouter = Backbone.Router.extend({
    routes: {
      'repos/:cate': 'getRepos',
      '': 'getAwesome',
    },
  });

  var awesomeRouter = new AwesomeRouter();

  awesomeRouter.on('route:getRepos', function(cate) {
    var repoInfo = {};

    $.getJSON(urlMap, function(d) {
      var urlMapObj = d;
      var k = Object.keys(urlMapObj);

      for (var i = 0, len = k.length; i < len; ++i) {

        if (k[i].replace(/\W/g, '').toLowerCase() === cate) {
          repoInfo = {
                name: k[i],
                url: urlMapObj[k[i]],
              };
          $('.search-holder').html('Search the ' + repoInfo.name);
          getCateList(repoInfo, cate);
          break;
        }

      }
    });

  });

  awesomeRouter.on('route:getAwesome', function() {
    getCateList(null, 'awesome');
  });

  $('body').click(function(event) {
    if ($(event.target).hasClass('home-button')) {
      event.preventDefault();
      window.location.hash = '/';
      location.reload();
    }

    // Close the search result when click outside of the div

    if (!$(event.target).hasClass('awesome-input') && !$(event.target).hasClass('search-result') && !$(event.target).hasClass('search-icon')) {
      $('.awesome-input').val('');
      $('.search-result').addClass('content-hidden');
      $('.search-input').removeClass('hovered');
    }

    if (!$(event.target).hasClass('cate-input') && !$(event.target).hasClass('cate-search-result')) {
      $('.cate-input').val('');
      $('.cate-search-result').addClass('content-hidden');
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

  function scrollToAnchor(e) {
    var anchor = $(e.target).data('anchor');
    var offset = $(anchor).offset().top - $('#header').height();
    $('html, body').animate({
      scrollTop: offset,
    }, 300);
  }

  getCateList(null, 'awesome');

  // window.location.hash = '/';
  Backbone.history.start();

});
