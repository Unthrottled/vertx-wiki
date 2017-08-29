#!/bin/bash
gradle clean shadowJar
java -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8990 -jar build/libs/vertx-wiki-0.0.1-fat.jar run io.acari.starter.VertxLauncher
