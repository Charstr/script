/*
^https://net\.rayjump\.com/openapi/ad
*/

let body = JSON.parse($response.body)
body.data = [];
body = JSON.stringify(body)
$done({body})
