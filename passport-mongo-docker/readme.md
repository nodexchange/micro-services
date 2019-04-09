docker-compose up
docker-compose build

==
// app
$ docker-compose exec app bash

// mongo
$ docker-compose exec mongo bash

// bind mongo docker to local: 
// -d (detached meaning it will run sillently)
docker run -d --restart=always --name mongo -v mongo:/data/db -p 27017:27017 mongo:3.6 --auth
// list containers
docker ps
docker ps -l
docker images
// kill process 
docker kill [name] i.e. docker kill mongo

// docker removed
docker system prune -a

example:
 docker run -p 27017:27017 --name mongo2 mongo:3.6 --auth --bind_ip_all

 docker run --name my-mongo -p 127.0.0.1:27017:27017 mongo:3.6