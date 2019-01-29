.DEFAULT_GOAL := help
.SILENT:

## Colors
COLOR_RESET   = \033[0m
COLOR_INFO    = \033[32m
COLOR_COMMENT = \033[33m

## Help
help:
	printf "${COLOR_COMMENT}Usage:${COLOR_RESET}\n"
	printf " make [target]\n\n"
	printf "${COLOR_COMMENT}Available targets:${COLOR_RESET}\n"
	awk '/^[a-zA-Z\-\_0-9\.@]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf " ${COLOR_INFO}%-16s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

##################
# Useful targets #
##################

## Install all install_* requirements and launch project.
install: env_file install_vendor env_run

## Run project, install vendors
run: env_run install_vendor

## Stop project.
stop:
	docker-compose stop

## Down project and remove volumes (databases).
down:
	docker-compose down -v --remove-orphans

## Run all quality assurance tools (tests and code inspection).
qa: code_correct test

########
# Code #
########

## Run eslint to correct violations of a defined coding project standards.
code_correct:
	docker-compose run --rm ui_app eslint src/**/*.js src/**/*.jsx --fix

###############
# Environment #
###############

## Set default environment variables by copying env.dist file as .env.
env_file:
	cp .env.dist .env

## Launch docker environment.
env_run:
	docker-compose up -d

###########
# Install #
###########

## Install vendors.
install_vendor:
	docker-compose run --rm ui_app yarn install

########
# Test#
########

## Run unit&integration tests
test:
	docker-compose run --rm ui_app yarn test
