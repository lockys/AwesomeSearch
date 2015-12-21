Awesome search
==
[![Build Status](https://travis-ci.org/lockys/awesome-search.svg?branch=gh-pages)](https://travis-ci.org/lockys/awesome-search) ![](https://img.shields.io/badge/version-1.0.0-green.svg)  
A website which makes you access the [awesome](https://github.com/sindresorhus/awesome) lists more quickly.  
Original Github Page: [http://lockys.github.io/awesome-search/](http://lockys.github.io/awesome-search/)  

[https://awesomelists.top](https://awesomelists.top)  
The domain name has been changed to `https://awesomelists.top` from `http://awesomelists.me/` now.  
The original domain name `http://awesomelists.me/` is provided by [@aleksandar-todorovic](https://github.com/aleksandar-todorovic), thanks!

##### Under development
Awesome Search is under construction, more features will come out. Also, **bugs** and **inconveniences** may exit.  
Stay tuned, and you can [file](https://github.com/lockys/awesome-search/issues) any questions to help this project become better :smile:

![screenshot](http://g.recordit.co/LkyiGw1q6c.gif)

Why
==
In a nutshell, there are many awesome lists in the world :)    
We hope to build an application to access them more quickly.  
That's why `awesome search` was born. :octocat:

Features
==
 - [x] Access and search every awesome repo collected in [sindresorhus/awesome](https://github.com/sindresorhus/awesome) in one page quickly.
 - [x] Access an awesome repo by `https://awesomelists.top/#repos/sindresorhus/awesome-nodejs`. (yuo can bookmark it!)
 - [x] Categories of an awesome repo is supported if the that repo uses `headings`.
 - [x] Use Github API to retrieve README file of an awesome repo, so it's up-to-date.
 - [x] Search links in a specified repo we have parsed, see [supported repo](#supported-awesome-lists)

Supported awesome lists
==
Currently, searching `links` in most of awesome repositories is supported.    
You can see the JSON format of links [here](https://github.com/lockys/awesome.json/tree/master/output).(Contribution is welcome)  
We build [awesomelists-index](https://github.com/John-Lin/awesomelists-index) to parse these lists. However, we are still finding a more efficient way.  
[awesome.json](https://github.com/lockys/awesome.json) is the place where the data store for now.

Acceptance testing
==
We make some acceptance tests for the Web. To run the testing **Ruby** is required.

Install dependency package
```sh
bundle install
```

Run testing
```sh
rake spec
```


Collaborator(s)
==
- [lockys](https://github.com/lockys)
- [John-Lin](https://github.com/John-Lin)

Contributors
==
Thank you, [contributors](https://github.com/lockys/awesome-search/graphs/contributors)

Contributions
==
Welcome to contribute :)  
Please refer to [contribution.md](contribution.md)    
Filing a issue to make suggestions or complain anything is always welcome.

Related Projects
==
- [John-Lin/awesomelists-index](https://github.com/John-Lin/awesomelists-index)
- [lockys/awesome.json](https://github.com/lockys/awesome.json)

Credit
==
Thanks all awesome authors for creating these awesome lists to make the world better.  
- [sindresorhus/awesome](https://github.com/sindresorhus/awesome)  
- [All awesome list contributors](https://github.com/sindresorhus/awesome/graphs/contributors)  
![awesome](http://i.imgur.com/qcroMhk.gif)

LICENSE
==
The MIT License (MIT)

Copyright (c) 2015 Hao-Wei Jeng, Che-Wei Lin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/lockys/awesome-search/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

