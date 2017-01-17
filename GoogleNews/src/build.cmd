call "C:\Program Files\nodejs\nodevars.bat" > build.log
call npm config set proxy http://genproxy.amdocs.com:8080

call npm config set https-proxy http://genproxy.amdocs.com:8080

set http_proxy=http://genproxy.amdocs.com:8080

set https_proxy=http://genproxy.amdocs.com:8080

call npm install  >> build.log

call npm update >> build.log

call npm install grunt-cli -g >> build.log

call npm install bower -g >> build.log

call bower install >> build.log

call bower update >> build.log

rem call ../build/build.cmd ../build/build.xml updateLocalNPM >> build.log

call grunt build >> build.log

rem call grunt serve >> build.log
