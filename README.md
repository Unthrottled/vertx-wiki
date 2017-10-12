= Wiki
----
## Using Vert.x!

#### Bare Minimum, to run the sample you will need:
 - Internet Connection (At least the first time it is run)
 - Docker
 - Docker-compose (needs to support version 3 compose files)
 
With the root of this repository run the following command.

`docker-compose up`

When you see something like

     web-service_1  | 2017-10-12 20:48:20 INFO  HttpVerticle:112 - Server listening on port 8989
     web-service_1  | 2017-10-12 20:48:20 INFO  HttpVerticle:112 - Server listening on port 8989
     web-service_1  | 2017-10-12 20:48:20 INFO  VertxLauncher:30 - STARTED

Point your browser at http://localhost:8989

Now you should be able to add a user!
Provided your user has the proper permissions, you should be able to create a page!


## FOR DEVELOPMENT SETUP

-NODE 8.6.0

needs node, needs to install node modules locally. 
make note of node task that deploys minified code to the resources dir of web service (which is build).
