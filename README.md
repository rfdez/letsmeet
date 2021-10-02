# Typescript DDD Test

![Nodejs CI workflow](https://github.com/rfdez/letsmeet/actions/workflows/nodejs.yml/badge.svg)

## Environment Setup

### 🐳 Needed tools

The `make` command will tell you if docker is installed in your computer.

1. [Install Docker](https://www.docker.com/get-started)
2. Clone this project: `git clone https://github.com/rfdez/letsmeet`
3. Move to the project folder: `cd letsmeet`

### 🛫 Applications execution

1. Install all dependencies with `make deps` command. It will run a docker container to install all dependencies with
   npm.
2. Now there are two applications. To run it execute `make start-all` command.
    1. [User Backend](src/apps/user/backend): http://localhost:3000/status
    2. [Recommendation Backend](src/apps/recommendation/backend): http://localhost:3001/status

### ✔️ Test

1. Install the dependencies with `make deps` if you haven't done.
2. Execute unit tests with jest and acceptance test with cucumber using the `make test` command.

### 🧹 Clean workspace

Additionally, the project will generate some needed docker service containers and folders in the root directory.

1. Run `make clean` to stop the docker services and remove project images, volumes and orphan containers.
2. The folders created in the root directory are ignored by git, so you don't have to remove it, but you can do it for
   clean the workspace by `make clean-workspace` command.
