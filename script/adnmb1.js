/*
^https?://nmb\.fastmirror\.org/Api/thread
*/

let body = JSON.parse($response.body)
obdy.reply[0] = '';
body = JSON.stringify(body)
$done({body})
