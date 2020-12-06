/*
[Script]
^https:\/\/lcs-mobile-cops\.adobe\.io\/mobile_profile url script-response-body https://raw.githubusercontent.com/langkhach270389/Quantumult-X-LK/master/Scripts/langkhach/photoshop.js
[MITM]
hostname = lcs-mobile-cops.adobe.io
*/

let obj = JSON.parse($response.body)
let pro= obj["mobileProfile"];
pro["profileStatus"] = "PROFILE_AVAILABLE";
pro["legacyProfile"] = "{}";
pro["relationshipProfile"] = "[]";
$done({body: JSON.stringify(obj)})
