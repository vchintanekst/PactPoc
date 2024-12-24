import path from "path";
import {
  PactV3,
  MatchersV3,
  SpecificationVersion,
} from "@pact-foundation/pact";
import { API } from "./api";
const { eachLike, like } = MatchersV3;

const provider = new PactV3({
  consumer: "FrontendWebsite",
  provider: "MicroService",
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  logLevel: "warn",
  dir: path.resolve(process.cwd(), "pacts"),
  spec: SpecificationVersion.SPECIFICATION_VERSION_V2,
  host: "127.0.0.1"
});

describe("API Pact test", () => {
  describe("getting all list of ACB", () => {
    test("ACB exists", async () => {
      // set up Pact interactions
      await provider.addInteraction({
        states: [{ description: "ACB exist" }],
        uponReceiving: "get all ACB's",
        withRequest: {
          method: "POST",
          path: "/AuditsV2/AccreditationBodiesList",
          // headers: {
          //   Authorization: "1d175c29586676f1e4d7e75cb0229b48",
          // },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: eachLike([{
            "name": "Kittu",
            "code": "VC",
            "country": "Netherlands",
            "website": "erwinab.nl",
            "address": "Lieven de Keystraat 113 ,something ,Rotterdam ,3067KH"
          }
          ]),
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        // make request to Pact mock server
        let product;

        try {
           product = await api.getAllProducts();
      } catch (e) {
          if (e instanceof AggregateError) {
              console.log(e.name); // "AggregateError"
              console.log(e.message); // "Validation failed"
              e.errors.forEach(err => console.log(err.message));
              // Output:
              // "Name is required"
              // "Email is required"
              // "User must be at least 18 years old"
          }
      }
        //const products = await api.getAllProducts();

         
      });
    });

//     test("no products exists", async () => {
//       // set up Pact interactions
//       await provider.addInteraction({
//         states: [{ description: "no products exist" }],
//         uponReceiving: "get all products",
//         withRequest: {
//           method: "GET",
//           path: "/products",
//           headers: {
//             Authorization: like("Bearer 2019-01-14T11:34:18.045Z"),
//           },
//         },
//         willRespondWith: {
//           status: 200,
//           headers: {
//             "Content-Type": "application/json; charset=utf-8",
//           },
//           body: [],
//         },
//       });

//       await provider.executeTest(async (mockService) => {
//         const api = new API(mockService.url);

//         // make request to Pact mock server
//         const product = await api.getAllProducts();

//         expect(product).toStrictEqual([]);
//       });
//     });

//     test("no auth token", async () => {
//       // set up Pact interactions
//       await provider.addInteraction({
//         states: [{ description: "products exist" }],
//         uponReceiving: "get all products",
//         withRequest: {
//           method: "GET",
//           path: "/products",
//         },
//         willRespondWith: {
//           status: 401,
//         },
//       });

//       await provider.executeTest(async (mockService) => {
//         const api = new API(mockService.url);

//         // make request to Pact mock server
//         await expect(api.getAllProducts()).rejects.toThrow(
//           "Request failed with status code 401"
//         );
//       });
//     });    
//   });

//   describe("getting one product", () => {
//     test("ID 10 exists", async () => {
//       // set up Pact interactions
//       await provider.addInteraction({
//         states: [{ description: "product with ID 10 exists" }],
//         uponReceiving: "get product with ID 10",
//         withRequest: {
//           method: "GET",
//           path: "/product/10",
//           headers: {
//             Authorization: like("Bearer 2019-01-14T11:34:18.045Z"),
//           },
//         },
//         willRespondWith: {
//           status: 200,
//           headers: {
//             "Content-Type": "application/json; charset=utf-8",
//           },
//           body: like({
//             id: "10",
//             type: "CREDIT_CARD",
//             name: "28 Degrees",
//           }),
//         },
//       });

//       await provider.executeTest(async (mockService) => {
//         const api = new API(mockService.url);

//         // make request to Pact mock server
//         const product = await api.getProduct("10");

//         expect(product).toStrictEqual({
//           id: "10",
//           type: "CREDIT_CARD",
//           name: "28 Degrees",
//         });
//       });
//     });

//     test("product does not exist", async () => {
//       // set up Pact interactions
//       await provider.addInteraction({
//         states: [{ description: "product with ID 11 does not exist" }],
//         uponReceiving: "get product with ID 11",
//         withRequest: {
//           method: "GET",
//           path: "/product/11",
//           headers: {
//             Authorization: like("Bearer 2019-01-14T11:34:18.045Z"),
//           },
//         },
//         willRespondWith: {
//           status: 404,
//         },
//       });

//       await provider.executeTest(async (mockService) => {
//         const api = new API(mockService.url);

//         // make request to Pact mock server
//         await expect(api.getProduct("11")).rejects.toThrow(
//           "Request failed with status code 404"
//         );
//       });
//     });

//     test("no auth token", async () => {
//       // set up Pact interactions
//       await provider.addInteraction({
//         states: [{ description: "product with ID 10 exists" }],
//         uponReceiving: "get product by ID 10 with no auth token",
//         withRequest: {
//           method: "GET",
//           path: "/product/10",
//         },
//         willRespondWith: {
//           status: 401,
//         },
//       });

//       await provider.executeTest(async (mockService) => {
//         const api = new API(mockService.url);

//         // make request to Pact mock server
//         await expect(api.getProduct("10")).rejects.toThrow(
//           "Request failed with status code 401"
//         );
//       });
//     });
   });
});
