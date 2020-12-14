/*
[Script] = ^https:\/\/ssl-api\.itranslateapp\.com\/accounts\/v4\/user
[MITM] = ssl-api.itranslateapp.com
*/

let body = JSON.parse($response.body)
body = {
    "activated": true,
    "apps": [
      {
        "bundle_id": "com.outerspaceapps.itranslate",
        "installations": [
          {
            "created_at": "2020-12-13 12:37:30",
            "installation_id": "98c44507-4e5d-4a74-9226-a99ea70750c8",
            "name": "iOS device"
          }
        ],
        "purchases": [
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
    ],

    "email": "moremascot@gmail.com",
    "name": "annarua",
    "newsletter": false,
    "user_id": 117479965973985
  };
body = JSON.stringify(body)
$done({body})
