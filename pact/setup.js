const path = require('path');
const Pact = require('@pact-foundation/pact').Pact;

global.port = 3003;
global.provider = new Pact({
    cors: true,
    port: global.port,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    loglevel: 'debug',
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 3,
    pactfileWriteMode: 'update',
    consumer: 'metric-consumer',
    provider: 'metric-provider',
    host: '127.0.0.1'
});
