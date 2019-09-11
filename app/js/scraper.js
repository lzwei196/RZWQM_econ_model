const rp = require('request-promise');
const cheerio = require('cheerio');
const url = {
             'Europe from Markets insider':'https://markets.businessinsider.com/commodities/co2-european-emission-allowances'
}

const options = {
    uri:url["Europe from Markets insider"],
    headers:{
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
    }
}

    rp(options)
    .then(function (html) {
    // REQUEST SUCCEEDED
    const $ = cheerio.load(html);
    var price = $('.push-data').text();
    return price;
    })
    .catch(function (err) {
    // REQUEST FAILED: print the error
});


module.exports = {
      priceScraper:price
    }

