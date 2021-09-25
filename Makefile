SHELL := /bin/bash # Use bash syntax

args = $(filter-out $@,$(MAKECMDGOALS))
DK_BASE_CMD = docker
DC_BASE_CMD = docker-compose --file docker-compose.yml
RAILS_CMD = /usr/src/app/bin/rails

down:
	$(DC_BASE_CMD) down

up: down
	$(DC_BASE_CMD) up -d --build

test:
	$(DC_BASE_CMD) exec app yarn test
