let body = JSON.parse($response.body)
if(body.admin){
    body = {};
}
body = JSON.stringify(body)
$done({ body })
