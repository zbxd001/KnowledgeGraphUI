FROM openjdk:8u262-jre-slim-buster
ADD ./target/COIN.jar /Backend-COIN/COIN.jar
ADD runboot.sh /Backend-COIN/
WORKDIR /Backend-COIN
RUN chmod a+x runboot.sh
CMD /Backend-COIN/runboot.sh