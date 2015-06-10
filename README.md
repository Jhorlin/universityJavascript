#Functional Programming

##Dependenicies
* [nodejs](nodejs.org)
* [bower](bower.io)
    * Install bower using npm after installing node
    ```bash
    npm -g install bower
    ```
    
##Steup
After installing nodejs and bower clone this repo and in the root folder of this project run
```bash
npm install
```
and
```bash
bower install
```
When all is done run
```
node app.js
```
to start the service.

##HELP
By default this demo will bind to port 80 but in the root folder open [.env](https://github.com/Jhorlin/universityJavascript/blob/master/.env#L1) and change your port.

#What to look for
The client code can be found in the [components/draw folder](https://github.com/Jhorlin/universityJavascript/tree/master/components/draw).
The server code is in [app.js](https://github.com/Jhorlin/universityJavascript/blob/master/app.js)


