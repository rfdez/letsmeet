# Shell to use for running scripts
SHELL := $(shell which bash)

SERVICE_NAME := app
USER_APP_NAME := user
RECOMMENDATION_APP_NAME := recommendation

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
deps:
	@docker-compose build $(SERVICE_NAME)

# Execute npm command
.PHONY: npm
npm:
	docker-compose run --rm $(SERVICE_NAME) bash -c 'npm $(CMD)'

# Build project
.PHONY: build
build:
	@docker-compose run --rm $(SERVICE_NAME) bash -c 'npm run lint && npm run build'

# Run tests
.PHONY: test
test:
	@docker-compose run --rm $(SERVICE_NAME) bash -c 'npm run test'

.PHONY: start-all
start-all: build
	@docker-compose up --build $(USER_APP_NAME)-backend $(RECOMMENDATION_APP_NAME)-backend && \
docker-compose rm -f -s -v $(USER_APP_NAME)-backend $(RECOMMENDATION_APP_NAME)-backend

# Start user backend app
.PHONY: start-user-backend
start-user-backend: build
	@docker-compose up --build $(USER_APP_NAME)-backend && docker-compose rm -f -s -v $(USER_APP_NAME)-backend

# Start recommendation backend app
.PHONY: start-recommendation-backend
start-recommendation-backend: build
	@docker-compose up --build $(RECOMMENDATION_APP_NAME)-backend && \
docker-compose rm -f -s -v $(RECOMMENDATION_APP_NAME)-backend

# Copy dependencies in local
.PHONY: local-deps
local-deps:
	@docker-compose up --build -d $(SERVICE_NAME)
	@docker compose -f docker-compose.yml cp $(SERVICE_NAME):/code/node_modules .
	@docker-compose rm -f -s $(SERVICE_NAME)

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
	@docker-compose up -d mongodb rabbitmq elasticsearch
