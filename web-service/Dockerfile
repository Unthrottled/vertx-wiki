FROM gradle:alpine as packager
MAINTAINER Alex Simons "alexsimons9999@gmail.com"
USER root
WORKDIR /app

#Cache gradle dependencies, will only run if any of these files changes
ADD ./build.gradle ./
ADD ./grade.properties ./
ADD ./settings.gradle ./
RUN gradle --refresh-dependencies


#Add rest of source code :)
ADD . .

ENTRYPOINT ["gradle", "clean", "run"]



