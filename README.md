# dns-dig
DNS package which works similar to native DNS package of Node but internally using dig for fast updations

## Installation

```
npm install dns-dig --save
```

## Usage
```js
var dns = require('dns-dig')()

dns.resolveIp4('example.com').then(ip4 => {
  console.log(ip4); // ["93.184.216.34"]
});

```


## API

### Initialize

The module exposes an object with different function which can be called with an
optional options object:

```js
var dns = require('dns-dig');
```

The options are:

- `host (Optional)` - If not set then will automatically utilize available host for query. Otherwise when an IP of any DNS provider is supplied, then it queries that specific host.

#### `dns.resolveIp4(domainName, {host: '1.1.1.1'})`

Takes a string and returns an array of IPv4 addresses associated with the supplied domain if any.

#### `dns.resolveCname(domainName, {host: '1.1.1.1'})`

Takes a string and returns an array of CNAME Records associated with the supplied domain if any.

#### `dns.resolveMx(domainName, {host: '1.1.1.1'})`

Takes a string and returns an array of MX Records associated with the supplied domain if any.

#### `dns.resolveNs(domainName, {host: '1.1.1.1'})`

Takes a string and returns an array of NS Records associated with the supplied domain if any.

#### `dns.resolveTxt(domainName, {host: '1.1.1.1'})`

Takes a string and returns an array of TXT Records associated with the supplied domain if any.


## License

MIT
