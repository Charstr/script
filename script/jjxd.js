/*
[Script] = ^http:\/\/receipts-verifier-2\.topfreegames\.com\/v4\/apple_receipt
[MITM] = receipts-verifier-2.topfreegames.com

 */



let body = JSON.parse($response.body)
body = {
    "digest": "6ca8570257f9f0dc6956bbffae345146884efb02",
    "timestamp": 1610800048,
    "sandbox": false,
    "sub_expiration_ts": "2611404619"
}
body = JSON.stringify(body)
$done({ body })
