= Wiki
----
## Using Vert.x!

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

Point your browser at http://localhost:8989

Now you should be able to add a user!
Provided your user has the proper permissions, you should be able to create a page!


## FOR DEVELOPMENT SETUP

If you want to take advantage of live frontend code updates, then here's you go about getting this project set up!

-[NodeJs](https://nodejs.org/en/) 8.6.0

This project needs node, in order to install all of the node modules locally.
This is so that we can run webpack on watch.
Which spins up a browsersync server, that serves content, watches for local code changes, and proxys all REST API requests to the Vertx web service!





make note of node task that deploys minified code to the resources dir of web service (which is build).
