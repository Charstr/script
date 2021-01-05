/*
host = nmb.fastmirror.org

^https?://nmb\.fastmirror\.org/Api/showf
*/
let body = JSON.parse($response.body)
body[0] = '';
body = JSON.stringify(body)
$done({body})
