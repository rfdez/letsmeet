<h1 style='text-align: center;'>
  Typescript DDD Test
</h1>

## Environment Setup

### 🐳 Needed tools

The `make` command will tell you if docker is installed in your computer.

1. [Install Docker](https://www.docker.com/get-started)
2. Clone this project: `git clone https://github.com/rfdez/letsmeet`
3. Move to the project folder: `cd letsmeet`

### 🛫 Application execution

1. Install all dependencies with `make deps` command. It will run a docker container to install all dependencies with
   npm.
2. Now there are only one application. To run it execute `make start-user-backend` command.
    1. [User Backend](src/apps/user/backend): http://localhost:3000/status

### ✅ Test

1. Install the dependencies with `make deps` if you haven't done.
2. Execute unit tests with jest and acceptance test with cucumber using the `make test` command.

### 🧹 Clean workspace

Additionally, the project will create others service containers to stop it:

1. Run `make clean` to stop the docker services and remove project images, volumes and orphan containers.
2. The project will create additional ignored directories and the `node_modules` directory, to remove it and clean the
   workspace directories run `make clean-workspace`.
