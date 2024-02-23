/*
 *
 *
脚本功能：彩云天气
软件版本：++
下载地址：苹果商店下载
脚本作者：
更新时间：2024年2月20日 06:47
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]

# > 彩云天气 解锁vip
^https?:\/\/biz.cyapi.cn\/(p\/v1\/user_info|v2\/user).*$ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/cytq.js

[mitm] 
hostname = biz.cyapi.cn
*
*
*/
var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const p2 = '/v2/user';

//_vip
if (url.indexOf(p2) != -1) {
  obj = {
    "server_time": 1708353391,
    "result": {

      "platform_id": "o3rJ_t00r0mxqS6GCVWMaVtEFLUk",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiNjVkMzY2OTRmY2FjMDgwMDE0NDlkODMzIiwidXNlcl9pZCI6IjVmNWJmYzU3ZDJjNjg5MDAxNGUyNmJiOCIsInZlcnNpb24iOjIsImV4cCI6MTcxNjEyOTE3MiwidmlwX2V4cGlyZWRfYXQiOjAsImlzcyI6IndlYXRoZXIiLCJpYXQiOjE3MDgzNTMxNzIsInN2aXBfZXhwaXJlZF9hdCI6MTg1MTUwMTAzMSwicHJpbWFyeSI6dHJ1ZX0.U_LCYNGl3cbBCpjrnjmxYBAuNFSvNCe3dKIrV1MGpzo",
      "svip_given": 1825,
      "avatar": "https://avatar.caiyuncdn.com/avatar/39cff6272f6e133d731fc6fda973e533-1708017050091.jpg",
      "is_vip": true,
      "gender": null,
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