# Build stage
FROM maven:3.8.3-openjdk-17 AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests

# Package stage
FROM eclipse-temurin:17-jre-alpine
COPY --from=build /home/app/target/*.jar app.jar
EXPOSE 8080
ENV JAVA_OPTS="-XX:+ParallelRefProcEnabled -Djava.security.egd=file:/dev/./urandom --add-modules java.se --add-exports java.base/jdk.internal.ref=ALL-UNNAMED --add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/sun.nio.ch=ALL-UNNAMED --add-opens java.management/sun.management=ALL-UNNAMED --add-opens jdk.management/com.sun.management.internal=ALL-UNNAMED"
ENTRYPOINT exec java $JAVA_OPTS -jar /app.jar

