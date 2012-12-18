
 require_recipe "apt"
 require_recipe "freebsd"
 require_recipe "openssl"
 require_recipe "hosts"


execute "Install Curl" do
  command "sudo apt-get install -y curl"
end

execute "Install libxml2" do
  command "sudo apt-get install -y libxslt-dev libxml2-dev"
end

execute "Install RVM" do
  command "curl -L https://get.rvm.io | bash -s stable"
end

hosts "127.0.0.1" do
  entries ["localhost", "developer.recensus.local"]
end
