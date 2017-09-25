FROM gradle:alpine as packager
MAINTAINER Alex Simons "alexsimons9999@gmail.com"
USER root
WORKDIR /app
ADD . .
RUN gradle --refresh-dependencies
ENTRYPOINT ["gradle", "clean", "run"]



