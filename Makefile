# Shell to use for running scripts
SHELL := $(shell which bash)

SERVICE_NAME := app
USER_APP_NAME := user

# Test if the dependencies we need to run this Makefile are installed
DOCKER := $(shell command -v docker)
DOCKER_COMPOSE := $(shell command -v docker-compose)

.PHONY: default
default:
ifndef DOCKER
	@echo "Docker is not available. Please install docker"
	@exit 1
endif
ifndef DOCKER_COMPOSE
	@echo "docker-compose is not available. Please install docker-compose"
	@exit 1
endif

.PHONY: deps
deps: npm-install

# NPM
.PHONY: npm-install
npm-install: CMD=install

.PHONY: npm-update
npm-update: CMD=update

.PHONY: npm-dep
npm-dep: CMD=install $(package)

.PHONY: npm-dev
npm-dev: CMD=install -D $(package)

.PHONY: npm-uninstall
npm-uninstall: CMD=uninstall $(package)

.PHONY: npm
npm npm-install npm-update npm-dep npm-dev npm-uninstall:
	docker-compose run --rm $(SERVICE_NAME) bash -c 'npm $(CMD)'

# Lint project
.PHONY: lint
lint:
	@docker-compose run --rm $(SERVICE_NAME) bash -c 'npm run lint'

# Build project
.PHONY: build
build:
	@docker-compose run --rm $(SERVICE_NAME) bash -c 'npm run build'

# Run tests
.PHONY: test
test: build
	@docker-compose run --rm $(SERVICE_NAME) bash -c 'npm run test'

# Start user backend app
.PHONY: start-user-backend
start-user-backend: build
	@docker-compose up $(USER_APP_NAME)-backend && docker-compose down

# Clean workspace folders
.PHONY: clean-workspace
clean-workspace:
	@rm -rf .tmp dist logs node_modules

# Docker
# Clean containers, images not defined, volumes and networks
.PHONY: clean
clean:
	@docker-compose down --rmi local -v --remove-orphans

# Start databases containers in background
.PHONY: start-database
start-database:
	@docker-compose up -d mongodb
