#!/bin/bash
gradle clean shadowJar
java -jar build/libs/vertx-wiki-0.0.1-fat.jar run io.acari.starter.VertxLauncher
