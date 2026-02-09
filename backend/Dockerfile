FROM openjdk:17-jdk-slim
RUN apk update && apk add --no-cache tzdata
ENV TZ=Africa/Kigali
RUN addgroup -S pesatone && adduser -S pesatone -G pesatone
USER pesatone:pesatone
EXPOSE 9093
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} pesatone.jar
ENTRYPOINT ["java","-jar","/pesatone.jar"]
