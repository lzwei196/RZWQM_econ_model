//regex to extract numbers
var regex = /[+-]?((\.\d+)|(\d+(\.\d+)?)([eE][+-]?\d+)?)/g;
module.exports = {
    subirrigation: function subirrigation(datData){
        //default value of parameters, no subirrigation
        const defaultVal = '0  0  0  0.0  0.0  20.0  0.0  0'
        //to update the parameters in the dat file, it's necessary to locate the the line number of the designated parameters
        //find which line the parameter of subirrigation starts
        console.log(datData)
        lineNum = (datData.indexOf('=   . . .  repeat Rec 2-4 for each operation')) + 2;
        //to calculate how many lines needs to be spliced
        numToSplice = datData.length - lineNum;
        console.log("num  " + lineNum + 'splice  ' + numToSplice);
        let newData = datData;
        newData.splice(lineNum,numToSplice,defaultVal);
    }
}