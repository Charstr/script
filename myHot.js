let body = $response.body;
body = JSON.parse(body.data);
body.carousels={};
body = JSON.stringify(body);

$done({ body })
