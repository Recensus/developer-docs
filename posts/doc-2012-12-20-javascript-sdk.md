---
title: Javascript SDK
date: '2012-12-20'
description:
categories: ['docs', 'sdk']
---

## The Javascript SDK

Recensus has provoded developers with a javascript library which can be used to render the various iframes 
used to render Recensus content on merchant websites. 

## Registering As A Merchant

In order to display review content on a merchant website the merchant must register at http://app.recnesus.com/en/register.
The registration process issues a merchant with a merchant ID (mid) and a shared secret. These are required to use the techniques bellow. 
On registration a test merchant is created, please use this merchant when testing out Recensus on development and staging environments. 

## Including the Javascript Library

To use the recensus SDK it should be included in the footer of yoyr page

````javascript
<script src="http://cdn.recensus.com/js/widget.js" type="text/javascript"></script> 
````

## Rendering Review Content

After including the javascript on the page rendering review content is a simple matter of creating an HTML element with the 
correct properties on the page.

In this example a div is used to create the Recensus Widget. 

````html 
<div id="recensuswidget" data-settings="name=FRAOCH+22&url=http%3A%2F%2Fapp.recensus.com%2Fdemo%2Fwbb&mid=2&hash=e3b660c002d682122537f2ad312ad177"></div>
<script src="http://cdn.recensus.com/js/widget.js" type="text/javascript"></script> 
````

You can see that demo in action at http://app.recensus.com/demo/wbb

Bellow is a speification of what should appear in the "data-settings" attribute of the div.

<table class="table table-striped table-bordered">
	<thead>
		<td>Attribute</td>
		<td>Description</td>
		<td>Required</td>
	</thead>
	<tr> 
		<td>mid</td>
		<td>The merchants ID, obtained during registration (above)</td>
		<td>Yes</td>
	</tr>
	<tr> 
		<td>name</td>
		<td>The name of the product</td>
		<td>Yes</td>
	</tr>
	<tr> 
		<td>url</td>
		<td>The url of this products page on your website</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>hash</td>
		<td>A md5 of the name (above) and the merchant's shared secret. This vakidates that requests are being made only by the merchant who owns the account.</td>
		<td>Yes</td>

	<tr> 
		<td>gtin</td>
		<td>GTIN - Global Trade Identifier. Used by recensus to match products across sites.</td>
		<td>Reccomended</td>
	</tr>
	<tr> 
		<td>brand</td>
		<td>The brand name of the product. EG - Sony</td>
		<td>Recommended</td>
	</tr>
	<tr> 
		<td>mpn</td>
		<td>MPN - Merchant Product Name. The name of the product according to the manufactorer. EG - Walkman</td>
		<td>Recommended</td>
	</tr>
	<tr> 
		<td>price</td>
		<td>The price of the product not including shipping</td>
		<td>No</td>
	</tr>
	<tr> 
		<td>currency</td>
		<td>The currency the product is sold in.</td>
		<td>No</td>
	</tr>
	<tr> 
		<td>currency</td>
		<td>The brand name of the product. EG - Sony</td>
		<td>No</td>
	</tr>
	<tr> 
		<td>type</td>
		<td>The Recensus entity type. At the moment only 'P' for product is accepted however additonal types will be supported in the future. Defaults to "P"</td>
		<td>No</td>
	</tr>
		<tr> 
		<td>lang</td>
		<td>THe language the product is sold in. Defaults to en.</td>
		<td>No</td>
	</tr>
</table>


The mid, name, URL and hash are all required parameters. gtin, mpn and brand help Recensus cross reference a merchants products with it's bank of reviews to ensure accurate and relevant review content is displayed, All parmaeters should be URL encoded, when creating the hash ensure that it is created before URL encoding. 

## Review Widget Types

Recensus provides a range of review widgets to use in the numerous differnt areas of a Merchant's products page.

### The Review Widget

This widget is designed to be displayed at the foot a merchants product page. It displays all the products reviews in full and allows users to leave a review by filling in the review form and logging in with Facebook. One review widget may be displayed per page.

````html 
<div id="recensuswidget" data-settings="name=FRAOCH+22&url=http%3A%2F%2Fapp.recensus.com%2Fdemo%2Fwbb&mid=2&hash=e3b660c002d682122537f2ad312ad177"></div>
<script src="http://cdn.recensus.com/js/widget.js" type="text/javascript"></script> 
````

<img src="https://s3-sa-east-1.amazonaws.com/developer.recensus.com/review-widget-light.png" height=700 width=700 />

### The Review Button

This button shows the Recensus logo and the text "Read Reviews". It is designed to be show inline with producst in a view where multiple products appear on the same page or when the merchant wants to provide the ability to read review content inline with the product. When a customer clicks on the button an Iframe containing the full review widget appears. Multiple review buttons may be displayed per page.

````html 
<div class="recensusbutton" data-settings="name=FRAOCH+22&url=http%3A%2F%2Fapp.recensus.com%2Fdemo%2Fwbb&mid=2&hash=e3b660c002d682122537f2ad312ad177"></div>
<script src="http://cdn.recensus.com/js/widget.js" type="text/javascript"></script> 
````

<img src="https://s3-sa-east-1.amazonaws.com/developer.recensus.com/review-button-dark.png" height=100 width=200/>