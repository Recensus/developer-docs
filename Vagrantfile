# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant::Config.run do |config|
  # All Vagrant configuration is done here. The most common configuration
  # options are documented and commented below. For a complete reference,
  # please see the online documentation at vagrantup.com.

  # Every Vagrant virtual environment requires a box to build off of.
  # vagrant box add ubuntu1204 http://dl.dropbox.com/u/1537815/precise64.box
  config.vm.box = "ubuntu1204"
  
  
  # Set up NFS
  config.vm.share_folder("v-root", "/vagrant", ".", :nfs => true)
  #config.vm.share_folder("v-root", "/vagrant", ".", :owner => "www-data")


  # Expose the VM on 192.168.50.14 (Developers: Point to this IP for Web / DB traffic)
  config.vm.network :hostonly, "192.168.50.14"
  config.vm.network :bridged
  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = "build/chef/cookbooks"
    chef.json = {
      :recensus => {
        :ServerName => "developer.recensus.local"
      },
      :xdebug => {
        :remote_connect_back => "1",
	:remote_enable => "1",
	:idekey => "netbeans-xdebug"
      }
    }

    chef.add_recipe("recensus")
  
  end

end
