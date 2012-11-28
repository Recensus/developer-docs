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

Install RVM: https://rvm.io/rvm/install/

Install Ruhoh: gem install ruhoh

Have a read of the docs: http://ruhoh.com/usage/

### Reading The Docs

While in development it doesn't make sense to constantly write out static html 
files. You can spin up a dynamic version of the documentstion by using the the 
following command in the root of the docs project: 

````
rackup -p 9292
````

Then goto http://localhost:9292 to read the docs. 