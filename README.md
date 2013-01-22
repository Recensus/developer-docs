Developer Docs
==============

About
-----

This repo contains all public facing documentation for developers using the 
Recensus API's, SDK's and the Recensus Widget. 

Contributing
------------

This documentation is written using Ruhoh. It allows developers to write 
documentation in markdown format and publish it as a set of static html documents.


### Installation 

Due to some bug I can't get chef to use rvm when it's installed.
Follow the instructions here to get your development docs environment working.  

vagrant up

Switch to latest version of ruby

````
sudo rvm install 1.9.3
rvm use 1.9.3
sudo gem install ruhoh
````

Have a read of the docs: http://ruhoh.com/usage/

### Reading The Docs

While in development it doesn't make sense to constantly write out static html 
files. You can spin up a dynamic version of the documentstion by using the the 
following command in the root of the docs project: 

````
cd /vagrant
sudo rackup -p 80
```` 

Then go to http://192.168.50.14 to read the docs. 