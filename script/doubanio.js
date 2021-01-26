/*
^https:\/\/api\.douban\.com\/v2\/app_ads
api.douban.com
*/
let body = JSON.parse($response.body)
body.ads = [];
body = JSON.stringify(body)
$done({body})
