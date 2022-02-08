
//^https:\/\/app\.bilibili\.com\/x\/v2\/activity\/menu 

let body = JSON.parse($response.body)
body = { };
body = JSON.stringify(body)
$done({body})
