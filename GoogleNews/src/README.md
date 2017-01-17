#NXT#

##For Ubuntu##
```shell
# Giving rights to the current user
USER=`whoami`;sudo chown -R $USER .

chmod +x install-requirements.sh
# The last time when you need `sudo`#
sudo sh install-requirements.sh

chmod +x build.sh
# Run this script every time after `git pull`#
./build.sh
```

####Commands####
`grunt docs` build and show docs  
`grunt serve` run development server    
`grunt serve:test` run development server and tests simultaneously    
`grunt test` run tests  
`grunt build` build project to the `./dist` directory