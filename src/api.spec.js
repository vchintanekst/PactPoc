import API from "./api";
import nock from "nock";
import axios from 'axios'

axios.defaults.adapter = 'http' // https://github.com/nock/nock?tab=readme-ov-file#axios

describe("API", () => {

    test("getting all list of ACB", async () => {
        const accridationbodies = [
            {
            "name": "Erwin AB",
            "code": "EAB",
            "country": "Netherlands",
            "website": "erwinab.nl",
            "address": "Lieven de Keystraat 113 ,something ,Rotterdam ,3067KH"
            },
            {
                "name": "Monaco AB",
                "code": "MAB",
                "country": "Andorra",
                "website": "",
                "address": "s ,s ,s ,s"
            }
        ];
        nock(API.url)
            .post('/AuditsV2/AccreditationBodiesList')
            .reply(200,
                accridationbodies,
                {'Access-Control-Allow-Origin': '*'});
        const respProducts = await API.getAllProducts();
        expect(respProducts).toEqual(accridationbodies);
    });

    // test("get product ID 50", async () => {
    //     const product = {
    //         "id": "50",
    //         "type": "CREDIT_CARD",
    //         "name": "28 Degrees",
    //         "version": "v1"
    //     };
    //     nock(API.url)
    //         .get('/product/50')
    //         .reply(200, product, {'Access-Control-Allow-Origin': '*'});
    //     const respProduct = await API.getProduct("50");
    //     expect(respProduct).toEqual(product);
    // });
});
