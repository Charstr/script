/*
regex=^https:\/\/api2\.mubu\.com\/v3\/api\/user\/current_user 
mitm=api2.mubu.com
*/
let obj = JSON.parse($response.body);
obj.data["level"] = "2";
$done({body: JSON.stringify(obj)});
