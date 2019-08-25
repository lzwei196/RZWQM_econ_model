module.exports = {
    location : function location(locationName){
        sessionStorage.setItem('location',locationName)
    },
    project : function project(projectName){
        sessionStorage.setItem('project',projectName)
    },
    mitigationMethod: function mitigationMethod(mitigationMethod){
        sessionStorage.setItem('mitigation',mitigationMethod)
    },
    methodDetail : function methodDetail(methodDetail){
        sessionStorage.setItem('methodDetail',JSON.stringify(methodDetail))
    }
}