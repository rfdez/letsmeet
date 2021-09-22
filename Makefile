# Shell to use for running scripts
SHELL := $(shell which bash)

IMAGE_NAME := rfdez/letsmeet
SERVICE_NAME := app
MEETING_APP_NAME := meeting

# Test if the dependencies we need to run this Makefile are installed
DOCKER := $(shell command -v docker)
DOCKER_COMPOSE := $(shell command -v docker-compose)

.PHONY: deps
deps:
ifndef DOCKER
	@echo "Docker is not available. Please install docker"
	@exit 1
endif
ifndef DOCKER_COMPOSE
	@echo "docker-compose is not available. Please install docker-compose"
	@exit 1
endif

# Build image
.PHONY: build
build:
	docker build -t $(IMAGE_NAME):dev .

# Lint project
.PHONY: lint
lint: build
	docker-compose run --rm $(SERVICE_NAME) bash -c 'npm run lint'

# Start meeting backend app
.PHONY: start-meeting-backend
start-meeting-backend: build
	docker-compose up $(MEETING_APP_NAME)-backend && docker-compose down

# Clean containers
.PHONY: clean
clean:
	docker-compose down --rmi local -v --remove-orphans
