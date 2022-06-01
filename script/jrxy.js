/*
^https:\/\/loc\.map\.baidu\.com\/sdk\.php
*/
let body = JSON.parse($response.body.content)
body.addr={
			"adcode": "350211",
			"city": "厦门市",
			"city_code": "194",
			"country": "中国",
			"country_code": "0",
			"district": "集美区",
			"province": "福建省",
			"street": "承志北路",
			"town": "侨英街道"
},

body.point={
			"x": "118.079236",
			"y": "24.607530"
},
body = JSON.stringify(body)
$done({body})
