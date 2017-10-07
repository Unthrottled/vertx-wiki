FROM gradle:alpine as packager
MAINTAINER Alex Simons "alexsimons9999@gmail.com"
USER root
WORKDIR /app
ADD ./build.gradle ./
ADD ./grade.properties ./
ADD ./settings.gradle ./
RUN gradle --refresh-dependencies

ADD . .

ENTRYPOINT ["gradle", "clean", "run"]



