<h3 align="center">Install Ruby and Rails</h3>

## 📝 Table of Contents

- [Ruby in MacOS](#ruby_in_mac)
- [Ruby in WSL](#ruby_in_wsl)
- [Rails](#rails)
- [VSCode Extensions](#vscode_extensions)

[~ /Backend/README.md](/backend/README.md)  
[~ Project /README.md](/README.md)

## 💎 Ruby in MacOS <a name = "ruby_in_mac"></a>

Do a homebrew thing :)

```sh
brew install rbenv
```

## 💎 Ruby in WSL <a name = "ruby_in_wsl"></a>

This should make sure you're up to date, then install the stuff needed by the installers:

```sh
sudo apt update
sudo apt install -y curl git build-essential libssl-dev libreadline-dev zlib1g-dev libsqlite3-dev
```

### rbenv

Install ruby version manager (like nvm, but rbenv)

```sh
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-installer | bash
```

_If you have problems with the **ruby-build** plugin use:_

```sh
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

Add the following to your `.zshrc` (or `.bashrc` if you don't have zsh)

```bash
# Add ruby versions to path
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```

Optional extra to define where gems are located:

```bash
# Install Ruby Gems to ~/gems specifically
export GEM_HOME="$HOME/gems"
export PATH="$HOME/gems/bin:$PATH"
```

Close then reopen your terminal to load the new setup. You should then be able to run:

```sh
rbenv -v
```

### Ruby install

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

## 🛤️ Rails <a name = "rails"></a>

Requires the earlier stuff, then v straightforward.

```sh
gem install bundler
gem install rails
rails -v
```

## 💻 VS Code Extensions <a name = "vscode_extensions"></a>

The backend code uses the following ruby tool extensions in VSCode:

- [Ruby LSP](vscode:extension/shopify.ruby-lsp) - Shopify
- [rufo (Ruby formatter)](vscode:extension/mbessey.vscode-rufo) - Matt Bessey
