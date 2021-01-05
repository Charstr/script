/*
host = nmb.fastmirror.org

^https?://nmb\.fastmirror\.org/Api/(thread|showf)
*/
const path1 = "/Api/showf"
const path2 = "/Api/thread"

const url = $request.url;
let body = $response.body;
if(url.indelOf(path1) != -1){
    body[0] = '';
    body = JSON.stringify(body)
}
if(url.indelOf(path2) != -1){
    body.reply[0] = '';
    body = JSON.stringify(body)
}

$done({body})
