hostname = oauth.secure.pixiv.net

^https://oauth.secure.pixiv.net/auth/token url response-body "is_premium":(.*?),"x_restrict" response-body "is_premium":true,"x_restrict"
