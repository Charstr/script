
var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const p2 = '/v2/user';

//_vip
if (url.indexOf(p2) != -1) {
	obj = {
		"server_time": 1708353391,
		"result": {
			"device_id": "AEFC1530-D7C6-45F8-B64B-6F5E26E6809F",
			"_id": "5f818b542669f40013914c10",
			"is_visitor": false,
			"created_at": 1602325332.308947,
			"svip_given": 1825,
			"ranking_above": 97.0,
			"platform_name": "caiyun",
			"is_phone_verified": true,
			"last_acted_at": 1706067477.619491,
			"hasBeenInvited": true,
			"is_xy_vip": false,
			"vip_expired_at": 0,
			"is_vip": true,
			"score": 2000,
			"xy_svip_expire": 0,
			"auto_renewal_type": "",
			"third_party_id": null,
			"third_party_ids": [
				"5ef19e2eeacb2f0011c5ea97"
			],
			"name": "祯祯",
			"free_trial": 10,
			"wt": {
				"vip": {
					"is_auto_renewal": true,
					"enabled": true,
					"svip_auto_renewal_type": "month",
					"expired_at": 0.0,
					"auto_renewal_type": "",
					"svip_expired_at": 1851501031.0
				},
				"svip_given": 1825,
				"ranking_above": 97.0,
				"is_login": true,
				"free_trial": 10,
				"last_acted_at": 1706067477.619491,
				"created_at": 1602325332.308962
			},
			"vip_take_effect": 1,
			"is_auto_renewal": true,
			"avatar": "http://thirdqq.qlogo.cn/g?b=oidb&k=IC3QDicxh5cbSQ7hWnWLNfg&s=100&t=1581864986",
			"platform_id": "",
			"is_primary": true,
			"phone_num": "8135630462",
			"gender": null,
			"xy_vip_expire": 0,
			"is_xy_auto_renewal": false,
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiNjViMDg2MTU3ZTg5OWMwMDE3ZTU4ZmQ3IiwidXNlcl9pZCI6IjVmODE4YjU0MjY2OWY0MDAxMzkxNGMxMCIsInZlcnNpb24iOjIsImV4cCI6MTcxMTIxMTU0MCwidmlwX2V4cGlyZWRfYXQiOjAsImlzcyI6IndlYXRoZXIiLCJpYXQiOjE3MDg2MTk1NDAsInN2aXBfZXhwaXJlZF9hdCI6MTcwMTc2NjE1NywicHJpbWFyeSI6dHJ1ZX0.BfI6ps0DiE3mKRs8jxerRX91iFGoeaxtLB0yn5JhDlI",
			"is_login": true,
			"is_kol": false,
			"svip_expired_at": 32493834549,
			"svip_take_effect": 1,
			"vip_type": "5",
			"bound_status": {
				"qq": {
					"id": "5ef19e2eeacb2f0011c5ea97",
					"username": "祯祯",
					"is_bound": true
				},
				"google": {
					"id": "",
					"username": "",
					"is_bound": false
				},
				"twitter": {
					"id": "",
					"username": "",
					"is_bound": false
				},
				"weixin": {
					"id": "",
					"username": "",
					"is_bound": false
				},
				"caiyun": {
					"id": "5f818b542669f40013914c10",
					"username": "祯祯",
					"is_bound": true
				},
				"facebook": {
					"id": "",
					"username": "",
					"is_bound": false
				},
				"apple": {
					"id": "",
					"username": "",
					"is_bound": false
				},
				"weibo": {
					"id": "",
					"username": "",
					"is_bound": false
				}
			}
		},
		"rc": 0
	}
	$done({
		body: JSON.stringify(obj)
	});
	body = JSON.stringify(obj);
}



$done({
	body
});