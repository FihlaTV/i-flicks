var settings = {};

settings.nedbPath = ''; /// Note: this needs the trailing slash if it is used.
settings.uploadPath = 'C:/Nick/Mercurial/nodejs/iflicks/uploads';
settings.mediaPath = 'C:/Nick/Mercurial/nodejs/iflicks/uploads';
settings.ffmpegPath = 'C:/program Files/ffmpeg/bin/ffmpeg.exe';
settings.ffprobePath = 'C:/program Files/ffmpeg/bin/ffprobe.exe';
settings.flvMetaPath = 'C:/program Files/ffmpeg/bin/flvmeta.exe';
settings.mailFrom = 'me@example.com';
settings.usersCanCreateAccount = true;
settings.css = 'white.css';
settings.showErrorsInConsole = true;
settings.databaseType = 'nedb';
settings.sessionSecret = 'madame dragon ran a school many moons ago';
settings.mailgunKey = '';
settings.mailgunDomain = '';
settings.baseURL = '';

settings.maxFFmpegInsatances = 1;
settings.runOnce = true;

module.exports = settings;