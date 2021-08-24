/*
https://api2.tophub.app/account/sync
^https:\/\/api2\.tophub\.app\/account\/sync
*/

let body = JSON.parse($response.body)
body.data = {
    "is_vip": "1",
    "vip_expired": "4603191721",
      "is_vip_now": true
    };
body = JSON.stringify(body)
$done({body})
