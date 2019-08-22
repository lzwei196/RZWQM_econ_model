var connect = require('trilogy').connect;

const db = connect('database.db', { client: 'sqlite3' })

async function createT(){
    const theModel = await db.model('subirrigation', {
        earlyDate: String,
        endDate: String,
        irrigationTiming: Number
      })

    //await db.model('subirrigation')
    theModel.create({
        earlyDate:'111',
        endDate:'222',
        irrigationTiming:1
    })
}

module.exports = {
    dbJS:db,
    create:createT()
}