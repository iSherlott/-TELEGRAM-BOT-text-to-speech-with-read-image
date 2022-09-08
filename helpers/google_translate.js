const axios = require("axios");

const { google_token } = require("./config/config.json");

module.exports = async (message) => {
    try {
        const encodedParams = new URLSearchParams();
        encodedParams.append("q", message);
        encodedParams.append("target", "en");
        encodedParams.append("source", "pt");
    
        const options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': google_token,
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            data: encodedParams
        };
    
        const response = await axios.request(options)
    
        return {status: true, data: response["data"]["data"]["translations"][0]["translatedText"]}
    } catch (error) {
        console.log(error)
        return {status: false, data: null}
    }
    
}