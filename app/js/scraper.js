const rp = require('request-promise');
const cheerio = require('cheerio');
const url = {
    'Europe from Markets insider': 'https://markets.businessinsider.com/commodities/co2-european-emission-allowances',
    'commodity': 'https://www.quandl.com/api/v3/datasets/',
    'currency_rate': 'https://api.exchangeratesapi.io/latest?base='
}
var ss = require('./sessionStorage').carbonTradePrice;
var ss_currency = require('./sessionStorage').currency_rate;
const options = {
    uri: url["Europe from Markets insider"],
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
    }
}



module.exports = {
    priceScraper: function priceScraper() {
        rp(options)
            .then(function (html) {
                // REQUEST SUCCEEDED
                const $ = cheerio.load(html);
                var price = $('.push-data').text();
                ss(price)
                console.log(price)
                return price;
            })
            .catch(function (err) {
                // REQUEST FAILED: print the error
            });
    },
    commodityPrice: async function commodityPrice(cropApi) {
        var crop_url = url['commodity'];
        crop_url = crop_url + cropApi + '?limit=1&api_key=ytD8yEU6y_Ec7k81LETs'
        const commodityOptions = {
            uri: crop_url,
            json: true
        }
        const response = await rp(commodityOptions);
        return response;
    },
    currency_rate: function currency_rate(country) {
        const currency_options = {
            uri: url['currency_rate'] + country,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
            },
            json: true
        }
        rp(currency_options)
            .then(function (element) {
                ss_currency(element['rates'])
            })
    }
}