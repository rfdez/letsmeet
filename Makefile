# Shell to use for running scripts
SHELL := $(shell which bash)

IMAGE_NAME := rfdez/letsmeet
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

.PHONY: npm
npm npm-install npm-update npm-dep npm-dev: build-image
	docker-compose run --rm $(SERVICE_NAME) bash -c 'npm $(CMD)'

# Lint project
.PHONY: lint
lint: build-image
	docker-compose run --rm $(SERVICE_NAME) bash -c 'npm run lint'

.PHONY: build
build: build-image
	docker-compose run --rm $(SERVICE_NAME) bash -c 'npm run build'

# Run tests
test: build
	docker-compose run --rm $(SERVICE_NAME) bash -c 'npm run test'

# Start user backend app
.PHONY: start-user-backend
start-user-backend: build
	docker-compose up $(USER_APP_NAME)-backend && docker-compose down

# Docker
.PHONY: build-image
build-image:
	docker build -t $(IMAGE_NAME):dev .

.PHONY: clean
clean:
	docker-compose down --rmi local -v --remove-orphans
