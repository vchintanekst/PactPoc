import axios from 'axios';
//axios.defaults.adapter = 'http' // https://github.com/nock/nock?tab=readme-ov-file#axios
export class API {

    constructor(url) {
        if (url === undefined || url === "") {
            url = process.env.REACT_APP_API_BASE_URL;
        }
      this.url = url
    }

    withPath(path) {
        if (!path.startsWith("/")) {
            path = "/" + path
        }
        return `${this.url}${path}`
    }

    generateAuthToken() {
        return "Bearer 031bfe220d3b51b7ecf5ef778b66bd06"
    }

    async getAllProducts() {
        return axios.post(this.withPath("/AuditsV2/AccreditationBodiesList"), {
            // headers: {
            //     Authorization: "1d175c29586676f1e4d7e75cb0229b48",
            // }
        })
            .then(r => r.data);
    }

    // async getProduct(id) {
    //     return axios.get(this.withPath("/product/" + id), {
    //         headers: {
    //             "Authorization": this.generateAuthToken()
    //         }
    //     })
    //         .then(r => r.data);
    // }
}

export default new API(process.env.REACT_APP_API_BASE_URL);