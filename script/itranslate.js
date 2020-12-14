/*
[Script]
^https:\/\/ssl-api\.itranslateapp\.com\/accounts\/v4\/subscriptions\/verify\/ios
[MITM]
hostname = ssl-api.itranslateapp.com
*/

let body = JSON.parse($response.body)
obj = {
    "licenses": [
      {
        "bundle_id": "com.outerspaceapps.itranslate",
        "expires_date_ms": 2608467875000,
        "is_trial_period": true,
        "original_transaction_id": "480000745188088",
        "product_id": "com.itranslate.pro.yearlytrial",
        "transaction_id": "480000745188088"
      },
      {
        "bundle_id": "com.outerspaceapps.itranslate",
        "expires_date_ms": 2608467875000,
        "is_trial_period": true,
        "original_transaction_id": "480000745188088",
        "product_id": "com.itranslate.pro.yearlytrial",
        "transaction_id": "480000745188088"
      }
    ]
  }
body = JSON.stringify(body)
$done({body})
