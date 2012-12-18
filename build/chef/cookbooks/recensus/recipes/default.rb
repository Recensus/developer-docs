
 require_recipe "apt"
 require_recipe "freebsd"
 require_recipe "openssl"
 require_recipe "hosts"


execute "Install Curl" do
  command "sudo apt-get install -y curl"
end

execute "Install RVM" do
  command "curl -L https://get.rvm.io | bash -s stable --ruby"
end

execute "Install Ruby Version" do
  command "rvm install 1.9.3"
end

execute "Install Ruby Version" do
  command "rvm use 1.9.3"
end

execute "Install Ruby ruhoh gem" do
  command "gem install ruhoh"
end

hosts "127.0.0.1" do
  entries "localhost"
end

hosts "127.0.0.1" do
  entries "developer.recensus.local"
end