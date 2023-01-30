// 去除米游社搜索栏的推荐
let body = $response.body; 
if (body) { 
    switch (!0) { 
        case /^https:\/\/bbs-api\.miyoushe\.com\/misc\/api\/getSiteHotKeyword/.test($request.url):
            cont = JSON.parse(body);
            cont.data={};
            body = JSON.stringify(cont);
        break;
        case /^https:\/\/bbs-api\.miyoushe\.com\/apihub\/api\/home\/new/.test($request.url): 
            cont = JSON.parse(body);
            cont.data.carousels={};
            body = JSON.stringify(cont);
        break;
    }
}
$done({ body })
