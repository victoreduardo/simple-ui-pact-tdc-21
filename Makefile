SHELL := /bin/bash # Use bash syntax

args = $(filter-out $@,$(MAKECMDGOALS))
DK_BASE_CMD = docker
DC_BASE_CMD = docker-compose --file docker-compose.yml
RAILS_CMD = /usr/src/app/bin/rails

down:
	$(DC_BASE_CMD) down

up: down
	$(DC_BASE_CMD) up -d --build

bash:
	$(DC_BASE_CMD) exec app /bin/sh --login

test:
	$(DC_BASE_CMD) exec app yarn test

pact_test:
	$(DC_BASE_CMD) exec app yarn pact:test

pact_ublish:
    $(DC_BASE_CMD) exec app npm run pact:publish
