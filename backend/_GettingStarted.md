# Getting Started

Check if Ruby, Gem, and Rails are available already:

```sh
ruby -v && gem -v && rails -v
```

Turns out I had none so to installing I go.

## Ruby in WSL

This should make sure you're up to date, then install the stuff needed by thye installers:

```sh
sudo apt update
sudo apt install -y curl git build-essential libssl-dev libreadline-dev zlib1g-dev libsqlite3-dev
```

Install ruby version manager (like nvm, but rbenv)

```sh
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-installer | bash
```

Add the following to your `.zshrc` (or `.bashrc` if you don't have zsh)

```bash
# Add ruby versions to path
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```

Optional extra for your `.zshrc`:

```bash
# Install Ruby Gems to ~/gems specifically
export GEM_HOME="$HOME/gems"
export PATH="$HOME/gems/bin:$PATH"
```

Close then reopen your terminal to load the new setup. You should then be able to run:

```sh
rbenv -v
```

_If you have problems with the ruby-build plugin: `git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build`_

The [Ruby site](https://www.ruby-lang.org/en/downloads/) lists the current lts version. Add ruby, then set the version for use:

```sh
rbenv install 3.4.4
rbenv global 3.4.4
```

_Idk if it was a me problem but I had some errors with fiddle and psych during the install step and ended up running: `sudo apt install -y libffi-dev libyaml-dev`_

You should now be able to run this and see numbers:

```sh
ruby -v && gem -v
```

Installed - YAY!!

## Rails

Requires the earlier stuff, then v straightforward.

```sh
gem install bundler
gem install rails
rails -v
```

## VSCode Ruby Support

If ruby files look gross in VS Code, install the Ruby extension from Shopify.

## VSCode Ruby Formatter

I've added Rufo as a gem on this project and in combo with the vscode extension it can auto format on save like prettier does on the front end.

You'll need to run the install command to make sure you've got it locally:

```sh
bundle install
```

In VSCode you will need to install the extension by clicking on [this link](vscode:extension/mbessey.vscode-rufo) or search for:

> rufo (Ruby formatter)\
> Matt Bessey

Once gem and extension are installed: in a ruby file, open the context menu and select "Format Document With...". Configure your default formatter as rufo.

## Docker

Docker will be used to run the backend, so you'll need to install it (unless you have it already).

To check if you have it, run:

```sh
docker -v
```

If you don't have it, you can follow the Docker install guide. I think for Mac and Windows (non WSL) you can use the [Docker Desktop](https://www.docker.com/products/docker-desktop/). But this is what I (a WSL user) did:

```sh
sudo apt-get update
sudo apt-get install docker.io
```

Then you can create and add your user to a docker group so you can run it without using `sudo` every single time:

```sh
sudo usermod -aG docker $USER
newgrp docker
```

You can check if it worked by running:

```sh
docker run hello-world
```

And it should show a welcome print out.

## Docker Compose

Docker Compose is used to run multiple containers at once, which is useful for the backend and database stuff (which we'll likely add later).

Again, Mac and Windows can use the Docker Desktop app, and WSL will install it directly.

I, a WSL user, followed the docker docs which talked about certificates and keyrings and stuff, but tbh you can probably just install it directly and it should be fine.

To install it:

```sh
sudo apt-get install docker-compose-plugin
```

This should let us use the command `docker compose` (with a space) instead of `docker-compose` (with a hyphen).

## Starting the Backend

Before we can run the backend, we need to build the Docker images.

To do this, within the backend directory and run:

```sh
docker compose build
```

Generally, to start our application, we will use:

```sh
docker compose up
```

Once it is running, you can access the Rails server at `http://localhost:3000`. It should update automatically as you make changes to the code, you'll just need to refresh the page.

To stop the application, you can just use `Ctrl + C` but you can also go into another terminal and use:

```sh
docker compose down
```
