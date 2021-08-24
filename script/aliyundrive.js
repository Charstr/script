/*

https://api.aliyundrive.com/apps/v1/users/app_list
https://api\.aliyundrive\.com/apps\/*\/users/app_list
hostname=api.aliyundrive.com
*/

let body = JSON.parse($response.body)
body = {
    "result": [
        {
            "appId": "b7a7e5308bb44c9c8920d60dbbb507f3",
            "name": "文件",
            "logo": "https://gw.alicdn.com/imgextra/i3/O1CN015G655S1DhcvECzMDK_!!6000000000248-2-tps-411-420.png",
            "actionType": "openNative",
            "action": "smartdrive://app/file",
            "position": 100
        }
    ]
}

body = JSON.stringify(body)
$done({ body })
