<h3 align="center">Install Docker and Docker Compose</h3>

## 📝 Table of Contents

- [Docker in Mac](#docker_in_mac)
- [Docker Compose in Mac](#docker_compose_in_mac)
- [Docker in WSL](#docker_in_wsl)
- [Docker Compose in WSL](#docker_compose_in_wsl)

[~ /Backend/README.md](/backend/README.md)  
[~ Project /README.md](/README.md)

## 🐋 Docker in Mac (& Windows) <a name = "docker_in_mac"></a>

You can use [Docker Desktop](https://www.docker.com/products/docker-desktop/)

- Install the Docker Desktop version for you device (i.e. Silicon Chip or Intel)
- Follow set up instructions from the application (create account/sign in)

To check it worked, reopen your terminal and run:

```sh
docker run hello-world
```

And it should show a welcome print out.

## 🍎 Docker-Compose in Mac <a name = "docker_compose_in_mac"></a>

Check you have homebrew with `brew --version`

If not, follow the Homebrew install commands.

### Homebrew installation

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Update brew formulae and cask to make sure you have the latest package versions:

```sh
brew update
```

### Docker Compose installation

Use brew to install Docker Compose and add it to your system:

```sh
brew install docker-compose
```

And that‘s it! With 3 quick terminal commands, Homebrew pulled down its Docker Compose formula, handled installing any dependencies, resolved conflicts with other apps, and activated the latest supported Docker Compose release.

To display the installed version:

```sh
docker compose version
```

## 🐋 Docker in WSL <a name = "docker_in_wsl"></a>

If you don't have docker, you can follow the official Docker install guide or follow or steps below.

Install Docker via the command line:

```sh
sudo apt-get update
sudo apt-get install docker.io
```

Then you can create and add your user to a docker group so you can run it without using `sudo` every single time:

```sh
sudo usermod -aG docker $USER
newgrp docker
```

To check it worked, reopen your terminal and run:

```sh
docker run hello-world
```

And it should show a welcome print out.

## 🤖 Docker Compose in WSL <a name = "docker_compose_in_wsl"></a>

As a WSL user, you can follow the docker docs which talked about certificates and keyrings and stuff, but tbh you can probably just install it directly and it should be fine.

To install it:

```sh
sudo apt-get install docker-compose-plugin
```

This should let us use the command `docker compose` (with a space) instead of `docker-compose` (with a hyphen).

To check the install, run:

```sh
docker compose version
```
