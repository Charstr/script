
let obj = JSON.parse($response.body);
obj.user.is_premium = true;

$done({body: JSON.stringify(obj)});
