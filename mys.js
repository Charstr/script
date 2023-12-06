// 去除米游社搜索栏的推荐
const body = $response.body;

if (body) {
    const url = $request.url;
    const cont = JSON.parse(body);

    if (/^https:\/\/bbs-api\.miyoushe\.com\/misc\/api\/getSiteHotKeyword/.test(url)) {
        cont.data = {};
    } else if (/^https:\/\/bbs-api\.miyoushe\.com\/apihub\/api\/home\/new/.test(url)) {
        cont.data.carousels = {};
    }

    $done({ body: JSON.stringify(cont) });
}
