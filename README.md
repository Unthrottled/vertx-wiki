= Wiki
----
## Using Vert.x!

#### Live Demo! [http://wiki.acari.io](http://wiki.acari.io)

#### Bare Minimum, to run the sample you will need:
 - Internet Connection (At least the first time it is run)
 - [Docker](https://www.docker.com/)
 - [Docker Compose](https://docs.docker.com/compose/) (needs to support version 3 compose files)
 
With the root of this repository as your present working directory, run the following command:

`docker-compose up`

When you see something like

     web-service_1  | 2017-10-12 20:48:20 INFO  HttpVerticle:112 - Server listening on port 8989
     web-service_1  | 2017-10-12 20:48:20 INFO  HttpVerticle:112 - Server listening on port 8989
     web-service_1  | 2017-10-12 20:48:20 INFO  VertxLauncher:30 - STARTED

Point your browser at http://localhost

Now you should be able to add a user!
Provided your user has the proper permissions, you should be able to create a page!


## FOR DEVELOPMENT SETUP

If you want to take advantage of live frontend code updates, then here's you go about getting this project set up!

-[NodeJs](https://nodejs.org/en/) 8.6.0

This project needs node, in order to install all of the node modules locally.
This is so that we can run webpack on watch.
Which spins up a browsersync server, that serves content, watches for local code changes, and proxys all REST API requests to the Vertx web service!

To make things easier, I have provided a compose file that will do this all for you!

In order to create local node modules, all you have to do is run this command (provided you have brought down any pre-existing compose project by running `docker-compose down`):

`docker-compose -f docker-compose-build.yml up`

If you do not want to do that then you can do this:
1. Make sure that you have Node 8.6.0
1. Make the angular4 directory your present working directory in a command line.
1. Run 'npm install'
1. ????
1. Profit!!

Okay, now that we have a node_modules directory as a direct child of the angular4 directory, we can get to spinning up our environment.

The command we are looking for, (with the root of this repo as the present working directory [PWD])

`docker-compose -f docker-compose-dev.yml up`

Once you see this scroll by 

        web-content_1  | [Browsersync] Serving files from: dist
        web-content_1  | [Browsersync] Couldn't open browser (if you are using BrowserSync in a headless environment, you might want to set the open option to false)

Point your browser at http://localhost:3000 and enjoy developing with live code changes!

As a side note, any changes in typscript files will _not_ re-trigger the recompliation of the code for some reason.
So any typscript changes will require a re-complilation.

This can be achieved by running `npm run compile` in the angular4 directory. 
If you want to do it the docker way, you can just run the build image (created from the build step) with 
the entry point as `npm` and the command options as `run compile`

ex `docker run --rm -v /path/to/repo/vertx-wiki/angluar4/:/app --entrypoint=npm alexsimons/nodebuild run compile`

There is also a `deploy` node task that will compile all of the typescript, make webpack bundle all of the dependincies and then the artifacts into the 
webroot directory in the resources directory of the web-service project (eg vertx-wiki/web-service/src/main/resources/webroot).

Which will allow for the Vertx HTTP verticle to serve static web content and also provide a REST API.