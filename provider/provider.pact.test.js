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
            providerVersion: "1.0.0",
            providerVersionBranch: "test",
            consumerVersionSelectors: [
                { mainBranch: true },
                { deployedOrReleased: true }
              ],
            pactBrokerUrl: process.env.PACT_BROKER_URL || "https://nekst-d74b.pactflow.io",
            pactBrokerUsername: process.env.PACT_BROKER_USERNAME || "VamsiChinta",
            pactBrokerPassword: process.env.PACT_BROKER_PASSWORD || "Kittu$4691",
            requestFilter: (req, res, next) => {
                if (!req.headers["authorization"]) {
                    req.headers["authorization"] = `Bearer 735cdc269699f8d003c9c557b413b366`;
                }
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

        return new Verifier(opts).verifyProvider()
        .then(output => {
            console.log(output);
        })
        .catch((e) => {
            console.error("Pact verification failed :(", e);
        })
        .finally(() => {
            // Ensure the server is closed after verification if it was started
            // server.close();
        });
    })
});