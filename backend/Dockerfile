FROM openjdk:17-jdk-slim
EXPOSE 9093
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} pesatone.jar
ENTRYPOINT ["java","-jar","/pesatone.jar"]
