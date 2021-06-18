var command = require('./command');

var ip4 = function (domain) {
	return command(['A', domain], { short: true }).then(r => { if (r) return r; throw new Error(`queryA ENOTFOUND ${domain}`) });
}

var CNAME = function (domain) {
	return command(['CNAME', domain], { short: true }).then(r => { if (r && r.length > 0) return r.split('\n'); throw new Error(`queryCname ENOTFOUND ${domain}`) });
}

var mx = function (domain) {
	return command(['MX', domain], { short: true }).then(r => {
		if (r && r.length > 0) {
			var rec = r.split('\n');
			return rec.map(r => {
				return { exchange: r.split(' ')[1], priority: parseInt(r.split(' ')[0]) }
			})
		};
		throw new Error(`queryMx ENOTFOUND ${domain}`)
	});
}

var ns = function (domain) {
	return command(['NS', domain], { short: true }).then(r => { if (r && r.length > 0) return r.split('\n'); throw new Error(`queryNs ENOTFOUND ${domain}`) });
}

var txt = function (domain) {
	return command(['TXT', domain], { short: true }).then(r => {
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
	resolveTxt: txt
}