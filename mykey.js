let body = $response.body;
body = JSON.parse(body);
body.data={};
body = JSON.stringify(body);

$done({ body })
