let body = $response.body;
body = JSON.parse(body);
if(body?.retcode){
    body.data={};
}
body = JSON.stringify(body);

$done({ body })
