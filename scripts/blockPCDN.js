// ==UserScript==
// @name         blockPCDN
// @version      0.0.1
// @description  useful tweaks for bilibili.com
// @author       annarua
// @match        https://*.bilibili.com/*
// @run-at       document-body
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_notification
// ==/UserScript==

// 去掉叔叔去世时的全站黑白效果
GM_addStyle("html, body { -webkit-filter: none !important; filter: none !important; }");

// 没用的 URL 参数
const uselessUrlParams = [
	'buvid',
	'is_story_h5',
	'launch_id',
	'live_from',
	'mid',
	'session_id',
	'timestamp',
	'up_id',
	'vd_source',
	/^share/,
	/^spm/,
];

// Block WebRTC，CNM 陈睿你就缺这点棺材钱？
try {
	Object.defineProperty(unsafeWindow, 'webkitRTCPeerConnection', { value: undefined, enumerable: false, writable: false });
} catch (e) { }

// 移除鸿蒙字体，系统自带它不香吗？
window.addEventListener('load', function () {
	document.body.classList.remove('harmony-font');
})


// 修复文章区复制
if (location.href.startsWith('https://www.bilibili.com/read/cv')) {
	unsafeWindow.original.reprint = "1";
	document.querySelector('.article-holder').classList.remove("unable-reprint");
	document.querySelector('.article-holder').addEventListener('copy', e => e.stopImmediatePropagation(), true);
}

// 去 P2P CDN
Object.defineProperty(unsafeWindow, 'PCDNLoader', { value: class { }, enumerable: false, writable: false });
Object.defineProperty(unsafeWindow, 'BPP2PSDK', { value: class { on() { } }, enumerable: false, writable: false });
Object.defineProperty(unsafeWindow, 'SeederSDK', { value: class { }, enumerable: false, writable: false });
if (location.href.startsWith('https://www.bilibili.com/video/') || location.href.startsWith('https://www.bilibili.com/bangumi/play/')) {
	let cdnDomain;

	function replaceP2PUrl(url) {
		cdnDomain ||= document.head.innerHTML.match(/up[\w-]+\.bilivideo\.com/)?.[0];

		try {
			const urlObj = new URL(url);
			const hostName = urlObj.hostname;
			if (urlObj.hostname.endsWith(".mcdn.bilivideo.cn") || urlObj.hostname.match(/cn-[a-zA-Z0-9-]+\.bilivideo\.com/)) {
				urlObj.host = cdnDomain || 'upos-sz-mirrorali.bilivideo.com';
				urlObj.port = 443;
				console.warn(`更换视频源: ${hostName} -> ${urlObj.host}`);
				return urlObj.toString();
			} else if (urlObj.hostname.endsWith(".szbdyd.com")) {
				urlObj.host = urlObj.searchParams.get('xy_usource');
				urlObj.port = 443;
				console.warn(`更换视频源: ${hostName} -> ${urlObj.host}`);
				return urlObj.toString();
			}
			return url;
		} catch (e) {
			return url;
		}
	}

	function replaceP2PUrlDeep(obj) {
		for (const key in obj) {
			if (typeof obj[key] === 'string') {
				obj[key] = replaceP2PUrl(obj[key]);
			} else if (typeof obj[key] === 'array' || typeof obj[key] === 'object') {
				replaceP2PUrlDeep(obj[key]);
			}
		}
	}

	replaceP2PUrlDeep(unsafeWindow.__playinfo__);

	(function (open) {
		unsafeWindow.XMLHttpRequest.prototype.open = function () {
			try {
				arguments[1] = replaceP2PUrl(arguments[1]);
			} finally {
				return open.apply(this, arguments);
			}
		}
	})(unsafeWindow.XMLHttpRequest.prototype.open);
}

