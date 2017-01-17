#!/bin/bash

if [ "$NODEJS_HOME" = "" ]
then
	export NODEJS_HOME=/usr/local64/node-v0.12.7-linux-x64
fi

if [ "$NODEJS_PROXY" = "" ]
then
		export NODEJS_PROXY=http://genproxy.amdocs.com:8080
fi

echo $NODEJS_HOME
echo $NODEJS_PROXY

$NODEJS_HOME/bin/npm config set proxy $NODEJS_PROXY
echo "step 1"
$NODEJS_HOME/bin/npm config set https-proxy $NODEJS_PROXY
echo "step 2"
export http_proxy=$NODEJS_PROXY
echo "step 3"
export https_proxy=$NODEJS_PROXY 
echo "step 4"
$NODEJS_HOME/bin/npm install
echo "step 5"
$NODEJS_HOME/bin/npm update
echo "step 6"
echo $NODEJS_HOME/bin/bower install
echo "step 7"
echo $NODEJS_HOME/bin/bower update
echo "step 8"
echo "NPM with JAVA: ${JAVA_HOME}"
echo "NPM with ANT_HOME: ${ANT_HOME}"
ANT_COMMAND="$JAVA_HOME/bin/java -Xms256m -Xmx1024m org.apache.tools.ant.Main -f ../build/build.xml updateLocalNPM"
echo $ANT_COMMAND
echo "step 9"
$NODEJS_HOME/bin/grunt build
echo "step 10"
