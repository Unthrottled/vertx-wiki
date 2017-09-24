FROM gradle:alpine as packager
MAINTAINER Alex Simons "alexsimons9999@gmail.com"
USER root
WORKDIR /app
ADD . .
ENTRYPOINT ["gradle", "clean", "run"]



