
<h3 align="center">Install Ruby and Rails</h3>

## 📝 Table of Contents

- [Ruby in WSL](#ruby_in_wsl)
- [Rails](#rails)
- [VS Code](#vs_code)

[~ /Backend/README.md](/backend/README.md)  
[~ Project /README.md](/README.md)

## 💎 Ruby in WSL <a name = "ruby_in_wsl"></a>

This should make sure you're up to date, then install the stuff needed by the installers:

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

## 🛤️ Rails <a name = "rails"></a>

Requires the earlier stuff, then v straightforward.

```sh
gem install bundler
gem install rails
rails -v
```

## 💻 VS Code <a name = "vs_code"></a>

If ruby files look gross in VS Code, install the Ruby extension from Shopify.
