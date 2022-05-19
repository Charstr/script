/*
[Script]
^https:\/\/license\.pdfexpert\.com\/api\/.*\/(documents|pdfexpert6)\/subscription\/(refresh$|check$) url script-response-body Documents&PDFExpert.js
[MITM]
hostname = license.pdfexpert.com
*/
var obj= {
	"bundleId": "com.readdle.PDFExpert5",
	"chargingPlatform": "iOS AppStore",
	"receiptId": 1650886513000,
	"originalTransactionId": 550001075931630,
	"inAppStates": [{
		"type": "subscription",
		"productId": "com.readdle.PDFExpert5.subscription.month10",
		"originalTransactionId": 550001075931630,
		"productName": "subscription",n
		"isEligibleForIntroPeriod": false,
		"subscriptionExpirationDate": "12:52 02/06/2092",
		"subscriptionState": "active",
		"subscriptionAutoRenewStatus": "autoRenewOn",
		"isInGracePeriod": false,
		"isInBillingRetryPeriod": false,
		"entitlements": ["ios.pe.subscription.pdf-features"]
	}],
	"receiptStatus": "ok",
	"statisticsInfo": {
		"events": []
	}
}

$done({body: JSON.stringify(obj)});
