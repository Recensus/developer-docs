---
title: php-sdk
date: '2012-12-04'
description: Developing Against the Recensus Platform Using PHP
categories:
---

##Introduction

The PHP-SDK provides PHP developers with a tool which makes integrating Recensus
into an ecommerce website even easier. The php-sdk offers three features:

1. A tool to facilitate rendering the Recensus widget and Recensus button on a 
merchant product page.

2. The facility to embed reviews in SEO friendly html on the merchants website.

3. A tool to schedule aftersales contact with merchants customers.  

##Requirements

The Recensus PHP-SDK requires PHP 5.1 and above. 

Contributing to Recensus or using the source directly from Github requires 
PHP 5.3 and above.
 
##Setting Up The SDK

###Downloading The Single PHP File

You can use [this link](https://github.com/downloads/Recensus/php-sdk/recensus.php) 
to download a single file containing the Recensus SDK and it's dependencies.

You can then require the file like so: 

````php 
<?php 
require_once "path/to/recensus.php";
````

### Installing With Composer

Add the following line to your composer.json file:

````
    {    
        "require": {          
            "recensus/php-sdk": "dev-master"
        }
    }
````

Install your dependencies:

````
php composer.phar install

// For dev - 

php composer.phar install --dev 
 
````

## Using The SDK To Render The Widget

The Recensus widget is rendered using an iFrame. The iFrame is generated using 
javascript. The javascript looks for specific html elements on the page and 
transforms them into the iframe.

### Example - Rendering The Review Widget

````
<?php 
// You can get your merchantToken and merchantSeret from the Recensus control pannel
$merchantToken = "<-- YOUR MERCHANT TOKEN -->";
$sharedSecret = "<!-- YOUR SHARED SECRET -->";

$productData = array(
    "url" => "http://yourwebsite.com/yourproductpage",
    "gtin" => "123456",
    "lang" => "en"
);

$widget = new RecensusWidget($merchantToken, $sharedSecret, $productData);

?>

<div id="recensuswidget" data-settings="<?php echo $widget->getDataProperty() ?>"></div>
<script src="http://cdn.recensus.com/js/widget.js" type="text/javascript"></script>

```` 

<img src="https://s3-sa-east-1.amazonaws.com/developer.recensus.com/review-widget-light.png" height=700 width=700 />


### Example - Rendering The Review Button


````
<?php 
// You can get your merchantToken and merchantSeret from the Recensus control pannel
$merchantToken = "<-- YOUR MERCHANT TOKEN -->";
$sharedSecret = "<!-- YOUR SHARED SECRET -->";

$productData = array(
    "url" => "http://yourwebsite.com/yourproductpage",
    "gtin" => "123456",
    "lang" => "en"
);

$widget = new RecensusWidget($merchantToken, $sharedSecret, $productData);

?>

<div id="recensusbutton" data-settings="<?php echo $widget->getDataProperty() ?>"></div>
<script src="http://cdn.recensus.com/js/widget.js" type="text/javascript"></script>

```` 

<img src="https://s3-sa-east-1.amazonaws.com/developer.recensus.com/review-button-dark.png" height=100 width=200/>

## Rendering SEO Friendly Review HTML

In addition to rendering the Recensus widget in an iFrame you may want to render 
some SEO friendly HTML.

### Example - Rendering HTML

````
$merchantToken = "<-- YOUR MERCHANT TOKEN -->";
$sharedSecret = "<!-- YOUR SHARED SECRET -->";

$productData = array(
    "url" => "http://yourwebsite.com/yourproductpage",
    "gtin" => "123456",
    "lang" => "en"
);

$widget = new RecensusWidget($merchantId, $sharedSecret, $productData);

$html = $widget->getHTMLFragment();

print $html;

````


## Using The SDK To Make A Customer Contact Request

In order to maximise the number of reviews collected for products Recensus 
offers you the opportunity to schedule an aftersales email to be sent requesting 
that the customer reviews their recent purchase. 

When a customer posts a review on Recensus it immediately appears on the 
corresponding product page on the merchants website. 

### Example - Making A Customer Contact Request

A request is made by creating the RecensusApi object and then passing an array
of customer and product data to the makeCustomerContactRequest method. 

Below is an example followed by the specification of array to pass to makeCustomerContactRequest.  

````
$merchantToken = "<-- YOUR MERCHANT TOKEN -->";
$sharedSecret = "<!-- YOUR SHARED SECRET -->";
$ccr = array(
            "merchant" => <-- YOUR MERCHANT TOKEN -->,
            "customerFirstName" => "BW",
            "customerLastName" => "BW",
            "customerEmail" => "bw@bw.com",
            "purchaseDate" => "2012-12-12T16:00:00+0000",
            "purchases" => array(
                array(
                    "brand" => "TEST",
                    "mpn" => "TEST",
                    "gtin" => 123456,
                    "quantity" => 2,
                    "lang" => "en",
                    "type" => "P",
                    "title" => "TEST",
                    "url" => "http://yourwebsite.com/yourproductpage",)
            ),
        );

$api = new RecensusApi($merchantId, $sharedSecret, true);

$api->makeCustomerContactRequest($ccr);

````

### Customer Contact Request Structure

A customer contact request consists of two parts. An array of customer data 
 which in turn contains an array of purchases. This data is used
to create an email requesting the customer to leave feedback for their purchases 
on Recensus so it's important that they are correct.

#### The Customer Data


__merchant:__ The merchant token

__customerFirstName:__ The customer's first name

__customerLastName:__ The customer's first name

__customerEmail:__ The customer's email address. We use this to send the request email.

__purchaseDate:__ The date the customer made this purchase

__purchases:__ An array of purchase arrays (described below)

#### Purchase Data

In order for Recensus to identify the product __the GTIN or both the brand and mpn
must be sent in the request.__
 

__brand:__ The product Brand

__mpn:__ The 'merchant product name'

__gtin:__ The 'Global Trade Item Number' (barcode).

__quantity:__ The quantity of the item purchased.

__lang:__ The language of the product

__type:__ The type of product. At present only 'P' (product) is supported. 
However further product types will be supported in the future. 

__title:__ The merchant specific title for the product. 

__url:__ The url for the product on the merchants site 


## Error Handling

Both classes in the SDK have two types of error handling. 
PHP Notices for older ecommerce applications and Exceptions for more modern 
PHP frameworks.

## Example - Setting Error Handling in RecensusWidget

````
// The default setting is to use PHP Notices to alert errors.
$widget = new RecensusWidget($merchantToken, $merchantSecret);

// You can pass true as the fourth argument to use Exceptions instead. 
// Note: Failure to catch exceptions will result in the product page failing to render.
$widget = new RecensusWidget($merchantToken, $merchantSecret, null, true);

// You can also set RecensusWidget to throw exceptions after construction.
$widget = new RecensusWidget($merchantToken, $merchantSecret);
$widget->setThrowExceptions(true);

````

## Example - Setting Error Handling in RecensusApi

````
// The default setting is to use PHP Notices to alert errors.
$api = new RecensusApi($merchantToken, $merchantSecret);

// You can pass true as the third argument to use Exceptions instead. 
$api = new RecensusApi($merchantToken, $merchantSecret, true);

// You can also set RecensusApi to throw exceptions after construction.
$api = new RecensusApi($merchantToken, $merchantSecret);
$api->setThrowExceptions(true);

````