/*
host = api.yonekura.cn
^https:\/\/api\.yonekura\.cn\/.*\/uicommon\/getuser
https://api.yonekura.cn/3.6.8/uicommon/getuser
*/

let body = JSON.parse($response.body)
body.data = {
  "userId": "13200341",
  "nick": "小火箭m6hwed",
  "score": "999999",
  "expireTime": "3607149128",
  "expExpireTime": "3607149128",
  "lastSignTime": "1607149128",
  "lastBuyTime": "1607149128",
  "lastRewardTime": "1607149128",
  "signDays": "99",
  "isVip": true,
  "inviteCode": "sfkbn",
  "times": "114514"
}

body = JSON.stringify(body)
$done({body})
