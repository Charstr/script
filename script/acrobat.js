/*
https://lcs-mobile-cops.adobe.io/mobile_profile/nul/v2
^https:\/\/lcs-mobile-cops\.adobe\.io\/mobile_profile

*/
let body = JSON.parse($response.body)

body = {
    "mobileProfileSpecVersion": "1.0",
    "mobileProfile": {
      "id": "ab53b57f-e9f5-4977-8794-cf1a231fdd26",
      "previousProfileId": "30097aa5-0235-4793-88df-04c5145a00b1",
      "serverId": "lcs-mobile-cops",
      "profileStatus": "PROFILE_AVAILABLE",
      "appLicenseMode": "FREEMIUM",
      "legacyProfile": "{\"licenseId\":\"TEMP_LICENSE_PROD\",\"licenseType\":3,\"licenseVersion\":\"91.0\",\"effectiveEndTimestamp\":3607253483534,\"graceTime\":0,\"licensedFeatures\":[],\"enigmaData\":{\"productId\":118,\"serialKey\":\"719594172484074650698776\",\"clearSerialKey\":\"90970938077827684226\",\"locale\":\"ALL\",\"associatedLocales\":\"ALL\",\"platform\":0,\"isk\":1184999,\"customerId\":0,\"deliveryMethod\":3,\"pc\":false,\"rb\":false}}",
      "relationshipProfile": "[{\"profileGenerationTimestamp\":3607167328263,\"licenseId\":\"TEMP_LICENSE_PROD\",\"licenseExpiryTimestamp\":3607253483534,\"appEntitlementStatus\":\"SUBSCRIPTION\",\"activationType\":\"NAMED_USER\",\"billingStatus\":\"NORMAL\",\"usedForLegacyProfile\":true,\"licenseExpiryWarningControl\":{\"warningStartTimestamp\":3606648683534,\"warningInterval\":0}}]",
      "userProfile": "{\"userId\":\"066956375FAC76760A495CD9@AdobeID\",\"firstName\":\"erence\",\"lastName\":\"lim\",\"email\":\"iri.mascot@gmail.com\",\"countryCode\":\"HK\",\"displayName\":\"lim%20erence\",\"accountType\":\"type1\"}",
      "additionalLegacyProfiles": "{}",
      "appProfile": "{}",
      "controlProfile": {
        "cacheRefreshControl": {
          "appRefreshInterval": 85680000
        }
      }
    },
    "workflow": null
  }
body = JSON.stringify(body)
$done({body})
