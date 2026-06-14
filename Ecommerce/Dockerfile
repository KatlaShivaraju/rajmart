FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw || true
RUN ./mvnw clean install -Dmaven.test.skip=true || mvn clean install -Dmaven.test.skip=true

EXPOSE 8080

CMD sh -c "java -jar $(find target -name '*.jar' ! -name '*original*' | head -n 1)"