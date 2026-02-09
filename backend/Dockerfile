FROM openjdk:17-jdk-slim
EXPOSE 9093
VOLUME /tmp
COPY target/*.jar pesatone.jar
ENTRYPOINT ["java","-jar","/pesatone.jar"]

