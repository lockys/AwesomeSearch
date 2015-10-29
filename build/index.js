(function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @api public
   */

  function require(name){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];
    var threw = true;

    try {
      fn.call(m.exports, function(req){
        var dep = modules[id][1][req];
        return require(dep || req);
      }, m, m.exports, outer, modules, cache, entries);
      threw = false;
    } finally {
      if (threw) {
        delete cache[id];
      } else if (name) {
        // expose as 'name'.
        cache[name] = cache[id];
      }
    }

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
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

}, {"./data/awesome-nodejs.json":2,"./data/awesome.json":3}],
2: [function(require, module, exports) {
module.exports = {
  "Mad science": [
    {
      "name": "webtorrent",
      "url": "https://github.com/feross/webtorrent",
      "description": "Streaming torrent client for Node"
    },
    {
      "name": "GitTorrent",
      "url": "https://github.com/cjb/GitTorrent",
      "description": "Peer-to-peer network of Git repositories being shared over BitTorrent"
    },
    {
      "name": "peerflix",
      "url": "https://github.com/mafintosh/peerflix",
      "description": "Streaming torrent client"
    },
    {
      "name": "dat",
      "url": "http://dat-data.com",
      "description": "Real-time replication and versioning for data sets"
    },
    {
      "name": "ipfs",
      "url": "https://github.com/jbenet/node-ipfs",
      "description": "Distributed file system that seeks to connect all computing devices with the same system of files"
    },
    {
      "name": "stackgl",
      "url": "http://stack.gl",
      "description": "Open software ecosystem for WebGL, built on top of browserify and npm"
    },
    {
      "name": "peerwiki",
      "url": "https://github.com/mafintosh/peerwiki",
      "description": "All of Wikipedia on BitTorrent"
    },
    {
      "name": "peercast",
      "url": "https://github.com/mafintosh/peercast",
      "description": "Stream a torrent video to Chromecast"
    },
    {
      "name": "BitcoinJS",
      "url": "http://bitcoinjs.org",
      "description": "Clean, readable, proven Bitcoin library"
    },
    {
      "name": "Bitcore",
      "url": "http://bitcore.io",
      "description": "A pure and powerful Bitcoin library"
    },
    {
      "name": "PDFKit",
      "url": "http://pdfkit.org",
      "description": "PDF generation library"
    },
    {
      "name": "turf",
      "url": "https://github.com/Turfjs/turf",
      "description": "Modular geospatial processing and analysis engine"
    },
    {
      "name": "webcat",
      "url": "https://github.com/mafintosh/webcat",
      "description": "p2p pipe across the web using WebRTC that uses your GitHub private/public key for authentication"
    },
    {
      "name": "js-git",
      "url": "https://github.com/creationix/js-git",
      "description": "JavaScript implementation of Git"
    },
    {
      "name": "NodeOS",
      "url": "http://node-os.com",
      "description": "The first operating system powered by npm"
    },
    {
      "name": "limdu",
      "url": "https://github.com/erelsgl/limdu",
      "description": "Machine-learning framework"
    },
    {
      "name": "Cytoscape.js",
      "url": "http://js.cytoscape.org",
      "description": "Graph theory (a"
    }
  ],
  "Command-line apps": [
    {
      "name": "pageres",
      "url": "https://github.com/sindresorhus/pageres",
      "description": "Capture website screenshots"
    },
    {
      "name": "trash",
      "url": "https://github.com/sindresorhus/trash",
      "description": "A safer alternative to `rm`"
    },
    {
      "name": "npm-name",
      "url": "https://github.com/sindresorhus/npm-name",
      "description": "Check whether a package name is available on npm"
    },
    {
      "name": "XO",
      "url": "https://github.com/sindresorhus/xo",
      "description": "Enforce strict code style using the JavaScript happiness style"
    },
    {
      "name": "speed-test",
      "url": "https://github.com/sindresorhus/speed-test",
      "description": "Test your internet connection speed and ping"
    },
    {
      "name": "np",
      "url": "https://github.com/sindresorhus/np",
      "description": "A better `npm publish`"
    },
    {
      "name": "yo",
      "url": "https://github.com/yeoman/yo",
      "description": "Run Yeoman generators"
    },
    {
      "name": "ESLint",
      "url": "http://eslint.org",
      "description": "The pluggable linting utility for JavaScript"
    },
    {
      "name": "JSCS",
      "url": "https://github.com/jscs-dev/node-jscs",
      "description": "JavaScript Code Style checker"
    },
    {
      "name": "Standard",
      "url": "https://github.com/feross/standard",
      "description": "JavaScript Standard Style — One style to rule them all"
    },
    {
      "name": "cpy",
      "url": "https://github.com/sindresorhus/cpy",
      "description": "Copy files"
    },
    {
      "name": "fkill",
      "url": "https://github.com/sindresorhus/fkill-cli",
      "description": "Fabulously kill processes"
    },
    {
      "name": "vantage",
      "url": "https://github.com/dthree/vantage",
      "description": "Distributed, realtime CLI for your live app"
    },
    {
      "name": "vtop",
      "url": "https://github.com/MrRio/vtop",
      "description": "More better top, with nice charts"
    },
    {
      "name": "tmpin",
      "url": "https://github.com/sindresorhus/tmpin",
      "description": "Adds stdin support to any CLI app that accepts file input"
    },
    {
      "name": "empty-trash",
      "url": "https://github.com/sindresorhus/empty-trash",
      "description": "Empty the trash"
    },
    {
      "name": "is-up",
      "url": "https://github.com/sindresorhus/is-up",
      "description": "Check whether a website is up or down"
    },
    {
      "name": "is-online",
      "url": "https://github.com/sindresorhus/is-online",
      "description": "Check if the internet connection is up"
    },
    {
      "name": "public-ip",
      "url": "https://github.com/sindresorhus/public-ip",
      "description": "Get your public IP address"
    },
    {
      "name": "dark-mode",
      "url": "https://github.com/sindresorhus/dark-mode",
      "description": "Toggle the OS X Dark Mode"
    },
    {
      "name": "ttystudio",
      "url": "https://github.com/chjj/ttystudio",
      "description": "Record your terminal and compile it to a GIF or APNG without any external dependencies, bash scripts, gif concatenation, etc"
    },
    {
      "name": "David",
      "url": "https://github.com/alanshaw/david",
      "description": "Tells you when your package npm dependencies are out of date"
    },
    {
      "name": "http-server",
      "url": "https://github.com/nodeapps/http-server",
      "description": "Simple, zero-config command-line HTTP server"
    },
    {
      "name": "Live Server",
      "url": "https://github.com/tapio/live-server",
      "description": "A simple development HTTP-server with livereload capability"
    },
    {
      "name": "bcat",
      "url": "https://github.com/kessler/node-bcat",
      "description": "Pipe command output to web browsers"
    },
    {
      "name": "normit",
      "url": "https://github.com/pawurb/normit",
      "description": "Google Translate with speech synthesis in your terminal"
    },
    {
      "name": "slap",
      "url": "https://github.com/slap-editor/slap",
      "description": "Sublime-like terminal-based text editor"
    },
    {
      "name": "jsinspect",
      "url": "https://github.com/danielstjules/jsinspect",
      "description": "Detect copy-pasted and structurally similar code"
    },
    {
      "name": "esformatter",
      "url": "https://github.com/millermedeiros/esformatter",
      "description": "JavaScript code beautifier/formatter"
    },
    {
      "name": "pjs",
      "url": "https://github.com/danielstjules/pjs",
      "description": "Pipeable JavaScript"
    },
    {
      "name": "license-checker",
      "url": "https://github.com/davglass/license-checker",
      "description": "Check licenses of your app's dependencies"
    },
    {
      "name": "browser-run",
      "url": "https://github.com/juliangruber/browser-run",
      "description": "Easily run code in a browser environment"
    },
    {
      "name": "modhelp",
      "url": "https://github.com/runvnc/modhelp",
      "description": "Syntax-highlighted module READMEs in terminal with ANSI-friendly pager"
    },
    {
      "name": "wifi-password",
      "url": "https://github.com/kevva/wifi-password",
      "description": "Get the current wifi password"
    },
    {
      "name": "wallpaper",
      "url": "https://github.com/sindresorhus/wallpaper",
      "description": "Change the desktop wallpaper"
    },
    {
      "name": "brightness",
      "url": "https://github.com/kevva/brightness-cli",
      "description": "Change the screen brightness"
    },
    {
      "name": "torrent",
      "url": "https://github.com/maxogden/torrent",
      "description": "Download torrents"
    },
    {
      "name": "tfa",
      "url": "https://github.com/jasnell/tfa",
      "description": "Two-factor authentication client"
    },
    {
      "name": "rtail",
      "url": "https://github.com/kilianc/rtail",
      "description": "Terminal output to the browser in seconds, using UNIX pipes"
    },
    {
      "name": "kill-tabs",
      "url": "https://github.com/sindresorhus/kill-tabs",
      "description": "Kill all Chrome tabs to improve performance, decrease battery usage, and save memory"
    },
    {
      "name": "alex",
      "url": "https://github.com/wooorm/alex",
      "description": "Catch insensitive, inconsiderate writing"
    },
    {
      "name": "pen",
      "url": "https://github.com/noraesae/pen",
      "description": "Live Markdown preview in the browser from your favorite editor"
    },
    {
      "name": "subdownloader",
      "url": "https://github.com/beatfreaker/subdownloader",
      "description": "Subtitle downloader for movies and TV series"
    },
    {
      "name": "iponmap",
      "url": "https://github.com/nogizhopaboroda/iponmap",
      "description": "IP location finder"
    }
  ],
  "Functional programming": [
    {
      "name": "lodash",
      "url": "http://lodash.com",
      "description": "A utility library delivering consistency, customization, performance, & extras"
    },
    {
      "name": "immutable",
      "url": "https://github.com/facebook/immutable-js",
      "description": "Immutable data collections"
    },
    {
      "name": "mori",
      "url": "http://swannodette.github.io/mori/",
      "description": "A library for using ClojureScript's persistent data structures and supporting API from the comfort of vanilla JavaScript"
    },
    {
      "name": "Ramda",
      "url": "http://ramdajs.com",
      "description": "A utility library with a focus on flexible functional composition enabled by automatic currying and reversed argument order"
    },
    {
      "name": "Folktale",
      "url": "http://folktale.github.io",
      "description": "A suite of libraries for generic functional programming in JavaScript that allows you to write elegant, modular applications with fewer bugs, and more reuse"
    },
    {
      "name": "underscore-contrib",
      "url": "http://documentcloud.github.io/underscore-contrib/",
      "description": "The brass buckles on Underscore's utility belt"
    },
    {
      "name": "Mout",
      "url": "http://moutjs.com",
      "description": "Utility library with the biggest difference between other existing solutions is that you can choose to load only the modules/functions that you need, no extra overhead"
    },
    {
      "name": "Bacon.js",
      "url": "http://baconjs.github.io",
      "description": "Functional reactive programming"
    },
    {
      "name": "RxJS",
      "url": "http://reactivex.io",
      "description": "Functional reactive library for transforming, composing, and querying various kinds of data"
    },
    {
      "name": "Lazy.js",
      "url": "https://github.com/dtao/lazy.js",
      "description": "Utility library similar to lodash/Underscore but with lazy evaluation, which can translate to superior performance in many cases"
    }
  ],
  "HTTP": [
    {
      "name": "got",
      "url": "https://github.com/sindresorhus/got",
      "description": "A nicer interface to the built-in `http` module"
    },
    {
      "name": "gh-got",
      "url": "https://github.com/sindresorhus/gh-got",
      "description": "Convenience wrapper for `got` to interact with the GitHub API"
    },
    {
      "name": "request",
      "url": "https://github.com/mikeal/request",
      "description": "Simplified HTTP request client"
    },
    {
      "name": "Nock",
      "url": "https://github.com/pgte/nock",
      "description": "A HTTP mocking and expectations library"
    },
    {
      "name": "hyperquest",
      "url": "https://github.com/substack/hyperquest",
      "description": "Streaming HTTP requests"
    },
    {
      "name": "axios",
      "url": "https://github.com/mzabriskie/axios",
      "description": "Promise based HTTP client (works in the browser too)"
    },
    {
      "name": "spdy",
      "url": "https://github.com/indutny/node-spdy",
      "description": "Creates SPDY servers with the same API as the built-in `https` module"
    },
    {
      "name": "wreck",
      "url": "https://github.com/hapijs/wreck",
      "description": "HTTP Client Utilities"
    },
    {
      "name": "download",
      "url": "https://github.com/kevva/download",
      "description": "Download and extract files effortlessly"
    },
    {
      "name": "http-proxy",
      "url": "https://github.com/nodejitsu/node-http-proxy",
      "description": "A full-featured HTTP proxy"
    },
    {
      "name": "rocky",
      "url": "https://github.com/h2non/rocky",
      "description": "Featured, middleware-oriented HTTP proxy with traffic replay and intercept"
    },
    {
      "name": "superagent",
      "url": "https://github.com/visionmedia/superagent",
      "description": "A small progressive HTTP request library"
    }
  ],
  "Debugging / Profiling": [
    {
      "name": "ironNode",
      "url": "https://github.com/s-a/iron-node",
      "description": "Node"
    },
    {
      "name": "node-inspector",
      "url": "https://github.com/node-inspector/node-inspector",
      "description": "Debugger based on Blink Developer Tools"
    },
    {
      "name": "Theseus",
      "url": "https://github.com/adobe-research/theseus",
      "description": "A new type of JavaScript debugger featuring real-time code coverage, retroactive inspection and asynchronous call tree"
    },
    {
      "name": "longjohn",
      "url": "https://github.com/mattinsler/longjohn",
      "description": "Long stack traces with configurable call trace length"
    },
    {
      "name": "debug",
      "url": "https://github.com/visionmedia/debug",
      "description": "Tiny debugging utility"
    },
    {
      "name": "jstrace",
      "url": "https://github.com/jstrace/jstrace",
      "description": "Dynamic tracing for JavaScript, similar to dtrace, ktap etc"
    },
    {
      "name": "njsTrace",
      "url": "https://github.com/valyouw/njstrace",
      "description": "Instrument and trace your code, see all function calls, arguments, return values, as well as the time spent in each function"
    },
    {
      "name": "vstream",
      "url": "https://github.com/joyent/node-vstream",
      "description": "Instrumentable streams mix-ins to inspect a pipeline of streams"
    },
    {
      "name": "stackman",
      "url": "https://github.com/watson/stackman",
      "description": "Enhance an error stacktrace with code excerpts and other goodies"
    },
    {
      "name": "TraceGL",
      "url": "https://github.com/traceglMPL/tracegl",
      "description": "Transforms your JavaScript, injecting monitoring code that produces a log of everything that happens"
    },
    {
      "name": "locus",
      "url": "https://github.com/alidavut/locus",
      "description": "Starts a REPL at runtime that has access to all variables"
    }
  ],
  "Logging": [
    {
      "name": "winston",
      "url": "https://github.com/flatiron/winston",
      "description": "A multi-transport async logging library"
    },
    {
      "name": "Bunyan",
      "url": "https://github.com/trentm/node-bunyan",
      "description": "A simple and fast JSON logging library"
    },
    {
      "name": "intel",
      "url": "https://seanmonstar.github.io/intel",
      "description": "A comprehensive logging library (handlers, filters, formatters, console injection)"
    },
    {
      "name": "console-log-level",
      "url": "https://github.com/watson/console-log-level",
      "description": "The most simple logger imaginable with support for log levels and custom prefixes"
    }
  ],
  "Command-line utilities": [
    {
      "name": "chalk",
      "url": "https://github.com/sindresorhus/chalk",
      "description": "Terminal string styling done right"
    },
    {
      "name": "meow",
      "url": "https://github.com/sindresorhus/meow",
      "description": "CLI app helper"
    },
    {
      "name": "minimist",
      "url": "https://github.com/substack/minimist",
      "description": "Parse command-line flags"
    },
    {
      "name": "get-stdin",
      "url": "https://github.com/sindresorhus/get-stdin",
      "description": "Easier stdin"
    },
    {
      "name": "user-home",
      "url": "https://github.com/sindresorhus/user-home",
      "description": "Get the path to the user home directory"
    },
    {
      "name": "log-update",
      "url": "https://github.com/sindresorhus/log-update",
      "description": "Log by overwriting the previous output in the terminal"
    },
    {
      "name": "Inquirer.js",
      "url": "https://github.com/SBoudrias/Inquirer.js",
      "description": "Interactive command-line prompt"
    },
    {
      "name": "update-notifier",
      "url": "https://github.com/yeoman/update-notifier",
      "description": "Update notifications for your CLI app"
    },
    {
      "name": "ansi-escapes",
      "url": "https://github.com/sindresorhus/ansi-escapes",
      "description": "ANSI escape codes for manipulating the terminal"
    },
    {
      "name": "sudo-block",
      "url": "https://github.com/sindresorhus/sudo-block",
      "description": "Block users from running your app with root permissions"
    },
    {
      "name": "configstore",
      "url": "https://github.com/yeoman/configstore",
      "description": "Easily load and persist config without having to think about where and how"
    },
    {
      "name": "insight",
      "url": "https://github.com/yeoman/insight",
      "description": "Helps you understand how your tool is being used by anonymously reporting usage metrics to Google Analytics"
    },
    {
      "name": "log-symbols",
      "url": "https://github.com/sindresorhus/log-symbols",
      "description": "Colored symbols for various log levels"
    },
    {
      "name": "figures",
      "url": "https://github.com/sindresorhus/figures",
      "description": "Unicode symbols with Windows CMD fallbacks"
    },
    {
      "name": "string-width",
      "url": "https://github.com/sindresorhus/string-width",
      "description": "Get the visual width of a string - the number of columns required to display it"
    },
    {
      "name": "first-run",
      "url": "https://github.com/sindresorhus/first-run",
      "description": "Check if it's the first time the process is run"
    },
    {
      "name": "sparkly",
      "url": "https://github.com/sindresorhus/sparkly",
      "description": "Generate sparklines ▁▂▃▅▂▇- [vorpal](https://github"
    },
    {
      "name": "blessed",
      "url": "https://github.com/chjj/blessed",
      "description": "A curses-like library"
    },
    {
      "name": "yn",
      "url": "https://github.com/sindresorhus/yn",
      "description": "Parse yes/no like values"
    },
    {
      "name": "cli-table",
      "url": "https://github.com/LearnBoost/cli-table",
      "description": "Pretty unicode tables"
    },
    {
      "name": "drawille",
      "url": "https://github.com/madbence/node-drawille",
      "description": "Draw on the terminal with unicode braille characters"
    },
    {
      "name": "googleauth",
      "url": "https://github.com/maxogden/googleauth",
      "description": "Create and load persistent Google authentication tokens for command-line apps"
    },
    {
      "name": "ascii-charts",
      "url": "https://github.com/jstrace/chart",
      "description": "ASCII bar chart in the terminal"
    },
    {
      "name": "progress",
      "url": "https://github.com/visionmedia/node-progress",
      "description": "Flexible ascii progress bar"
    },
    {
      "name": "cli-cursor",
      "url": "https://github.com/sindresorhus/cli-cursor",
      "description": "Toggle the CLI cursor"
    },
    {
      "name": "columnify",
      "url": "https://github.com/timoxley/columnify",
      "description": "Create text-based columns suitable for console output"
    },
    {
      "name": "cfonts",
      "url": "https://github.com/dominikwilkowski/cfonts",
      "description": "Sexy ASCII fonts for the console"
    }
  ],
  "Build tools": [
    {
      "name": "gulp",
      "url": "http://gulpjs.com",
      "description": "Streaming and fast build system that favors code over config"
    },
    {
      "name": "Broccoli",
      "url": "https://github.com/broccolijs/broccoli",
      "description": "A fast, reliable asset pipeline, supporting constant-time rebuilds and compact build definitions"
    },
    {
      "name": "browserify",
      "url": "https://github.com/substack/node-browserify",
      "description": "Browser-side require() the Node"
    },
    {
      "name": "webpack",
      "url": "https://github.com/webpack/webpack",
      "description": "Packs CommonJS/AMD modules for the browser"
    },
    {
      "name": "Brunch",
      "url": "https://github.com/brunch/brunch",
      "description": "Front-end web app build tool with simple declarative config, fast incremental compilation, and an opinionated workflow"
    },
    {
      "name": "strong-build",
      "url": "https://github.com/strongloop/strong-build",
      "description": "Build a node app package and prepare to deploy it as a package to production or use git to commit to a deploy branch"
    },
    {
      "name": "grunt",
      "url": "http://gruntjs.com",
      "description": "Task runner that can perform repetitive tasks like minification, compilation, unit testing, linting, etc"
    }
  ],
  "Hardware": [
    {
      "name": "johnny-five",
      "url": "https://github.com/rwaldron/johnny-five",
      "description": "Firmata based Arduino Framework"
    },
    {
      "name": "serialport",
      "url": "https://github.com/voodootikigod/node-serialport",
      "description": "Access serial ports for reading and writing"
    },
    {
      "name": "usb",
      "url": "https://github.com/nonolith/node-usb",
      "description": "USB library"
    },
    {
      "name": "cylon.js",
      "url": "http://cylonjs.com",
      "description": "Next generation robotics framework with support for 26 different platforms"
    },
    {
      "name": "i2c-bus",
      "url": "https://github.com/fivdi/i2c-bus",
      "description": "I2C serial bus access"
    }
  ],
  "Templating": [
    {
      "name": "marko",
      "url": "https://github.com/marko-js/marko",
      "description": "A fast and lightweight HTML-based templating engine that compiles templates to CommonJS modules and supports streaming, async rendering and custom tags"
    },
    {
      "name": "nunjucks",
      "url": "https://github.com/mozilla/nunjucks",
      "description": "A powerful templating engine with inheritance, asynchronous control, and more (jinja2 inspired)"
    },
    {
      "name": "handlebars.js",
      "url": "https://github.com/wycats/handlebars.js",
      "description": "A superset of Mustache templates which adds powerful features like helpers and more advanced blocks"
    },
    {
      "name": "hogan.js",
      "url": "http://twitter.github.io/hogan.js/",
      "description": "Twitter's small, fast, phase-separated compiler for Mustache templates"
    },
    {
      "name": "EJS",
      "url": "https://github.com/mde/ejs",
      "description": "Simple unopinionated templating language"
    },
    {
      "name": "Jade",
      "url": "https://github.com/visionmedia/jade",
      "description": "High-performance template engine heavily influenced by Haml"
    }
  ],
  "Web frameworks": [
    {
      "name": "Koa",
      "url": "http://koajs.com",
      "description": "A new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs"
    },
    {
      "name": "Express",
      "url": "http://expressjs.com",
      "description": "A minimal and flexible web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications"
    },
    {
      "name": "Hapi",
      "url": "http://hapijs.com",
      "description": "A rich framework for building applications and services"
    },
    {
      "name": "LoopBack",
      "url": "http://loopback.io",
      "description": "Powerful framework for creating REST APIs and easily connecting to backend data sources"
    },
    {
      "name": "Meteor",
      "url": "https://www.meteor.com",
      "description": "An ultra-simple, database-everywhere, data-on-the-wire, pure-Javascript web framework"
    },
    {
      "name": "SailsJS",
      "url": "http://sailsjs.org",
      "description": "An MVC web framework with a modern twist, supporting WebSockets, streams, and a data-driven API"
    },
    {
      "name": "Restify",
      "url": "http://mcavage.me/node-restify/",
      "description": "A node framework built specifically to enable you to build correct REST web services"
    },
    {
      "name": "Interfake",
      "url": "https://github.com/basicallydan/interfake",
      "description": "Rapid prototyping framework for making mock HTTP APIs, with a Node"
    },
    {
      "name": "Derby",
      "url": "https://github.com/derbyjs/derby",
      "description": "MVC framework, making it easy to write realtime, collaborative applications that run in both Node"
    },
    {
      "name": "Restberry",
      "url": "http://restberry.com",
      "description": "Framework for setting up RESTful JSON APIs, applied to your database models without needing to write any code"
    },
    {
      "name": "Catberry",
      "url": "http://catberry.org",
      "description": "Framework with Flux architecture, isomorphic web-components, and progressive rendering"
    }
  ],
  "Documentation": [
    {
      "name": "Docco",
      "url": "http://jashkenas.github.io/docco/",
      "description": "A quick-and-dirty documentation generator which produces an HTML document that displays your comments intermingled with your code"
    },
    {
      "name": "JSDoc",
      "url": "http://usejsdoc.org",
      "description": "API documentation generator similar to JavaDoc or PHPDoc"
    },
    {
      "name": "dox",
      "url": "https://github.com/visionmedia/dox",
      "description": "JavaScript documentation generator using Markdown and JSDoc"
    },
    {
      "name": "jsdox",
      "url": "https://github.com/sutoiku/jsdox",
      "description": "JSDoc3 to Markdown documentation generator"
    },
    {
      "name": "apiDoc",
      "url": "https://github.com/apidoc/apidoc",
      "description": "Inline documentation for RESTful web APIs"
    }
  ],
  "Filesystem": [
    {
      "name": "del",
      "url": "https://github.com/sindresorhus/del",
      "description": "Delete files/folders using globs"
    },
    {
      "name": "globby",
      "url": "https://github.com/sindresorhus/globby",
      "description": "Glob files with support for multiple patterns"
    },
    {
      "name": "cpy",
      "url": "https://github.com/sindresorhus/cpy",
      "description": "Copy files"
    },
    {
      "name": "rimraf",
      "url": "https://github.com/isaacs/rimraf",
      "description": "Recursively delete files like `rm -rf`"
    },
    {
      "name": "mkdirp",
      "url": "https://github.com/substack/node-mkdirp",
      "description": "Recursively create directories like `mkdir -p`"
    },
    {
      "name": "graceful-fs",
      "url": "https://github.com/isaacs/node-graceful-fs",
      "description": "Drop-in replacement for the `fs` module with various improvements"
    },
    {
      "name": "chokidar",
      "url": "https://github.com/paulmillr/chokidar",
      "description": "Filesystem watcher which stabilizes events from `fs"
    },
    {
      "name": "find-up",
      "url": "https://github.com/sindresorhus/find-up",
      "description": "Find a file by walking up parent directories"
    },
    {
      "name": "load-json-file",
      "url": "https://github.com/sindresorhus/load-json-file",
      "description": "Read and parse a JSON file"
    },
    {
      "name": "write-json-file",
      "url": "https://github.com/sindresorhus/write-json-file",
      "description": "Stringify and write JSON to a file atomically"
    },
    {
      "name": "fs-write-stream-atomic",
      "url": "https://github.com/npm/fs-write-stream-atomic",
      "description": "Like `fs"
    },
    {
      "name": "filenamify",
      "url": "https://github.com/sindresorhus/filenamify",
      "description": "Convert a string to a valid filename"
    },
    {
      "name": "lnfs",
      "url": "https://github.com/kevva/lnfs",
      "description": "Force create symlinks like `ln -fs`"
    },
    {
      "name": "istextorbinary",
      "url": "https://github.com/bevry/istextorbinary",
      "description": "Check if a file is text or binary"
    },
    {
      "name": "fs-jetpack",
      "url": "https://github.com/szwacz/fs-jetpack",
      "description": "Completely redesigned file system API for convenience in everyday use"
    },
    {
      "name": "fs-extra",
      "url": "https://github.com/jprichardson/node-fs-extra",
      "description": "Extra methods for the `fs` module"
    },
    {
      "name": "pkg-dir",
      "url": "https://github.com/sindresorhus/pkg-dir",
      "description": "Find the root directory of a npm package"
    }
  ],
  "Control flow": [
    {
      "name": "Bluebird",
      "url": "https://github.com/petkaantonov/bluebird",
      "description": "A fully featured promise library with focus on innovative features and performance"
    },
    {
      "name": "pinkie-promise",
      "url": "https://github.com/floatdrop/pinkie-promise",
      "description": "Promise ponyfill"
    },
    {
      "name": "pify",
      "url": "https://github.com/sindresorhus/pify",
      "description": "Promisify a callback-style function"
    },
    {
      "name": "each-async",
      "url": "https://github.com/sindresorhus/each-async",
      "description": "Async concurrent iterator like forEach"
    },
    {
      "name": "async",
      "url": "https://github.com/caolan/async",
      "description": "Provides straight-forward, powerful functions for working with asynchronicity"
    },
    {
      "name": "async-chainable",
      "url": "https://github.com/hash-bang/async-chainable",
      "description": "Chainable, pluggable async functionality"
    },
    {
      "name": "after-all-results",
      "url": "https://github.com/watson/after-all-results",
      "description": "Bundle results of async functions calls into one callback with all the results"
    },
    {
      "name": "co",
      "url": "https://github.com/visionmedia/co",
      "description": "The ultimate generator based flow-control goodness"
    },
    {
      "name": "suspend",
      "url": "https://github.com/jmar777/suspend",
      "description": "Generator-based control flow that plays nice with callbacks, promises, and thunks"
    },
    {
      "name": "bluebird-co",
      "url": "https://github.com/novacrazy/bluebird-co",
      "description": "A set of high performance yield handlers for Bluebird coroutines"
    },
    {
      "name": "Highland.js",
      "url": "http://highlandjs.org",
      "description": "Manages synchronous and asynchronous code easily, using nothing more than standard JavaScript and Node-like Streams"
    },
    {
      "name": "js-csp",
      "url": "https://github.com/jlongster/js-csp",
      "description": "Communicating sequential processes for JavaScript (like Clojurescript core"
    },
    {
      "name": "zone",
      "url": "https://github.com/strongloop/zone",
      "description": "Provides a way to group and track resources and errors across asynchronous operations"
    }
  ],
  "Streams": [
    {
      "name": "through2",
      "url": "https://github.com/rvagg/through2",
      "description": "Tiny wrapper around streams2 Transform to avoid explicit subclassing noise"
    },
    {
      "name": "from2",
      "url": "https://github.com/hughsk/from2",
      "description": "Convenience wrapper for ReadableStream, inspired by `through2`"
    },
    {
      "name": "get-stream",
      "url": "https://github.com/sindresorhus/get-stream",
      "description": "Get a stream as a string or buffer"
    },
    {
      "name": "concat-stream",
      "url": "https://github.com/maxogden/concat-stream",
      "description": "Concatenates a stream into strings or binary data"
    },
    {
      "name": "into-stream",
      "url": "https://github.com/sindresorhus/into-stream",
      "description": "Convert a buffer/string/array/object into a stream"
    },
    {
      "name": "duplexify",
      "url": "https://github.com/mafintosh/duplexify",
      "description": "Turn a writeable and readable stream into a single streams2 duplex stream"
    },
    {
      "name": "pumpify",
      "url": "https://github.com/mafintosh/pumpify",
      "description": "Combine an array of streams into a single duplex stream"
    },
    {
      "name": "peek-stream",
      "url": "https://github.com/mafintosh/peek-stream",
      "description": "Transform stream that lets you peek the first line before deciding how to parse it"
    },
    {
      "name": "binary-split",
      "url": "https://github.com/maxogden/binary-split",
      "description": "A fast newline (or any delimiter) splitter stream"
    },
    {
      "name": "byline",
      "url": "https://github.com/jahewson/node-byline",
      "description": "Super-simple line-by-line Stream reader"
    },
    {
      "name": "first-chunk-stream",
      "url": "https://github.com/sindresorhus/first-chunk-stream",
      "description": "Transform the first chunk in a stream"
    },
    {
      "name": "pad-stream",
      "url": "https://github.com/sindresorhus/pad-stream",
      "description": "Pad each line in a stream"
    },
    {
      "name": "multistream",
      "url": "https://github.com/feross/multistream",
      "description": "Combine multiple streams into a single stream"
    },
    {
      "name": "stream-combiner2",
      "url": "https://github.com/substack/stream-combiner2",
      "description": "Turn a pipeline into a single stream"
    },
    {
      "name": "readable-stream",
      "url": "https://github.com/isaacs/readable-stream",
      "description": "Mirror of Streams2 and Streams3 implementations in core"
    },
    {
      "name": "through2-concurrent",
      "url": "https://github.com/almost/through2-concurrent",
      "description": "Transform object streams concurrently"
    },
    {
      "name": "graphicsmagick-stream",
      "url": "https://github.com/e-conomic/graphicsmagick-stream",
      "description": "Fast conversion/scaling of images using a pool of long lived GraphicsMagick processes"
    }
  ],
  "Real-time": [
    {
      "name": "Socket.io",
      "url": "http://socket.io",
      "description": "Enables real-time bidirectional event-based communication"
    },
    {
      "name": "SockJS",
      "url": "https://github.com/sockjs/sockjs-node",
      "description": "Low latency, full duplex, cross-domain channel browser-server, with WebSockets or without"
    },
    {
      "name": "Faye",
      "url": "http://faye.jcoglan.com",
      "description": "Real-time client-server message bus, based on Bayeux protocol"
    },
    {
      "name": "SocketCluster",
      "url": "https://github.com/topcloud/socketcluster",
      "description": "Scalable HTTP + WebSocket engine which can run on multiple CPU cores"
    },
    {
      "name": "Primus",
      "url": "https://github.com/primus/primus",
      "description": "An abstraction layer for real-time frameworks to prevent module lock-in"
    },
    {
      "name": "Straw",
      "url": "https://github.com/simonswain/straw",
      "description": "Real-time dataflow framework"
    }
  ],
  "Image": [
    {
      "name": "sharp",
      "url": "https://github.com/lovell/sharp",
      "description": "The fastest module for resizing JPEG, PNG, WebP and TIFF images"
    },
    {
      "name": "image-type",
      "url": "https://github.com/sindresorhus/image-type",
      "description": "Detect the image type of a Buffer/Uint8Array"
    },
    {
      "name": "gm",
      "url": "https://github.com/aheckmann/gm",
      "description": "GraphicsMagick and ImageMagick wrapper"
    },
    {
      "name": "lwip",
      "url": "https://github.com/EyalAr/lwip",
      "description": "Lightweight image processor which does not require ImageMagick"
    },
    {
      "name": "pica",
      "url": "https://github.com/nodeca/pica",
      "description": "High quality & fast resize (lanczos3) in pure JS"
    },
    {
      "name": "jimp",
      "url": "https://github.com/oliver-moran/jimp",
      "description": "Image processing in pure JavaScript"
    },
    {
      "name": "is-progressive",
      "url": "https://github.com/sindresorhus/is-progressive",
      "description": "Check if a JPEG image is progressive"
    },
    {
      "name": "probe-image-size",
      "url": "https://github.com/nodeca/probe-image-size",
      "description": "Get the size of most image formats without a full download"
    }
  ],
  "Text": [
    {
      "name": "Underscore.string",
      "url": "https://github.com/epeli/underscore.string",
      "description": "Collection of string manipulation utilities"
    },
    {
      "name": "iconv-lite",
      "url": "https://github.com/ashtuchkin/iconv-lite",
      "description": "Convert character encodings"
    },
    {
      "name": "repeating",
      "url": "https://github.com/sindresorhus/repeating",
      "description": "Repeat a string"
    },
    {
      "name": "string-length",
      "url": "https://github.com/sindresorhus/string-length",
      "description": "Get the real length of a string - by correctly counting astral symbols and ignoring ansi escape codes"
    },
    {
      "name": "camelcase",
      "url": "https://github.com/sindresorhus/camelcase",
      "description": "Convert a dash/dot/underscore/space separated string to camelCase: foo-bar → fooBar"
    },
    {
      "name": "escape-string-regexp",
      "url": "https://github.com/sindresorhus/escape-string-regexp",
      "description": "Escape RegExp special characters"
    },
    {
      "name": "execall",
      "url": "https://github.com/sindresorhus/execall",
      "description": "Find multiple RegExp matches in a string"
    },
    {
      "name": "splice-string",
      "url": "https://github.com/sindresorhus/splice-string",
      "description": "Remove or replace part of a string like `Array#splice`"
    },
    {
      "name": "indent-string",
      "url": "https://github.com/sindresorhus/indent-string",
      "description": "Indent each line in a string"
    },
    {
      "name": "strip-indent",
      "url": "https://github.com/sindresorhus/strip-indent",
      "description": "Strip leading whitespace from every line in a string"
    },
    {
      "name": "detect-indent",
      "url": "https://github.com/sindresorhus/detect-indent",
      "description": "Detect the indentation of code"
    },
    {
      "name": "he",
      "url": "https://github.com/mathiasbynens/he",
      "description": "A robust HTML entity encoder/decoder"
    },
    {
      "name": "i18n-node",
      "url": "https://github.com/mashpie/i18n-node",
      "description": "Simple translation module with dynamic JSON storage"
    },
    {
      "name": "babelfish",
      "url": "https://github.com/nodeca/babelfish/",
      "description": "i18n with very easy syntax for plurals"
    },
    {
      "name": "parse-columns",
      "url": "https://github.com/sindresorhus/parse-columns",
      "description": "Parse text columns, like the output of Unix commands"
    },
    {
      "name": "random-int",
      "url": "https://github.com/sindresorhus/random-int",
      "description": "Generate a random integer"
    },
    {
      "name": "random-float",
      "url": "https://github.com/sindresorhus/random-float",
      "description": "Generate a random float"
    },
    {
      "name": "unique-random",
      "url": "https://github.com/sindresorhus/unique-random",
      "description": "Generate random numbers that are consecutively unique"
    },
    {
      "name": "round-to",
      "url": "https://github.com/sindresorhus/round-to",
      "description": "Round a number to a specific number of decimal places: `1"
    }
  ],
  "Math": [
    {
      "name": "ndarray",
      "url": "https://github.com/mikolalysenko/ndarray",
      "description": "Multidimensional arrays"
    },
    {
      "name": "mathjs",
      "url": "https://github.com/josdejong/mathjs",
      "description": "An extensive math library"
    },
    {
      "name": "math-sum",
      "url": "https://github.com/sindresorhus/math-sum",
      "description": "Sum numbers"
    },
    {
      "name": "math-clamp",
      "url": "https://github.com/sindresorhus/math-clamp",
      "description": "Clamp a number"
    }
  ],
  "Date": [
    {
      "name": "Moment.js",
      "url": "http://momentjs.com",
      "description": "Parse, validate, manipulate, and display dates"
    },
    {
      "name": "Moment Timezone",
      "url": "http://momentjs.com/timezone/",
      "description": "IANA Time Zone Database + Moment"
    },
    {
      "name": "dateformat",
      "url": "https://github.com/felixge/node-dateformat",
      "description": "Date formatting"
    }
  ],
  "URL": [
    {
      "name": "normalize-url",
      "url": "https://github.com/sindresorhus/normalize-url",
      "description": "Normalize a URL"
    },
    {
      "name": "humanize-url",
      "url": "https://github.com/sindresorhus/humanize-url",
      "description": "Humanize a URL: http://sindresorhus"
    },
    {
      "name": "url-unshort",
      "url": "https://github.com/nodeca/url-unshort",
      "description": "Expand shortened URLs"
    },
    {
      "name": "speakingurl",
      "url": "https://github.com/pid/speakingurl",
      "description": "Generate a slug from a string with transliteration"
    },
    {
      "name": "linkify-it",
      "url": "https://github.com/markdown-it/linkify-it",
      "description": "Link patterns detector with full unicode support"
    },
    {
      "name": "url-pattern",
      "url": "https://github.com/snd/url-pattern",
      "description": "Easier than regex string matching patterns for URLs and other strings"
    },
    {
      "name": "embedza",
      "url": "https://github.com/nodeca/embedza",
      "description": "Create HTML snippets/embeds from URLs using info from oEmbed, Open Graph, meta tags"
    }
  ],
  "Data validation": [
    {
      "name": "joi",
      "url": "https://github.com/spumko/joi",
      "description": "Object schema description language and validator for JavaScript objects"
    },
    {
      "name": "is-my-json-valid",
      "url": "https://github.com/mafintosh/is-my-json-valid",
      "description": "JSON Schema validator that uses code generation to be extremely fast"
    }
  ],
  "Parsing": [
    {
      "name": "mdast",
      "url": "https://github.com/wooorm/mdast",
      "description": "Markdown processor powered by plugins"
    },
    {
      "name": "markdown-it",
      "url": "https://github.com/markdown-it/markdown-it",
      "description": "A very fast markdown parser with 100% CommonMark support, extensions and syntax plugins"
    },
    {
      "name": "parse5",
      "url": "https://github.com/inikulin/parse5",
      "description": "Fast full-featured spec compliant HTML parser"
    },
    {
      "name": "strip-json-comments",
      "url": "https://github.com/sindresorhus/strip-json-comments",
      "description": "Strip comments from JSON"
    },
    {
      "name": "strip-css-comments",
      "url": "https://github.com/sindresorhus/strip-css-comments",
      "description": "Strip comments from CSS"
    },
    {
      "name": "parse-json",
      "url": "https://github.com/sindresorhus/parse-json",
      "description": "Parse JSON with more helpful errors"
    },
    {
      "name": "URI.js",
      "url": "https://github.com/medialize/URI.js",
      "description": "URL mutation"
    },
    {
      "name": "PostCSS",
      "url": "https://github.com/postcss/postcss",
      "description": "CSS parser / stringifier"
    },
    {
      "name": "JSONStream",
      "url": "https://github.com/dominictarr/JSONStream",
      "description": "Streaming JSON"
    },
    {
      "name": "csv-parser",
      "url": "https://github.com/mafintosh/csv-parser",
      "description": "Streaming CSV parser that aims to be faster than everyone else"
    },
    {
      "name": "neat-csv",
      "url": "https://github.com/sindresorhus/neat-csv",
      "description": "Fast CSV parser"
    },
    {
      "name": "PEG.js",
      "url": "https://github.com/dmajda/pegjs",
      "description": "Simple parser generator that produces fast parsers with excellent error reporting"
    },
    {
      "name": "x-ray",
      "url": "https://github.com/lapwinglabs/x-ray",
      "description": "A web scraping utility to see through the `<html>` noise"
    },
    {
      "name": "nearley",
      "url": "https://github.com/Hardmath123/nearley",
      "description": "Simple, fast, powerful parsing for JavaScript"
    },
    {
      "name": "binary-extract",
      "url": "https://github.com/juliangruber/binary-extract",
      "description": "Extract a value from a buffer of JSON without parsing the whole thing"
    },
    {
      "name": "json-mask",
      "url": "https://github.com/nemtsov/json-mask",
      "description": "Tiny language and engine for selecting parts of an object, hiding/masking the rest"
    },
    {
      "name": "Stylecow",
      "url": "https://github.com/stylecow/stylecow",
      "description": "Parse, manipulate and convert modern CSS to make it compatible with all browsers"
    },
    {
      "name": "js-yaml",
      "url": "https://github.com/nodeca/js-yaml",
      "description": "Very fast YAML parser"
    },
    {
      "name": "excel-stream",
      "url": "https://github.com/dominictarr/excel-stream",
      "description": "Streaming Excel spreadsheet to JSON parser"
    },
    {
      "name": "xml2js",
      "url": "https://github.com/Leonidas-from-XIV/node-xml2js",
      "description": "XML to JavaScript object converter"
    }
  ],
  "Humanize": [
    {
      "name": "pretty-bytes",
      "url": "https://github.com/sindresorhus/pretty-bytes",
      "description": "Convert bytes to a human readable string: `1337` → `1"
    },
    {
      "name": "pretty-ms",
      "url": "https://github.com/sindresorhus/pretty-ms",
      "description": "Convert milliseconds to a human readable string: `1337000000` → `15d 11h 23m 20s`"
    },
    {
      "name": "ms",
      "url": "https://github.com/guille/ms.js",
      "description": "Tiny millisecond conversion utility"
    },
    {
      "name": "pretty-error",
      "url": "https://github.com/AriaMinaei/pretty-error",
      "description": "Errors with less clutter"
    },
    {
      "name": "humanize",
      "url": "https://github.com/taijinlee/humanize",
      "description": "Data formatter for human readability"
    },
    {
      "name": "read-art",
      "url": "https://github.com/Tjatse/node-readability",
      "description": "Extract readable content from any page"
    }
  ],
  "Compression": [
    {
      "name": "Archiver",
      "url": "https://github.com/ctalkington/node-archiver",
      "description": "Streaming interface for archive generation, supporting ZIP and TAR"
    },
    {
      "name": "decompress-zip",
      "url": "https://github.com/bower/decompress-zip",
      "description": "Unzip"
    },
    {
      "name": "pako",
      "url": "https://github.com/nodeca/pako",
      "description": "High speed zlib port to pure js (deflate, inflate, gzip)"
    },
    {
      "name": "tar-stream",
      "url": "https://github.com/mafintosh/tar-stream",
      "description": "Streaming tar parser and generator"
    },
    {
      "name": "decompress",
      "url": "https://github.com/kevva/decompress",
      "description": "A pluggable decompression module with support for `tar`, `tar"
    }
  ],
  "Network": [
    {
      "name": "get-port",
      "url": "https://github.com/sindresorhus/get-port",
      "description": "Get an available port"
    },
    {
      "name": "ipify",
      "url": "https://github.com/sindresorhus/ipify",
      "description": "Get your public IP address"
    },
    {
      "name": "getmac",
      "url": "https://github.com/bevry/getmac",
      "description": "Get the computer MAC address"
    }
  ],
  "Database": [
    {
      "name": "LevelUP",
      "url": "https://github.com/rvagg/node-levelup",
      "description": "LevelDB"
    },
    {
      "name": "MongoDB",
      "url": "https://github.com/mongodb/node-mongodb-native",
      "description": "MongoDB driver"
    },
    {
      "name": "PostgreSQL",
      "url": "https://github.com/brianc/node-postgres",
      "description": "PostgreSQL client"
    },
    {
      "name": "MySQL",
      "url": "https://github.com/felixge/node-mysql",
      "description": "MySQL client"
    },
    {
      "name": "Redis",
      "url": "https://github.com/luin/ioredis",
      "description": "Redis client"
    },
    {
      "name": "Bookshelf",
      "url": "http://bookshelfjs.org",
      "description": "ORM for PostgreSQL, MySQL and SQLite3 in the style of Backbone"
    },
    {
      "name": "Mongoose",
      "url": "http://mongoosejs.com",
      "description": "Elegant MongoDB object modeling"
    },
    {
      "name": "Sequelize",
      "url": "https://github.com/sequelize/sequelize",
      "description": "Multi-dialect ORM"
    },
    {
      "name": "Waterline",
      "url": "https://github.com/balderdashy/waterline",
      "description": "Datastore-agnostic tool that dramatically simplifies interaction with one or more databases"
    },
    {
      "name": "Iridium",
      "url": "https://github.com/SierraSoftworks/Iridium",
      "description": "A high performance MongoDB ORM with support for promises, distributed caching, preprocessing, validation and plugins"
    },
    {
      "name": "OpenRecord",
      "url": "https://github.com/PhilWaldmann/openrecord",
      "description": "ORM for PostgreSQL, MySQL, SQLite3 and RESTful datastores"
    },
    {
      "name": "orm2",
      "url": "https://github.com/dresende/node-orm2",
      "description": "ORM for PostgreSQL, MariaDB, MySQL, Amazon Redshift, SQLite, MongoDB"
    },
    {
      "name": "firenze",
      "url": "https://github.com/fahad19/firenze",
      "description": "Adapter-based ORM for MySQL, Memory, Redis, localStorage and more"
    },
    {
      "name": "Knex",
      "url": "http://knexjs.org",
      "description": "A query builder for PostgreSQL, MySQL and SQLite3, designed to be flexible, portable, and fun to use"
    },
    {
      "name": "NeDB",
      "url": "https://github.com/louischatriot/nedb",
      "description": "Embedded persistent database written in JavaScript"
    }
  ],
  "Testing": [
    {
      "name": "AVA",
      "url": "https://ava.li",
      "description": "Futuristic test runner"
    },
    {
      "name": "tap",
      "url": "https://github.com/isaacs/node-tap",
      "description": "A TAP test framework"
    },
    {
      "name": "tape",
      "url": "https://github.com/substack/tape",
      "description": "TAP-producing test harness"
    },
    {
      "name": "Mocha",
      "url": "http://mochajs.org",
      "description": "A feature-rich test framework making asynchronous testing simple and fun"
    },
    {
      "name": "Mochify",
      "url": "https://github.com/mantoni/mochify.js",
      "description": "TDD with Browserify, Mocha, PhantomJS and WebDriver"
    },
    {
      "name": "trevor",
      "url": "https://github.com/vdemedes/trevor",
      "description": "Run tests against multiple versions of Node"
    },
    {
      "name": "loadtest",
      "url": "https://github.com/alexfernandez/loadtest",
      "description": "Run load tests for your web application, with an API for automation"
    },
    {
      "name": "istanbul",
      "url": "https://github.com/gotwarlost/istanbul",
      "description": "A code coverage tool that computes statement, line, function and branch coverage with module loader hooks to transparently add coverage when running tests"
    },
    {
      "name": "nyc",
      "url": "https://github.com/bcoe/nyc",
      "description": "Code coverage tool built on istanbul that works with subprocesses"
    },
    {
      "name": "Sinon.JS",
      "url": "https://github.com/cjohansen/Sinon.JS",
      "description": "Test spies, stubs and mocks"
    },
    {
      "name": "navit",
      "url": "https://github.com/nodeca/navit",
      "description": "PhantomJS / SlimerJS wrapper to simplify browser test scripting"
    },
    {
      "name": "nock",
      "url": "https://github.com/pgte/nock",
      "description": "HTTP mocking and expectations"
    },
    {
      "name": "intern",
      "url": "https://github.com/theintern/intern",
      "description": "A next-generation code testing stack for JavaScript"
    },
    {
      "name": "toxy",
      "url": "https://github.com/h2non/toxy",
      "description": "Hackable HTTP proxy to simulate failure scenarios and network conditions"
    }
  ],
  "Benchmarking": [
    {
      "name": "Benchmark.js",
      "url": "http://benchmarkjs.com",
      "description": "A robust benchmarking library that works on nearly all JavaScript platforms, supports high-resolution timers, and returns statistically significant results"
    },
    {
      "name": "matcha",
      "url": "https://github.com/logicalparadox/matcha",
      "description": "A caffeine-driven, simplistic approach to benchmarking"
    }
  ],
  "Minifiers": [
    {
      "name": "UglifyJS2",
      "url": "http://lisperator.net/uglifyjs/",
      "description": "JavaScript minifier"
    },
    {
      "name": "clean-css",
      "url": "https://github.com/GoalSmashers/clean-css",
      "description": "CSS minifier"
    },
    {
      "name": "minimize",
      "url": "https://github.com/Moveo/minimize",
      "description": "HTML minifier"
    },
    {
      "name": "imagemin",
      "url": "https://github.com/kevva/imagemin",
      "description": "Image minifier"
    }
  ],
  "Authentication": [
    {
      "name": "Passport",
      "url": "http://passportjs.org",
      "description": "Simple, unobtrusive authentication"
    },
    {
      "name": "everyauth",
      "url": "https://github.com/bnoguchi/everyauth",
      "description": "Authentication and authorization (password, Facebook, etc) for your Connect and Express apps"
    },
    {
      "name": "passwordless",
      "url": "https://passwordless.net",
      "description": "Token-based authentication middleware for Express allowing authentication without passwords"
    },
    {
      "name": "Lockit",
      "url": "https://github.com/zemirco/lockit",
      "description": "Full featured authentication solution for Express"
    },
    {
      "name": "Grant",
      "url": "https://github.com/simov/grant",
      "description": "OAuth middleware for Express, Koa, and Hapi"
    }
  ],
  "Email": [
    {
      "name": "Nodemailer",
      "url": "https://github.com/andris9/Nodemailer",
      "description": "The fastest way to handle email"
    },
    {
      "name": "emailjs",
      "url": "https://github.com/eleith/emailjs",
      "description": "Send text/HTML emails with attachments to any SMTP server"
    }
  ],
  "Node.js management": [
    {
      "name": "n",
      "url": "https://github.com/visionmedia/n",
      "description": "Node"
    },
    {
      "name": "nave",
      "url": "https://github.com/isaacs/nave",
      "description": "Virtual Environments for Node"
    },
    {
      "name": "nodeenv",
      "url": "https://github.com/ekalinin/nodeenv",
      "description": "A Node"
    },
    {
      "name": "nvm for Windows",
      "url": "https://github.com/coreybutler/nvm-windows",
      "description": "Version management for Windows"
    }
  ],
  "Polyfills": [
    {
      "name": "set-immediate-shim",
      "url": "https://github.com/sindresorhus/set-immediate-shim",
      "description": "Simple `setImmediate()` ponyfill"
    },
    {
      "name": "path-is-absolute",
      "url": "https://github.com/sindresorhus/path-is-absolute",
      "description": "Node"
    },
    {
      "name": "os-tmpdir",
      "url": "https://github.com/sindresorhus/os-tmpdir",
      "description": "Node"
    },
    {
      "name": "os-homedir",
      "url": "https://github.com/sindresorhus/os-homedir",
      "description": "Node"
    },
    {
      "name": "debug-log",
      "url": "https://github.com/sindresorhus/debug-log",
      "description": "Node"
    },
    {
      "name": "buffer-equals",
      "url": "https://github.com/sindresorhus/buffer-equals",
      "description": "Node"
    },
    {
      "name": "buf-indexof",
      "url": "https://github.com/sindresorhus/buf-indexof",
      "description": "Node"
    },
    {
      "name": "buf-compare",
      "url": "https://github.com/sindresorhus/buf-compare",
      "description": "Node"
    },
    {
      "name": "fs-access",
      "url": "https://github.com/sindresorhus/fs-access",
      "description": "Node"
    },
    {
      "name": "exec-file-sync",
      "url": "https://github.com/sindresorhus/exec-file-sync",
      "description": "Node"
    },
    {
      "name": "child-process-ctor",
      "url": "https://github.com/sindresorhus/child-process-ctor",
      "description": "Node"
    },
    {
      "name": "node-status-codes",
      "url": "https://github.com/sindresorhus/node-status-codes",
      "description": "Node"
    },
    {
      "name": "exit-code",
      "url": "https://github.com/isaacs/exit-code",
      "description": "Node"
    },
    {
      "name": "core-assert",
      "url": "https://github.com/sindresorhus/core-assert",
      "description": "Node"
    },
    {
      "name": "deep-strict-equal",
      "url": "https://github.com/sindresorhus/deep-strict-equal",
      "description": "Test for deep equality - Node"
    },
    {
      "name": "object-assign",
      "url": "https://github.com/sindresorhus/object-assign",
      "description": "ES2015 `Object"
    },
    {
      "name": "pinkie-promise",
      "url": "https://github.com/floatdrop/pinkie-promise",
      "description": "ES2015 `Promise` ponyfill"
    },
    {
      "name": "harmony-reflect",
      "url": "https://github.com/tvcutsem/harmony-reflect",
      "description": "ES2015 `Reflect` and `Proxy` polyfill"
    },
    {
      "name": "es6-shim",
      "url": "https://github.com/paulmillr/es6-shim",
      "description": "Collection of ES2015 polyfills"
    }
  ],
  "Natural language processing": [
    {
      "name": "retext",
      "url": "https://github.com/wooorm/retext",
      "description": "An extensible natural language system"
    },
    {
      "name": "franc",
      "url": "https://github.com/wooorm/franc",
      "description": "Detect the language of text"
    },
    {
      "name": "leven",
      "url": "https://github.com/sindresorhus/leven",
      "description": "Measure the difference between two strings using the Levenshtein distance algorithm"
    },
    {
      "name": "natural",
      "url": "https://github.com/NaturalNode/natural",
      "description": "A general natural language facility"
    }
  ],
  "Process management": [
    {
      "name": "PM2",
      "url": "https://github.com/Unitech/pm2",
      "description": "Advanced Process Manager"
    },
    {
      "name": "node-windows",
      "url": "https://github.com/coreybutler/node-windows",
      "description": "Run scripts as a native Windows service and log to the Event viewer"
    },
    {
      "name": "node-mac",
      "url": "https://github.com/coreybutler/node-mac",
      "description": "Run scripts as a native Mac daemon and log to the console app"
    },
    {
      "name": "node-linux",
      "url": "https://github.com/coreybutler/node-linux",
      "description": "Run scripts as native system service and log to syslog"
    },
    {
      "name": "forever",
      "url": "https://github.com/nodejitsu/forever",
      "description": "A simple CLI tool for ensuring that a given script runs continuously (i"
    },
    {
      "name": "supervisor",
      "url": "https://github.com/isaacs/node-supervisor",
      "description": "Restart scripts when they crash or restart when a `*"
    },
    {
      "name": "Phusion Passenger",
      "url": "https://www.phusionpassenger.com/node_weekly",
      "description": "Friendly process manager that integrates directly into Nginx"
    },
    {
      "name": "naught",
      "url": "https://github.com/andrewrk/naught",
      "description": "Process manager with zero downtime deployment"
    }
  ],
  "Automation": [
    {
      "name": "robotjs",
      "url": "https://github.com/octalmage/robotjs",
      "description": " Desktop Automation: control the mouse, keyboard and read the screen"
    }
  ],
  "AST": [
    {
      "name": "Acorn",
      "url": "https://github.com/marijnh/acorn",
      "description": "A tiny, fast JavaScript parser"
    },
    {
      "name": "Rocambole",
      "url": "https://github.com/millermedeiros/rocambole",
      "description": "Recursively walk and transform JavaScript AST"
    }
  ],
  "Static site generators": [
    {
      "name": "Metalsmith",
      "url": "http://www.metalsmith.io",
      "description": "An extremely simple, pluggable static site generator"
    },
    {
      "name": "Wintersmith",
      "url": "http://wintersmith.io",
      "description": "Flexible, minimalistic, multi-platform static site generator"
    },
    {
      "name": "Assemble",
      "url": "http://assemble.io",
      "description": "Static site generator for Node"
    },
    {
      "name": "DocPad",
      "url": "https://github.com/docpad/docpad",
      "description": "Static site generator with dynamic abilities and huge plugin ecosystem"
    }
  ],
  "Content management systems": [
    {
      "name": "KeystoneJS",
      "url": "http://keystonejs.com",
      "description": "CMS and web application platform built on Express and MongoDB"
    },
    {
      "name": "Calipso",
      "url": "http://calip.so",
      "description": "A simple content management system, built along similar themes to Drupal and Wordpress, that is designed to be fast, flexible and simple"
    },
    {
      "name": "Apostrophe2",
      "url": "http://apostrophenow.org",
      "description": "A content management system with an emphasis on intuitive front end content editing and administration built on Express and MongoDB"
    }
  ],
  "Forum": [
    {
      "name": "nodeBB",
      "url": "https://nodebb.org",
      "description": "A better forum platform for the modern web"
    }
  ],
  "Blogging": [
    {
      "name": "ghost",
      "url": "https://ghost.org",
      "description": "Simple, powerful publishing platform that allows you to share your story with the world"
    },
    {
      "name": "Hexo",
      "url": "http://hexo.io",
      "description": "Fast, simple and powerful blogging framework"
    }
  ],
  "Weird": [
    {
      "name": "superb",
      "url": "https://github.com/sindresorhus/superb",
      "description": "Get superb like words"
    },
    {
      "name": "cat-names",
      "url": "https://github.com/sindresorhus/cat-names",
      "description": "Get popular cat names"
    },
    {
      "name": "dog-names",
      "url": "https://github.com/sindresorhus/dog-names",
      "description": "Get popular dog names"
    },
    {
      "name": "superheroes",
      "url": "https://github.com/sindresorhus/superheroes",
      "description": "Get superhero names"
    },
    {
      "name": "supervillains",
      "url": "https://github.com/sindresorhus/supervillains",
      "description": "Get supervillain names"
    },
    {
      "name": "cool-ascii-faces",
      "url": "https://github.com/maxogden/cool-ascii-faces",
      "description": "Get some cool ascii faces"
    }
  ],
  "Miscellaneous": [
    {
      "name": "nodebots",
      "url": "http://nodebots.io",
      "description": "Robots powered by JavaScript"
    },
    {
      "name": "node-module-boilerplate",
      "url": "https://github.com/sindresorhus/node-module-boilerplate",
      "description": "Boilerplate to kickstart creating a node module"
    },
    {
      "name": "generator-nm",
      "url": "https://github.com/sindresorhus/generator-nm",
      "description": "Scaffold out a node module"
    }
  ],
  "Tutorials": [
    {
      "name": "Nodeschool",
      "url": "http://nodeschool.io",
      "description": "Learn Node"
    },
    {
      "name": "The Art of Node",
      "url": "https://github.com/maxogden/art-of-node/#the-art-of-node",
      "description": "An introduction to Node"
    },
    {
      "name": "stream-handbook",
      "url": "https://github.com/substack/stream-handbook",
      "description": "How to write Node"
    },
    {
      "name": "browserify-handbook",
      "url": "https://github.com/substack/browserify-handbook",
      "description": "The definitive guide for browserify"
    },
    {
      "name": "module-best-practices",
      "url": "https://github.com/mattdesl/module-best-practices",
      "description": "Some good practices when writing new npm modules"
    }
  ],
  "Discovery": [
    {
      "name": "node-modules.com",
      "url": "http://node-modules.com",
      "description": "An alternative npm search engine with a more intelligent and personal results ranking"
    }
  ],
  "Newsletters": [
    {
      "name": "node weekly",
      "url": "http://nodeweekly.com",
      "description": "Weekly e-mail round-up of Node"
    },
    {
      "name": "nmotw",
      "url": "http://nmotw.in",
      "description": "Node Module Of The Week, weekly dose of hand picked node modules"
    }
  ],
  "Videos": [
    {
      "name": "Introduction to Node.js with Ryan Dahl",
      "url": "https://www.youtube.com/watch?v=jo_B4LTHi3I)- [LearnAllTheNodes](http://www.learnallthenodes.com",
      "description": "Series of useful tips, tricks, and packages"
    },
    {
      "name": "Introduction to Node.js Fundamentals",
      "url": "http://strongloop.com/node-js/videos/#a-video-intro-to-nodejs-fundamentals)- [Hands on with Node.js](https://learn.bevry.me/node/preface)- [Full Streams Ahead](http://dry.ly/full-streams-ahead",
      "description": "Introduction to streams"
    },
    {
      "name": "StrongLoop Talks",
      "url": "https://strongloop.com/node-js/videos/",
      "description": "Series of talks"
    }
  ],
  "Blogs": [
    {
      "name": "Node.js blog",
      "url": "http://blog.nodejs.org)- [HowToNode](http://howtonode.org",
      "description": "Teaching how to do various tasks in Node"
    }
  ],
  "Cheatsheets": [
    {
      "name": "Express.js",
      "url": "https://github.com/azat-co/cheatsheets/blob/master/express4/index.md)- [Stream FAQs](https://github.com/stephenplusplus/stream-faqs",
      "description": "Answering common questions about streams, covering pagination, events, and more"
    }
  ],
  "Tools": [
    {
      "name": "GitHub Linker",
      "url": "https://chrome.google.com/webstore/detail/github-linker/jlmafbaeoofdegohdhinkhilhclaklkp",
      "description": "Chrome extension that linkifies dependencies in package"
    },
    {
      "name": "npm-hub",
      "url": "https://chrome.google.com/webstore/detail/npm-hub/kbbbjimdjbjclaebffknlabpogocablj",
      "description": "Chrome extension to display npm dependencies at the bottom of a repo's readme"
    },
    {
      "name": "RequireBin",
      "url": "http://requirebin.com",
      "description": "Shareable JavaScript programs powered by npm and browserify"
    },
    {
      "name": "Tonic",
      "url": "http://blog.tonicdev.com/2015/09/30/embedded-tonic.html",
      "description": "Embed a Node"
    }
  ]
};
}, {}],
3: [function(require, module, exports) {
module.exports = {
  "Platforms": [
    {
      "name": "Node.js",
      "url": "https://github.com/sindresorhus/awesome-nodejs"
    },
    {
      "name": "Frontend Development",
      "url": "https://github.com/dypsilon/frontend-dev-bookmarks"
    },
    {
      "name": "iOS",
      "url": "https://github.com/vsouza/awesome-ios"
    },
    {
      "name": "Android",
      "url": "https://github.com/JStumpp/awesome-android"
    },
    {
      "name": "IoT & Hybrid Apps",
      "url": "https://github.com/weblancaster/awesome-IoT-hybrid"
    },
    {
      "name": "Electron",
      "url": "https://github.com/sindresorhus/awesome-electron"
    },
    {
      "name": "Cordova",
      "url": "https://github.com/busterc/awesome-cordova"
    },
    {
      "name": "React Native",
      "url": "https://github.com/jondot/awesome-react-native"
    },
    {
      "name": "Xamarin",
      "url": "https://github.com/benoitjadinon/awesome-xamarin"
    },
    {
      "name": "Linux",
      "url": "https://github.com/aleksandar-todorovic/awesome-linux"
    },
    {
      "name": "OS X",
      "url": "https://github.com/iCHAIT/awesome-osx"
    },
    {
      "name": "Command-Line",
      "url": "https://github.com/herrbischoff/awesome-osx-command-line"
    },
    {
      "name": "watchOS",
      "url": "https://github.com/yenchenlin1994/awesome-watchos"
    },
    {
      "name": "JVM",
      "url": "https://github.com/deephacks/awesome-jvm"
    },
    {
      "name": "Salesforce",
      "url": "https://github.com/mailtoharshit/awesome-salesforce"
    },
    {
      "name": "Amazon Web Services",
      "url": "https://github.com/donnemartin/awesome-aws"
    },
    {
      "name": "Windows",
      "url": "https://github.com/RiseLedger/awesome-windows"
    }
  ],
  "Programming Languages": [
    {
      "name": "JavaScript",
      "url": "https://github.com/sorrycc/awesome-javascript"
    },
    {
      "name": "Promises",
      "url": "https://github.com/wbinnssmith/awesome-promises"
    },
    {
      "name": "Swift",
      "url": "https://github.com/matteocrippa/awesome-swift"
    },
    {
      "name": "Python",
      "url": "https://github.com/vinta/awesome-python"
    },
    {
      "name": "Rust",
      "url": "https://github.com/kud1ing/awesome-rust"
    },
    {
      "name": "Haskell",
      "url": "https://github.com/krispo/awesome-haskell"
    },
    {
      "name": "PureScript",
      "url": "https://github.com/passy/awesome-purescript"
    },
    {
      "name": "Go",
      "url": "https://github.com/avelino/awesome-go"
    },
    {
      "name": "Scala",
      "url": "https://github.com/lauris/awesome-scala"
    },
    {
      "name": "Ruby",
      "url": "https://github.com/markets/awesome-ruby"
    },
    {
      "name": "Ruby Events",
      "url": "https://github.com/planetruby/awesome-events"
    },
    {
      "name": "Clojure",
      "url": "https://github.com/razum2um/awesome-clojure"
    },
    {
      "name": "ClojureScript",
      "url": "https://github.com/emrehan/awesome-clojurescript"
    },
    {
      "name": "Elixir",
      "url": "https://github.com/h4cc/awesome-elixir"
    },
    {
      "name": "Elm",
      "url": "https://github.com/isRuslan/awesome-elm"
    },
    {
      "name": "Erlang",
      "url": "https://github.com/drobakowski/awesome-erlang"
    },
    {
      "name": "Julia",
      "url": "https://github.com/svaksha/Julia.jl"
    },
    {
      "name": "Lua",
      "url": "https://github.com/LewisJEllis/awesome-lua"
    },
    {
      "name": "C",
      "url": "https://github.com/aleksandar-todorovic/awesome-c"
    },
    {
      "name": "C/C++",
      "url": "https://github.com/fffaraz/awesome-cpp"
    },
    {
      "name": "R",
      "url": "https://github.com/qinwf/awesome-R"
    },
    {
      "name": "D",
      "url": "https://github.com/zhaopuming/awesome-d"
    },
    {
      "name": "Common Lisp",
      "url": "https://github.com/CodyReichert/awesome-cl"
    },
    {
      "name": "Perl",
      "url": "https://github.com/hachiojipm/awesome-perl"
    },
    {
      "name": "Groovy",
      "url": "https://github.com/kdabir/awesome-groovy"
    },
    {
      "name": "Dart",
      "url": "https://github.com/yissachar/awesome-dart"
    },
    {
      "name": "Java",
      "url": "https://github.com/akullpp/awesome-java"
    },
    {
      "name": "OCaml",
      "url": "https://github.com/rizo/awesome-ocaml"
    },
    {
      "name": "Coldfusion",
      "url": "https://github.com/seancoyne/awesome-coldfusion"
    },
    {
      "name": "Fortran",
      "url": "https://github.com/rabbiabram/awesome-fortran"
    },
    {
      "name": ".NET",
      "url": "https://github.com/quozd/awesome-dotnet"
    },
    {
      "name": "PHP",
      "url": "https://github.com/ziadoz/awesome-php"
    },
    {
      "name": "Delphi",
      "url": "https://github.com/Fr0sT-Brutal/awesome-delphi"
    },
    {
      "name": "Assembler",
      "url": "https://github.com/mat0thew/awesome-asm"
    },
    {
      "name": "AutoHotkey",
      "url": "https://github.com/ahkscript/awesome-AutoHotkey"
    },
    {
      "name": "AutoIt",
      "url": "https://github.com/J2TeaM/awesome-AutoIt"
    },
    {
      "name": "Crystal",
      "url": "https://github.com/veelenga/awesome-crystal"
    },
    {
      "name": "TypeScript",
      "url": "https://github.com/dzharii/awesome-typescript"
    }
  ],
  "Front-end Development": [
    {
      "name": "JavaScript Must Watch Talks",
      "url": "https://github.com/bolshchikov/js-must-watch"
    },
    {
      "name": "ES6 Tools",
      "url": "https://github.com/addyosmani/es6-tools"
    },
    {
      "name": "Web Performance Optimization",
      "url": "https://github.com/davidsonfellipe/awesome-wpo"
    },
    {
      "name": "Web Tools",
      "url": "https://github.com/lvwzhen/tools"
    },
    {
      "name": "Critical-Path (Above-the-fold) CSS Tools",
      "url": "https://github.com/addyosmani/critical-path-css-tools"
    },
    {
      "name": "React",
      "url": "https://github.com/enaqx/awesome-react"
    },
    {
      "name": "Web Components",
      "url": "https://github.com/mateusortiz/webcomponents-the-right-way"
    },
    {
      "name": "Polymer",
      "url": "https://github.com/Granze/awesome-polymer"
    },
    {
      "name": "Angular 2",
      "url": "https://github.com/angular-class/awesome-angular2"
    },
    {
      "name": "Angular",
      "url": "https://github.com/gianarb/awesome-angularjs"
    },
    {
      "name": "Backbone",
      "url": "https://github.com/instanceofpro/awesome-backbone"
    },
    {
      "name": "HTML5",
      "url": "https://github.com/diegocard/awesome-html5"
    },
    {
      "name": "SVG",
      "url": "https://github.com/willianjusten/awesome-svg"
    },
    {
      "name": "Canvas",
      "url": "https://github.com/raphamorim/awesome-canvas"
    },
    {
      "name": "KnockoutJS",
      "url": "https://github.com/dnbard/awesome-knockout"
    },
    {
      "name": "Dojo Toolkit",
      "url": "https://github.com/peterkokot/awesome-dojo"
    },
    {
      "name": "Inspiration",
      "url": "https://github.com/NoahBuscher/Inspire"
    },
    {
      "name": "Ember",
      "url": "https://github.com/nmec/awesome-ember"
    },
    {
      "name": "Android UI",
      "url": "https://github.com/wasabeef/awesome-android-ui"
    },
    {
      "name": "iOS UI",
      "url": "https://github.com/cjwirth/awesome-ios-ui"
    },
    {
      "name": "Scalable CSS",
      "url": "https://github.com/davidtheclark/scalable-css-reading-list"
    },
    {
      "name": "Meteor",
      "url": "https://github.com/Urigo/awesome-meteor"
    },
    {
      "name": "BEM",
      "url": "https://github.com/sturobson/BEM-resources"
    },
    {
      "name": "CSS Must-Watch Talks",
      "url": "https://github.com/AllThingsSmitty/must-watch-css"
    },
    {
      "name": "Flexbox",
      "url": "https://github.com/afonsopacifer/awesome-flexbox"
    },
    {
      "name": "Web Typography",
      "url": "https://github.com/deanhume/typography"
    },
    {
      "name": "Web Accessibility",
      "url": "https://github.com/brunopulis/awesome-a11y"
    },
    {
      "name": "Material Design",
      "url": "https://github.com/sachin1092/awesome-material"
    },
    {
      "name": "CSS",
      "url": "https://github.com/sotayamashita/awesome-css"
    },
    {
      "name": "D3",
      "url": "https://github.com/wbkd/awesome-d3"
    },
    {
      "name": "Emails",
      "url": "https://github.com/jonathandion/awesome-emails"
    },
    {
      "name": "jQuery",
      "url": "https://github.com/peterkokot/awesome-jquery"
    },
    {
      "name": "Web Audio",
      "url": "https://github.com/notthetup/awesome-webaudio"
    },
    {
      "name": "Offline-First",
      "url": "https://github.com/pazguille/offline-first"
    }
  ],
  "Back-end Development": [
    {
      "name": "Django",
      "url": "https://github.com/rosarior/awesome-django"
    },
    {
      "name": "Flask",
      "url": "https://github.com/humiaozuzu/awesome-flask"
    },
    {
      "name": "Docker",
      "url": "https://github.com/veggiemonk/awesome-docker"
    },
    {
      "name": "Vagrant",
      "url": "https://github.com/iJackUA/awesome-vagrant"
    },
    {
      "name": "Pyramid",
      "url": "https://github.com/ITCase/awesome-pyramid"
    },
    {
      "name": "Play1 Framework",
      "url": "https://github.com/PerfectCarl/awesome-play1"
    },
    {
      "name": "CakePHP",
      "url": "https://github.com/friendsofcake/awesome-cakephp"
    },
    {
      "name": "Symfony2",
      "url": "https://github.com/EmanueleMinotto/awesome-symfony2"
    },
    {
      "name": "Laravel",
      "url": "https://github.com/chiraggude/awesome-laravel"
    },
    {
      "name": "Rails",
      "url": "https://github.com/ekremkaraca/awesome-rails"
    },
    {
      "name": "Rails Gem",
      "url": "https://github.com/hothero/awesome-rails-gem"
    },
    {
      "name": "Phalcon",
      "url": "https://github.com/sergeyklay/awesome-phalcon"
    },
    {
      "name": "Useful `.htaccess` Snippets",
      "url": "https://github.com/phanan/htaccess"
    },
    {
      "name": "nginx",
      "url": "https://github.com/fcambus/nginx-resources"
    },
    {
      "name": "Dropwizard",
      "url": "https://github.com/stve/awesome-dropwizard"
    }
  ],
  "Computer Science": [
    {
      "name": "University Courses",
      "url": "https://github.com/prakhar1989/awesome-courses"
    },
    {
      "name": "Data Science",
      "url": "https://github.com/okulbilisim/awesome-datascience"
    },
    {
      "name": "Machine Learning",
      "url": "https://github.com/josephmisiti/awesome-machine-learning"
    },
    {
      "name": "Speech and Natural Language Processing",
      "url": "https://github.com/edobashira/speech-language-processing"
    },
    {
      "name": "Linguistics",
      "url": "https://github.com/theimpossibleastronaut/awesome-linguistics"
    },
    {
      "name": "Cryptography",
      "url": "https://github.com/MaciejCzyzewski/retter"
    },
    {
      "name": "Computer Vision",
      "url": "https://github.com/jbhuang0604/awesome-computer-vision"
    },
    {
      "name": "Deep Learning",
      "url": "https://github.com/ChristosChristofidis/awesome-deep-learning"
    },
    {
      "name": "Deep Vision",
      "url": "https://github.com/kjw0612/awesome-deep-vision"
    },
    {
      "name": "Open Source Society University",
      "url": "https://github.com/open-source-society/computer-science"
    }
  ],
  "Big Data": [
    {
      "name": "Big Data",
      "url": "https://github.com/onurakpolat/awesome-bigdata"
    },
    {
      "name": "Public Datasets",
      "url": "https://github.com/caesar0301/awesome-public-datasets"
    },
    {
      "name": "Hadoop",
      "url": "https://github.com/youngwookim/awesome-hadoop"
    },
    {
      "name": "Data Engineering",
      "url": "https://github.com/igorbarinov/awesome-data-engineering"
    }
  ],
  "Theory": [
    {
      "name": "Papers We Love",
      "url": "https://github.com/papers-we-love/papers-we-love"
    },
    {
      "name": "Talks",
      "url": "https://github.com/JanVanRyswyck/awesome-talks"
    },
    {
      "name": "Algorithms",
      "url": "https://github.com/tayllan/awesome-algorithms"
    },
    {
      "name": "Algorithm Visualizations",
      "url": "https://github.com/enjalot/algovis"
    },
    {
      "name": "Artificial Intelligence",
      "url": "https://github.com/owainlewis/awesome-artificial-intelligence"
    },
    {
      "name": "Search Engine Optimization",
      "url": "https://github.com/marcobiedermann/search-engine-optimization"
    }
  ],
  "Books": [
    {
      "name": "Free Programming Books",
      "url": "https://github.com/vhf/free-programming-books"
    },
    {
      "name": "Free Software Testing Books",
      "url": "https://github.com/ligurio/free-software-testing-books/blob/master/free-software-testing-books.md"
    },
    {
      "name": "Go Books",
      "url": "https://github.com/dariubs/GoBooks"
    },
    {
      "name": "R Books",
      "url": "https://github.com/RomanTsegelskyi/rbooks"
    },
    {
      "name": "Mind Expanding Books",
      "url": "https://github.com/hackerkid/Mind-Expanding-Books"
    }
  ],
  "Editors": [
    {
      "name": "Sublime Text",
      "url": "https://github.com/dreikanter/sublime-bookmarks"
    },
    {
      "name": "Vim",
      "url": "http://vimawesome.com"
    },
    {
      "name": "Emacs",
      "url": "https://github.com/emacs-tw/awesome-emacs"
    },
    {
      "name": "Atom",
      "url": "https://github.com/mehcode/awesome-atom"
    }
  ],
  "Gaming": [
    {
      "name": "Game Development",
      "url": "https://github.com/ellisonleao/magictools"
    },
    {
      "name": "Game Talks",
      "url": "https://github.com/hzoo/awesome-gametalks"
    },
    {
      "name": "Godot",
      "url": "https://github.com/Calinou/awesome-godot"
    },
    {
      "name": "Open Source Games",
      "url": "https://github.com/leereilly/games"
    }
  ],
  "Developer Environment": [
    {
      "name": "Quick Look Plugins",
      "url": "https://github.com/sindresorhus/quick-look-plugins"
    },
    {
      "name": "Dev Env",
      "url": "https://github.com/jondot/awesome-devenv"
    },
    {
      "name": "Dotfiles",
      "url": "https://github.com/webpro/awesome-dotfiles"
    },
    {
      "name": "Shell",
      "url": "https://github.com/alebcay/awesome-shell"
    },
    {
      "name": "ZSH Plugins",
      "url": "https://github.com/unixorn/awesome-zsh-plugins"
    },
    {
      "name": "Browser Extensions for GitHub",
      "url": "https://github.com/stefanbuck/awesome-browser-extensions-for-github"
    },
    {
      "name": "Git Cheat Sheet",
      "url": "https://github.com/arslanbilal/git-cheat-sheet"
    },
    {
      "name": "Git Tips",
      "url": "https://github.com/git-tips/tips"
    },
    {
      "name": "Git Add-ons",
      "url": "https://github.com/stevemao/awesome-git-addons"
    }
  ],
  "Entertainment": [
    {
      "name": "Science Fiction",
      "url": "https://github.com/sindresorhus/awesome-scifi"
    },
    {
      "name": "Fantasy",
      "url": "https://github.com/RichardLitt/awesome-fantasy"
    },
    {
      "name": "Podcasts",
      "url": "https://github.com/guipdutra/awesome-geek-podcasts"
    },
    {
      "name": "Email Newsletters",
      "url": "https://github.com/vredniy/awesome-newsletters"
    }
  ],
  "Databases": [
    {
      "name": "Database",
      "url": "https://github.com/numetriclabz/awesome-db"
    },
    {
      "name": "MySQL",
      "url": "https://github.com/shlomi-noach/awesome-mysql/blob/gh-pages/index.md"
    },
    {
      "name": "SQLAlchemy",
      "url": "https://github.com/dahlia/awesome-sqlalchemy"
    },
    {
      "name": "InfluxDB",
      "url": "https://github.com/mark-rushakoff/awesome-influxdb"
    },
    {
      "name": "Neo4j",
      "url": "https://github.com/GraphGeeks/awesome-neo4j"
    }
  ],
  "Resources": [
    {
      "name": "Creative Commons Media",
      "url": "https://github.com/shime/creative-commons-media"
    },
    {
      "name": "Images",
      "url": "https://github.com/heyalexej/awesome-images"
    },
    {
      "name": "Fonts",
      "url": "https://github.com/brabadu/awesome-fonts"
    },
    {
      "name": "Codeface",
      "url": "https://github.com/chrissimpkins/codeface"
    }
  ],
  "Learn": [
    {
      "name": "CLI Workshoppers/Adventures",
      "url": "https://github.com/therebelrobot/awesome-workshopper"
    },
    {
      "name": "Learn to Program",
      "url": "https://github.com/karlhorky/learn-to-program"
    },
    {
      "name": "Speaking",
      "url": "https://github.com/matteofigus/awesome-speaking"
    },
    {
      "name": "Tech Videos",
      "url": "https://github.com/lucasviola/awesome-tech-videos"
    }
  ],
  "Security": [
    {
      "name": "Application Security",
      "url": "https://github.com/paragonie/awesome-appsec"
    },
    {
      "name": "Security",
      "url": "https://github.com/sbilly/awesome-security"
    },
    {
      "name": "CTF",
      "url": "https://github.com/apsdehal/awesome-ctf"
    },
    {
      "name": "Malware Analysis",
      "url": "https://github.com/rshipp/awesome-malware-analysis"
    },
    {
      "name": "Android Security",
      "url": "https://github.com/ashishb/android-security-awesome"
    },
    {
      "name": "Hacking",
      "url": "https://github.com/carpedm20/awesome-hacking"
    },
    {
      "name": "Honeypots",
      "url": "https://github.com/paralax/awesome-honeypots"
    }
  ],
  "Miscellaneous": [
    {
      "name": "JSON",
      "url": "https://github.com/burningtree/awesome-json"
    },
    {
      "name": "Discounts for Student Developers",
      "url": "https://github.com/najela/discount-for-student-dev"
    },
    {
      "name": "Slack",
      "url": "https://github.com/matiassingers/awesome-slack"
    },
    {
      "name": "Conferences",
      "url": "https://github.com/RichardLitt/awesome-conferences"
    },
    {
      "name": "GeoJSON",
      "url": "https://github.com/tmcw/awesome-geojson"
    },
    {
      "name": "Sysadmin",
      "url": "https://github.com/n1trux/awesome-sysadmin"
    },
    {
      "name": "Radio",
      "url": "https://github.com/kyleterry/awesome-radio"
    },
    {
      "name": "Awesome",
      "url": "https://github.com/sindresorhus/awesome"
    },
    {
      "name": "Analytics",
      "url": "https://github.com/onurakpolat/awesome-analytics"
    },
    {
      "name": "FOSS for Developers",
      "url": "https://github.com/httpsGithubParty/FOSS-for-Dev"
    },
    {
      "name": "GitHub Cheat Sheet",
      "url": "https://github.com/tiimgreen/github-cheat-sheet"
    },
    {
      "name": "Open Companies",
      "url": "https://github.com/opencompany/awesome-open-company"
    },
    {
      "name": "REST",
      "url": "https://github.com/marmelab/awesome-rest"
    },
    {
      "name": "Selenium",
      "url": "https://github.com/christian-bromann/awesome-selenium"
    },
    {
      "name": "Endangered Languages",
      "url": "https://github.com/RichardLitt/endangered-languages"
    },
    {
      "name": "Slack Communities",
      "url": "https://github.com/filipelinhares/awesome-slack"
    },
    {
      "name": "Continuous Delivery",
      "url": "https://github.com/ciandcd/awesome-ciandcd"
    },
    {
      "name": "Services Engineering",
      "url": "https://github.com/mmcgrana/services-engineering"
    },
    {
      "name": "Free for Developers",
      "url": "https://github.com/ripienaar/free-for-dev"
    },
    {
      "name": "Bitcoin",
      "url": "https://github.com/igorbarinov/awesome-bitcoin/"
    },
    {
      "name": "Answers",
      "url": "https://github.com/jugoncalves/awesome-answers"
    },
    {
      "name": "Sketch",
      "url": "https://github.com/diessica/awesome-sketch"
    },
    {
      "name": "Places to Post Your Startup",
      "url": "https://github.com/mmccaff/PlacesToPostYourStartup"
    },
    {
      "name": "Maintainance Modules",
      "url": "https://github.com/maxogden/maintenance-modules"
    },
    {
      "name": "PCAPTools",
      "url": "https://github.com/caesar0301/awesome-pcaptools"
    },
    {
      "name": "Remote Jobs",
      "url": "https://github.com/lukasz-madon/awesome-remote-job"
    },
    {
      "name": "Boilerplate Projects",
      "url": "https://github.com/melvin0008/awesome-projects-boilerplates"
    },
    {
      "name": "Mad Science Modules",
      "url": "https://github.com/feross/awesome-mad-science"
    },
    {
      "name": "Readme",
      "url": "https://github.com/matiassingers/awesome-readme"
    },
    {
      "name": "Tools",
      "url": "https://github.com/cjbarber/ToolsOfTheTrade"
    },
    {
      "name": "Styleguides",
      "url": "https://github.com/RichardLitt/awesome-styleguides"
    },
    {
      "name": "Blogs",
      "url": "https://github.com/aleksandar-todorovic/awesome-blogs"
    },
    {
      "name": "Design and Development Guides",
      "url": "https://github.com/NARKOZ/guides"
    },
    {
      "name": "Software Engineering Blogs",
      "url": "https://github.com/kilimchoi/engineering-blogs"
    },
    {
      "name": "Self Hosted",
      "url": "https://github.com/Kickball/awesome-selfhosted"
    },
    {
      "name": "FOSS Production Apps",
      "url": "https://github.com/jwaterfaucett/awesome-foss-apps"
    },
    {
      "name": "Gulp",
      "url": "https://github.com/alferov/awesome-gulp"
    },
    {
      "name": "AMA",
      "url": "https://github.com/sindresorhus/amas"
    },
    {
      "name": "AMA-answers",
      "url": "https://github.com/stoeffel/awesome-ama-answers"
    },
    {
      "name": "GIF",
      "url": "https://github.com/ibaaj/awesome-gif"
    },
    {
      "name": "Open Source Photography",
      "url": "https://github.com/ibaaj/awesome-OpenSourcePhotography/"
    },
    {
      "name": "OpenGL",
      "url": "https://github.com/eug/awesome-opengl"
    },
    {
      "name": "JavaScript Standard Style",
      "url": "https://github.com/feross/awesome-standard"
    },
    {
      "name": "Productivity",
      "url": "https://github.com/jyguyomarch/awesome-productivity"
    },
    {
      "name": "GraphQL",
      "url": "https://github.com/chentsulin/awesome-graphql"
    },
    {
      "name": "Transit",
      "url": "https://github.com/luqmaan/awesome-transit"
    },
    {
      "name": "Research Tools",
      "url": "https://github.com/emptymalei/awesome-research"
    },
    {
      "name": "Niche Job Boards",
      "url": "https://github.com/wfhio/awesome-job-boards"
    },
    {
      "name": "Data Visualization",
      "url": "https://github.com/fasouto/awesome-dataviz"
    },
    {
      "name": "Social Media Share Links",
      "url": "https://github.com/vinkla/share-links"
    },
    {
      "name": "JSON Datasets",
      "url": "https://github.com/jdorfman/awesome-json-datasets"
    },
    {
      "name": "Microservices",
      "url": "https://github.com/mfornos/awesome-microservices"
    },
    {
      "name": "GitHub",
      "url": "https://github.com/phillipadsmith/awesome-github"
    },
    {
      "name": "Unicode Code Points",
      "url": "https://github.com/Codepoints/awesome-codepoints"
    },
    {
      "name": "Internet of Things",
      "url": "https://github.com/HQarroum/awesome-iot"
    },
    {
      "name": "Open Source Documents",
      "url": "https://github.com/nacyot/awesome-opensource-documents"
    },
    {
      "name": "Umbraco",
      "url": "https://github.com/leekelleher/awesome-umbraco"
    }
  ]
};
}, {}]}, {}, {"1":""})