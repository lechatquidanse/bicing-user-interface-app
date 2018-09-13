ifndef NODE_ENV
include .env
endif

install:
	cp .env.dist .env
	docker-compose up -d --build
	docker-compose run --rm node yarn install

run:
	docker-compose up -d
	docker-compose run --rm node yarn install

down:
	docker-compose down -v --remove-orphans

qa:
	docker-compose run --rm node yarn test

