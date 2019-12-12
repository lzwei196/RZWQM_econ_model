const rp = require('request-promise');
const cheerio = require('cheerio');
const url = {
             'Europe from Markets insider':'https://markets.businessinsider.com/commodities/co2-european-emission-allowances',
             'commodity':'https://www.quandl.com/api/v3/datasets/'
}
var ss = require('./sessionStorage').carbonTradePrice;
const options = {
    uri:url["Europe from Markets insider"],
    headers:{
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
    }
}



module.exports = {
      priceScraper: function priceScraper(){
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
     commodityPrice : function commodityPrice(cropApi){
        var crop_url =  url['commodity'];
        crop_url = crop_url + cropApi + '?limit=1&api_key=ytD8yEU6y_Ec7k81LETs'
        const commodityOptions = {
            uri:crop_url,
            json: true
        }
        return rp(commodityOptions)
        .then(function(response){
            return response
        })
}
}
