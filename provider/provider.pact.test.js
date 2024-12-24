const { Verifier } = require('@pact-foundation/pact');
// const controller = require('./product.controller');
// const Product = require('./product');

//Setup provider server to verify
// const app = require('express')();
// const authMiddleware = require('../middleware/auth.middleware');
// app.use(authMiddleware);
// app.use(require('./product.routes'));
// const server = app.listen("8080");

describe("Pact Verification", () => {
    it("validates the expectations of ProductService", () => {
        const opts = {
            logLevel: "INFO",
            providerBaseUrl: "https://staging.assurance.fssc.com/webservices",
            provider: "MicroService",
            providerVersion: process.env.GIT_COMMIT,
            providerVersionBranch: process.env.GIT_BRANCH,
            consumerVersionSelectors: [{
                latest: true
              }],
            pactBrokerUrl: process.env.PACT_BROKER_URL || "https://nekst-d74b.pactflow.io",
            pactBrokerUsername: process.env.PACT_BROKER_USERNAME || "VamsiChinta",
            pactBrokerPassword: process.env.PACT_BROKER_PASSWORD || "Kittu$4691",
            requestFilter: (req, res, next) => {
                if (!req.headers["authorization"]) {
                    next();
                    return;
                }
                req.headers["authorization"] = `Bearer 503f22162544a82f68f68a8ff4196e80`;
                next();
            },
         
        };

        if (process.env.CI || process.env.PACT_PUBLISH_RESULTS) {
            Object.assign(opts, {
                publishVerificationResult: true,
            });
        }
        
        // return new Verifier(opts).verifyProvider().then(output => {
        //     console.log(output);
        // }).finally(() => {
        //     server.close();
        // });

        return new Verifier(opts).verifyProvider().then(output => {
            console.log(output);
        }).catch((e) => {
            console.error("Pact verification failed :(", e);
        });
    })
});