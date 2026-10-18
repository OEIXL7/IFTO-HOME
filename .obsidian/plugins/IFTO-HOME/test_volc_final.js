const crypto = require('crypto');
const https = require('https');
const AK = 'YOUR_VOLC_ACCESS_KEY_ID';
const SK = 'YOUR_VOLC_SECRET_ACCESS_KEY';

// COMPLETELY IDENTICAL to test_volc2.js sign function
function sign(action, method, payload) {
  method = method || 'GET';
  payload = payload || '';
  const region = 'cn-beijing', service = 'ark', host = 'open.volcengineapi.com';
  const version = '2024-01-01';
  const qs = `Action=${action}&Version=${version}`;
  const sha256 = s => crypto.createHash('sha256').update(s).digest('hex');
  const hmac = (k, s) => crypto.createHmac('sha256', k).update(s).digest();
  const now = new Date();
  const xDate = now.toISOString().replace(/[:-]/g, '').split('.')[0] + 'Z';
  const d = now.toISOString().split('T')[0].replace(/-/g, '');
  const hp = sha256(payload);
  const hd = { 'host': host, 'x-date': xDate, 'x-content-sha256': hp };

  if (method === 'POST') hd['content-type'] = 'application/json';

  const sh = Object.keys(hd).sort().join(';');
  const ch = Object.keys(hd).sort().map(k => k.toLowerCase() + ':' + hd[k].trim() + '\n').join('');
  const cr = [method, '/', qs, ch, sh, hp].join('\n');
  const hcr = sha256(cr);
  const cs = d + '/' + region + '/' + service + '/request';
  const sts = ['HMAC-SHA256', xDate, cs, hcr].join('\n');
  const kd = hmac(SK, d), kr = hmac(kd, region), ks = hmac(kr, service), ksg = hmac(ks, 'request');
  const sig = hmac(ksg, sts).toString('hex');
  const auth = `HMAC-SHA256 Credential=${AK}/${cs}, SignedHeaders=${sh}, Signature=${sig}`;
  return {
    url: 'https://' + host + '/?' + qs,
    headers: { 'Authorization': auth, 'X-Date': xDate, 'X-Content-Sha256': hp, 'Content-Type': 'application/json' },
    body: payload
  };
}

function call(action, method, bodyParams) {
  return new Promise(r => {
    const body = bodyParams ? JSON.stringify(bodyParams) : '';
    const s = sign(action, method, body);
    const u = new URL(s.url);
    const opts = { hostname: u.hostname, path: u.pathname + u.search, method: method || 'GET', headers: s.headers, timeout: 15000 };
    console.log(method, action, s.headers.Authorization.substring(0, 80) + '...');
    if (method === 'POST') {
      const req = https.request(opts, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => r({ s: res.statusCode, b: d })); });
      req.on('error', e => r({ s: 0, b: e.message }));
      if (body) req.write(body);
      req.end();
    } else {
      https.get(opts, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => r({ s: res.statusCode, b: d })); })
        .on('error', e => r({ s: 0, b: e.message }));
    }
  });
}

(async () => {
  // Test 1: GetAFPUsage GET - should work
  console.log('=== 1. GetAFPUsage GET ===');
  let r = await call('GetAFPUsage', 'GET');
  console.log('Status:', r.s, r.b.includes('Result') ? 'OK' : 'FAIL');

  // Test 2: GetUsageDetails POST
  console.log('\n=== 2. GetUsageDetails POST ===');
  const now = new Date();
  r = await call('GetUsageDetails', 'POST', {
    Filter: {
      StartTime: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`,
      EndTime: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    },
    QueryInterval: 'Hour'
  });
  console.log('Status:', r.s);
  try { console.log(JSON.stringify(JSON.parse(r.b), null, 2).substring(0, 500)); } catch (e) { console.log(r.b.substring(0, 200)); }
// Test 3: GetInferenceUsage POST
  console.log('\n=== 3. GetInferenceUsage POST ===');
  r = await call('GetInferenceUsage', 'POST', {
    StartTime: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`,
    EndTime: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
    QueryInterval: 'Hour'
  });
  console.log('Status:', r.s);
  try { console.log(JSON.stringify(JSON.parse(r.b), null, 2).substring(0, 800)); } catch (e) { console.log(r.b.substring(0, 300)); }
})();