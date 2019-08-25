var connect = require('trilogy').connect;

const db = connect('database.db', { client: 'sqlite3' })

async function createModel(nameOfTheColumn,schema,db){
    const theModel = await db.model(nameOfTheColumn,schema)

    //await db.model('subirrigation')
    theModel.create({
        earlyDate:'111',
        endDate:'222',
        irrigationTiming:1
    })
}

async function find(){

}

module.exports = {
    db:db,
    create:createModel
}