// 检查是否为 https://live.bilibili.com/xxxx 页面
if (location.href.startsWith('https://live.bilibili.com/')) {

	// 定义需要匹配的正则表达式数组
	const regexPatterns = [
		"[a-zA-Z0-9-]+-pcdn-[a-zA-Z0-9-]+\\.biliapi\\.net",
		"stun-(.*)\\.chat\\.bilibili\\.com",
		"(.*)-p2p-(.*)\\.chat\\.bilibili\\.com",
		"(.*)-live-tracker-(.*)\\.chat\\.bilibili\\.com"
	];

	// 重写 XMLHttpRequest 的 open 方法
	(function (open) {
		unsafeWindow.XMLHttpRequest.prototype.open = function () {
			try {
				// 判断请求的 URL 是否匹配正则表达式数组中的任意一项
				const urlToCheck = arguments[1];
				if (regexPatterns.some(pattern => new RegExp(pattern).test(urlToCheck))) {
					// 如果匹配，则断开连接
					console.warn(`断开连接: ${urlToCheck}`);
					return;
				}
			} catch (e) {
				console.error('发生错误:', e);
			} finally {
				// 调用原始的 open 方法
				return open.apply(this, arguments);
			}
		}
	})(unsafeWindow.XMLHttpRequest.prototype.open);
}

// 去除地址栏多余参数
unsafeWindow.history.replaceState(undefined, undefined, removeTracking(location.href));
const pushState = unsafeWindow.history.pushState;
unsafeWindow.history.pushState = function (state, unused, url) {
	return pushState.apply(this, [state, unused, removeTracking(url)]);
}
const replaceState = unsafeWindow.history.replaceState;
unsafeWindow.history.replaceState = function (state, unused, url) {
	return replaceState.apply(this, [state, unused, removeTracking(url)]);
}

function removeTracking(url) {
	if (!url) return url;
	try {
		const [base, search] = url.split('?');
		if (!search) return url;
		const searchParams = new URLSearchParams('?' + search);
		const keys = Array.from(searchParams.keys());
		for (const key of keys) {
			uselessUrlParams.forEach(item => {
				if (typeof item === 'string') {
					if (item === key) searchParams.delete(key);
				} else if (item instanceof RegExp) {
					if (item.test(key)) searchParams.delete(key);
				}
			});
		}
		if (location.pathname === base && !searchParams.size) return;
		return [base, searchParams.toString()].filter(Boolean).join('?');
	} catch (e) {
		return url;
	}
}

// 去掉 B 站的傻逼上报
!function () {
	const oldFetch = unsafeWindow.fetch;
	unsafeWindow.fetch = function (url) {
		if (typeof url === 'string' && url.includes('data.bilibili.com'))
			return Promise.resolve(new Response());
		return oldFetch.apply(this, arguments);
	}
	const oldSend = unsafeWindow.XMLHttpRequest.prototype.open;
	unsafeWindow.XMLHttpRequest.prototype.open = function (method, url) {
		if (typeof url === 'string' && url.includes('data.bilibili.com')) {
			this.send = function () { };
			return;
		}
		return oldSend.apply(this, arguments);
	}
	unsafeWindow.navigator.sendBeacon = () => Promise.resolve();

	unsafeWindow.MReporter = {
		appear() { },
		click() { },
		tech() { },
		pv() { },
		import: { auto() { } },
	}
	const sentryHub = class { bindClient() { } }
	const fakeSentry = {
		SDK_NAME: 'sentry.javascript.browser',
		SDK_VERSION: '0.0.0',
		BrowserClient: class { },
		Hub: sentryHub,
		Integrations: { Vue: class { } },
		init() { },
		configureScope() { },
		getCurrentHub: () => new sentryHub(),
		setContext() { },
		setExtra() { },
		setExtras() { },
		setTag() { },
		setTags() { },
		setUser() { },
		wrap() { },
	}
	if (!unsafeWindow.Sentry || unsafeWindow.Sentry.SDK_VERSION !== fakeSentry.SDK_VERSION) {
		if (unsafeWindow.Sentry) { delete unsafeWindow.Sentry }
		Object.defineProperty(unsafeWindow, 'Sentry', { value: fakeSentry, enumerable: false, writable: false });
	}
	Object.defineProperty(unsafeWindow, 'ReporterPb', { value: class { click() { } custom() { } exposure() { } report() { } tech() { } pv() { } }, enumerable: false, writable: false });
}()