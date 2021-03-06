  **i-flicks**
===================

**Video sharing** website and application. 

----------

Overview
--------

i-flicks pulls together several components to give a full, open source video sharing application.  

i-flicks is intended for small teams or individuals who want a stand alone video presentation system.  It will work with a few hundred or low thousands of videos and a handful of concurrent viewers.  i-flicks originated from a desire to share family videos hosted on a home server and I couldn't find a fully featured Node implementation.

As of the time of writing this, i-flicks is still in active developmnent and the version number reflects API changes (semantic versioning), not production stability.  Database changes should be additive between versions and so new versions won't overwrite your existing videos unless you switch between SQL Server and NEDB or your uploads directory is inside your node_modules folder!).

If you are interested in a larger installation or new features please get in touch as that's the best way to make it happen.  

See [i-flicks.com](https://i-flicks.com/) for the working example.

<a href="https://twitter.com/i_flicks" class="twitter-follow-button" data-show-count="false">Follow @i_flicks</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

Getting started
---------------

> You should be able to get i-flicks up and running with no programming experience but you will find a basic understanding of Javascript and Node.js useful.

### Quick start (for those who think they know what they are doing)
Create a Node app and pass the i-flicks object to the HTTP server then start the app.

	var settings = {
    ffmpegPath: '/usr/bin/ffmpeg',
    ffprobePath:  '/usr/bin/ffprobe',
    flvMetaPath:  '/usr/bin/flvmeta',
    uploadPath: '/var/uploads/i-flicks',
		mediaPath: '/var/uploads/i-flicks',
    sessionSecret: 'my secret',
    baseURL: 'http://localhost:3000/',
		databaseType: 'nedb',
		usersCanCreateAccount: true
	 };
	var http = require('http');
	var server = http.createServer(require('i-flicks')(settings));

	server.listen(3000, function() {
		var addr = this.address();
		console.log('i-flicks server is listening on %s:%d', addr.address, addr.port);
	});


 > node app.js 

### Detailed install
**Ubuntu Linux**

Install Node.js, NPM ImageMagick, Git and FLVMeta.

	curl -sL https://deb.nodesource.com/setup | sudo bash -

	or

	curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -

	sudo apt-get install nodejs -y

	sudo apt-get install git -y

	sudo apt-get install graphicsmagick -y

	sudo apt-get install flvmeta -y

Install FFmpeg

	sudo add-apt-repository ppa:mc3man/trusty-media

	sudo apt-get update

	sudo apt-get dist-upgrade  ?? not really required ??

	sudo apt-get install ffmpeg -y
> **Note:** because of licencing restrictions, you can get better sound quality and browser compatibility by compiling FFmpeg from source.  i-flicks works with the standard download.

**Windows**
The default settings and latest installs of the following packages should all work.

* Download and install [Node.js](https://nodejs.org/) (this will install NPM too)  

* Download and install [Git](https://git-scm.com/downloads)

* Download and install [GraphicsMagick ](http://www.graphicsmagick.org/download.html)

* Download and install [FLVMeta](http://www.flvmeta.com/)

* Download and install [FFMpeg](https://www.ffmpeg.org/download.html)

**For all operating systems**
Create a folder for your new project on your computer and move to that folder.  
run: 

npm install i-flicks

	Check the runOnce file exists.  Sometimes we forget to rename it before deploying to NPM.  If it doesn't then rename the .done file:  
	cd node_modules/i-flicks/views  
	mv runOnce.done.hbs runOnce.hbs *OR* rename runOnce.done.hbs runOnce.hbs  

There is currently a bug in Fluent-FFmpeg which means videos in portrait mode cause a crash.  
Open file below your install folder at ./node_modults/i-flicks/node_modules/fluent_ffmpeg/lib/ffprobe.js  
Add  "lines = lines.filter(Boolean);" to line 15.
Check the [Github issue](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/404) for updates.

		
Create a node application, create a "settings" object with paths to the software installed above and require i-flicks....  
For example, add this to a file called app.js

	var settings = {
	    ffmpegPath: '/usr/bin/ffmpeg',
	    ffprobePath:  '/usr/bin/ffprobe',
	    flvMetaPath:  '/usr/bin/flvmeta',
	    databasePath: '',
	    uploadPath: '/var/uploads/i-flicks',
	    mediaPath: '/var/uploads/i-flicks',
	    sessionSecret: 'enter your secret here',
	    env: 'production', // development or production. 
  		css: 'white.css' // white.css or black_yellow.css

	 };
	var iflicks = require('i-flicks')(settings);
	var http = require('http');
	var server = http.createServer(iflicks);

	server.listen(3000, function() {
		var addr = this.address();
		console.log('i-flicks server is listening on %s:%d', addr.address, addr.port);
	});


run:  
node app.js

Open a browser and navigate to http://localhost:3000

**How to listen on port 80**  
Node.js requires elevated privileges or root access to listen on port 80 or 443.  It isn't a good idea to do this and so something needs to forward requests to port 80 onto the Node.js port.  IPTables or Nginx both work. 
IPTables is quicker to setup as it is installed on most Linux distrubutions.  Nginx works on Windows and Linux and adds a bit more flexibility.

**What about io.js, HTTPS, SPDY or HTTP2?**  
i-flicks works with other io.js amd alternative HTTP modules.  None have been production tested but all work when tested as a Friday afternoon bit of fun.

Settings
--------
The settings object options are as follows:

Setting	 | Default	| Purpose
-------- | --------	| ---------
databasePath	| ""	| Path to database file storage.  Defaults to nothing and so uses the root of your application.
ffmpegPath | "/"	| Path to the ffmpeg executable. For example, 'C:/Program Files/ffmpeg/bin/ffmpeg.exe' (note the forward slashes) or '/usr/bin/ffmpeg')
ffprobePath	| "/"	| Path to the ffprobe executable
flvMetaPath	| "/"	| Path to the FLVMeta executable
maxFFmpegInatances	| 1	| Number of copies of FFmpeg to run at once.  If the encoding server only runs FFmpeg and has lots of processor cores then this can be high, otherwise leave it at 1 or 2.
uploadPath	| "/"	| Where to store uploaded files
mediaPath	| "/"	| Where to store encoded media files
statsDServer | undefined	| If you have a StatsD server then i-flicks can log various metrics to it.
statsDDebug	| undefined		| StatsD debug flag.
statsDPrefix	| undefined	| Text prefix for statsD log metric names.
cssPath | undefined	| Absolute path to a file used to override the default stylesheet.
css | white.css 	| Built in style skins.  Values are white.css and black_yellow.css.
env	| development	| Environment variable.  Overrides NODE_ENV for this application.  If not set then uses NODE_ENV.  Values are development and production.
mailgunKey	| undefined	| If using [MailGun](https://www.mailgin.com/) (free option available) then this is the key provided.
mailgunDomain	| undefined	| Mailgun domain.
gmailUsername	| undefined	| If using GMail then this is the username used to logon to GMail.  Note that GMail is only suitable for small volumes of mail and Google may block the account.  It is not the recommended option but it is an easy one to get started.
gmailPassword	| undefined	| If using GMail then this is the password used to logon to GMail.
mailFrom	| me@example.com	| From address used when sending emails.
googleAnalyticsId	| undefined	| Your Google Analytics ID.  It looks something like UA-12345678-1.
sessionSecret	| undefined	| A random phrase to encypt the session information.
usersCanCreateAccount	| false	| People visiting can create their own account.  Otherwise it must be created via the toolbox.
Linux permissions
--------
sudo -i  
<enter password>
chown -R www-data:www-data /var/www  
chmod go-rwx /var/www  
chmod go+x /var/www  
chgrp -R www-data /var/www  
chmod -R go-rwx /var/www  
chmod -R g+rx /var/www  
chmod -R g+rwx /var/www  

chown -R www-data:www-data /var/uploads/i-flicks  

Credit goes to http://fideloper.com/user-group-permissions-chmod-apache for this.

More
--------
If you use i-flicks or would like to see a specific feature please drop Nick an email at contact@i-flicks.com.  He would love to hear what you are doing.

i-flicks has a "Send" feature which allows videos to be sent from one installation to another.  If you are logged in and view a video this option is available at the bottom of the video.

Errors can be viewed, users created and all sorts of other things via http://localhost:3000/toolbox.  You need to be logged in otherwise it will just redirect you to the home page.

i-flicks will remember the previous volume and postion in a video for logged in users.

