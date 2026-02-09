FROM maven:3.8.3-openjdk-17 AS build
# Set the working directory in the container
WORKDIR /app
# Copy the pom.xml and the project files to the container
COPY pom.xml .
COPY src ./src
# Build the application using Maven
RUN mvn clean package -DskipTests
# Use an official OpenJDK image as the base image
FROM openjdk:17-jdk-slim

EXPOSE 9093
# Set the working directory in the container
WORKDIR /app
# Copy the built JAR file from the previous stage to the container
COPY /app/target/*.jar pesatone.jar
# Set the command to run the application
ENTRYPOINT ["java","-jar","/pesatone.jar"]

#FROM openjdk:17-jdk-slim
#EXPOSE 9093
#VOLUME /tmp
#COPY target/*.jar pesatone.jar
#ENTRYPOINT ["java","-jar","/pesatone.jar"]

