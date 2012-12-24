---
title: Customer Contact API
date: '2012-12-20'
description: "An API allowing you to schedule a post purchase follow up email in order to solicit reviews"
categories:  docs
---

Introduction
------------

The customer contact API allows you to hook Recensus into your aftersales
process and schedule an email to be sent to a customer asking them to review
the product(s) they purchased from your site. 

When customers receive the email they are prompted to click a link to leave 
feedback for the products they have purchased on recensus.com. Shortly 
afterwards subject to validation the product reviews are displayed on the 
Recensus widget. 

Using this API is a great way to ensure that you quickly build a review base 
for your products.

Building A Request
------------------

The Customer Contact API is a JSON HTTP API. A customer contact request (CCR)
is made up of two parts.

1) A data section containing the data required by the API 

2) A 'Signed Request' containing a merchant API token and a hash of various
request parameters and the 'shared secret' you received when registering as a 
merchant with Recensus. 

The JSON data is then posted to the endpoint to schedule a CCR.

### Build A Signed Request

Building a signed request is easy. It is an MD5 hash of the following elements: 

**HTTP VERB** + **RequestURL** + **Shared Secret**

```` 
{
    "signedRequest": {
        "token": YOUR API TOKEN,
        "signature": MD5 HASH OF ABOVE
    },
    "data": ... SEE BELOW ...
}
````

### Building The Data

Building the data section of a CCR is straightforward. A JSON structure 
representing the transaction is created and nested within this is a structure 
representing the products purchased.     

#### Building The CCR Body

The following fields are required:

1. **merchant:** This is your merchant id (given to you on registration).
2. **customerFirstName:** The customer's first name.
3. **customerLastName:** The customer's last name. 
4. **customerEmail:** The customer's email address.
5. **purchaseDate:** The date the customer made the purchase at your store.
6. **purchases:** An array of purchase objects as described below. 
 
#### Building The Nested Products

The following fields are required: 

1. **name:** The name of the product
2. **url:** The url of the product page on the merchants website
1. **quantity:** The quantity of the item purchased.
2. **lang:** The products language in two letter iso format. (eg - "en")
4. **type:** The type of product. Currently only "P" (for product) is supported but later additional types will be added.

**Note:** Just like when using the Recensus widget the name and URL fields which identify your product are required. We recommedn you also send GTIN, MPN and brand if available see examples below. If you don't want to include a field, leave it empty.


````
{
    "data": {
        "merchant": "1",
        "customerFirstName": "Ben",
        "customerLastName": "Waine",
        "customerEmail": "ben@recensus.com",
        "purchaseDate": "2012-12-12T16:00:00+0000",
        "purchases": [
            // Example of a purchase with all id fields (gtin, brand, mpn).
            {
                "name": "Nike Shoes",
                "url": "http://mysite.com/products/nike-shoes, 
                "quantity": "2",
                "gtin": "123456",
                "mpn": "Cool Beans",
                "brand": "Nike",
                "lang": "en",
                "type": "P"
            },
            // Example of a purchase with gtin id field
            {
                "name": "Nike Shoes",
                "url": "http://mysite.com/products/nike-shoes, 
                "quantity": "2",
                "gtin": "654321",
                "mpn": "",
                "brand": "",
                "lang": "en",
                "title": "Nike Shoes",
                "type": "P"
            },
            // Example of a purchase with Brand + Mpn id fields
            {
                "name": "Nike Shoes",
                "url": "http://mysite.com/products/nike-shoes, 
                "quantity": "2",
                "gtin": "",
                "mpn": "Cool Beans",
                "brand": "Nike",
                "lang": "en",
                "type": "P"
            },
        ]
    },
    "signedRequest": {
        "token": "1",
        "signature": "5b077359bd8ae4212460727d1dce1c1c"
    }
}
````

Sending The Request
-------------------

After you have a JSON structure as in the example above you should make an 
HTTP POST request to: 

    /merchant/{MERCHANTID}/customer-contact-request

NOTE: You must use the following HTTP headers:

**Content-Type: application/json** 

**Accept: application/json**

Parsing The Response
--------------------

The possible responses from this endpoint are: 

### Success Created
__Code: 201 Created__

This indicates that a CCR has been created by Recensus and the customer will be 
contacted.

Example Response: 

````
{
    "data": {
        "id": 50,
        "customerFirstName": "Ben",
        "customerLastName": "Waine",
        "customerEmail": "ben@recensus.com",
        "purchases": [
            {
                "id": 99,
                "merchantProduct": {
                    "id": 1,
                    "brand": "Maverick",
                    "mpn": "MV12401",
                    "gtin": "",
                    "info": "0"
                },
                "quantity": "2"
            },
            {
                "id": 100,
                "merchantProduct": {
                    "id": 2,
                    "brand": "SiliconPower",
                    "mpn": "200X2GB",
                    "gtin": "",
                    "info": "0"
                },
                "quantity": "2"
            }
        ],
        "purchaseDate": "2012-12-12T16:00:00+0000",
        "links": {
            "self": "http://dev.recensus.com/app_dev.php/api/merchant/1/customer-contact-request/50"
        }
    }
}
````


### Bad Request
__Code: 400 Bad Request__

This indicates that either the data or the signed request portion of the request
are badly formed and you should debug before resending.

### Forbidden 
__Code: 403 Forbidden__ 

This indicates that your token isn't valid for the merchant you are trying to 
send a request on the behalf of.   

What Happens Next? 
------------------

The customer will be contacted by email and offered the opportunity to leave 
feedback on the products purchased. Any reviews left by customers will be available
on the Recensus widget shortly afterwards.