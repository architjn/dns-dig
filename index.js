var command = require('./command');

var ip4 = function (domain, options = {}) {
	let host = options.host ? [`@${options.host}`] : [];
	return command(['A', domain, ...host], { short: true }).then(r => { if (r && r.length > 0) return r.split('\n'); throw new Error(`queryA ENOTFOUND ${domain}`) });
}

var CNAME = function (domain, options = {}) {
	let host = options.host ? [`@${options.host}`] : [];
	return command(['CNAME', domain, ...host], { short: true }).then(r => { if (r && r.length > 0) return r.split('\n'); throw new Error(`queryCname ENOTFOUND ${domain}`) });
}

var A = function (domain, options = {}) {
	let host = options.host ? [`@${options.host}`] : [];
	return command(['A', domain, ...host], { short: true }).then(r => { if (r && r.length > 0) return r.split('\n'); throw new Error(`queryA ENOTFOUND ${domain}`) });
}

var mx = function (domain, options = {}) {
	let host = options.host ? [`@${options.host}`] : [];
	return command(['MX', domain, ...host], { short: true }).then(r => {
		if (r && r.length > 0) {
			var rec = r.split('\n');
			return rec.map(r => {
				return { exchange: r.split(' ')[1], priority: parseInt(r.split(' ')[0]) }
			})
		};
		throw new Error(`queryMx ENOTFOUND ${domain}`)
	});
}

var ns = function (domain, options = {}) {
	let host = options.host ? [`@${options.host}`] : [];
	return command(['NS', domain, ...host], { short: true }).then(r => { if (r && r.length > 0) return r.split('\n'); throw new Error(`queryNs ENOTFOUND ${domain}`) });
}

var txt = function (domain, options = {}) {
	let host = options.host ? [`@${options.host}`] : [];
	return command(['TXT', domain, ...host], { short: true }).then(r => {
		if (r && r.length > 0) {
			r = r.split('\n');
			r = r.map(r => {
				if (!r.startsWith('"')) return undefined;
				if (r.startsWith("\"")) r = r.substring(1)
				if (r.endsWith("\"")) r = r.substring(0, r.length - 1)
				r = r.split('" "').join('');
				return r;
			});
			return r.filter(r => r != undefined);
		}
		throw new Error(`queryTxt ENOTFOUND ${domain}`)
	});
}

module.exports = {
	resolveIp4: ip4,
	resolveCname: CNAME,
	resolveMx: mx,
	resolveNs: ns,
	resolveA: A,
	resolveTxt: txt,
}