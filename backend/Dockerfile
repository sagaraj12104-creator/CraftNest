# Stage 1: Build Java Spring Boot JAR
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run Java Spring Boot Application
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/handmade-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
