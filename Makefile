#/bin/bash

ifneq (,$(wildcard .env))
	include .env
endif

DOCKER=docker-compose

# Caso executado fora do container, adiciona o comando de execução do docker
ifeq (,$(wildcard /.dockerenv))
ifeq ($(NODE_ENV),test)
	DOCKER_EXEC=$(DOCKER) exec -T app
else
	DOCKER_EXEC=$(DOCKER) exec app
endif
endif

up:
	$(DOCKER) up -d --remove-orphans --force-recreate

down:
	$(DOCKER) down

install:
	$(DOCKER_EXEC) yarn install

start:
	$(DOCKER_EXEC) yarn start

reactotron:
	xhost local:root
	$(DOCKER_EXEC) Reactotron >> /dev/null 2>&1

bash:
	$(DOCKER_EXEC) bash
