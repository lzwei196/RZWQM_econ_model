module.exports = {
    location: function location(locationName) {
        sessionStorage.setItem('location', locationName)
    },
    project: function project(projectName) {
        sessionStorage.setItem('project', projectName)
    },
    mitigationMethod: function mitigationMethod(mitigationMethod) {
        sessionStorage.setItem('mitigation', mitigationMethod)
    },
    methodDetail: function methodDetail(methodDetail) {
        sessionStorage.setItem('methodDetail', JSON.stringify(methodDetail))
    },
    carbonTradePrice: function carbonTradePrice(carbonTradePrice) {
        sessionStorage.setItem('carbonTradePrice', JSON.stringify(carbonTradePrice))
    },
    projectDirectory: function projectDirectory(projectDirectory) {
        sessionStorage.setItem('projectDirectory', JSON.stringify(projectDirectory))
    },
    cropsWithPrice: function cropsWithPrice(cropsWithPrice) {
        sessionStorage.setItem('cropWithPrice', JSON.stringify(cropsWithPrice))
    },
    plant: function plant(plant) {
        sessionStorage.setItem('plant_date', JSON.stringify(plant))
    },
    currency_rate: function currency_rate(currency_rate) {
        sessionStorage.setItem('currency_rate', JSON.stringify(currency_rate))
    }
}