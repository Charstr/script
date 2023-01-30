let body = $response.body;
body = JSON.parse(body);
body.data.carousels={};
body = JSON.stringify(body);

$done({ body })
