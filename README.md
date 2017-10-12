= Wiki
----
## Using Vert.x!

#### Bare Minimum, to run the sample you will need:
 - Internet Connection (At least the first time it is run)
 - Docker
 - Docker-compose (needs to support version 3 compose files)




needs node, needs to install node modules locally. 
make note of node task that deploys minified code to the resources dir of web service.



Because the application plugin is being used, you may directly run the application:

    gradle run


The build.gradle uses the Gradle shadowJar plugin to assemble the application and all it's dependencies into a single "fat" jar.

To build the "fat jar"

    ./gradlew shadowJar


You may also run the fat jar as a standalone runnable jar:

    java -jar build/libs/gradle-simplest-3.4.2-fat.jar

(You can take that jar and run it anywhere there is a Java 8+ JDK. It contains all the dependencies it needs so you
don't need to install Vert.x on the target machine).

Now point your browser at http://localhost:8989
