let body = JSON.parse($response.body)
if(body.userid = "ATM"){
    body = {};
}
body = JSON.stringify(body)
$done({ body })
