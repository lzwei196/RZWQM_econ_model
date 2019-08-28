var dateFormat = require('dateFormat');
//regex to extract numbers
var regex = /[+-]?((\.\d+)|(\d+(\.\d+)?)([eE][+-]?\d+)?)/g;
//var regex = /^(\d+\.?\d{0,9}|\.\d{1,9})$/

//function to extract the numbers from a string
function extractNumbers(string){
    console.log(string)
    let numbers = string.match(regex).map(Number);
    console.log(numbers)
    return numbers;
}
function dateConvertion(dateString){
    let date = new Date(dateString)
    let dateStringUpdate = dateFormat(earlyDate, 'dd mm yyyy' )
    return dateStringUpdate;
}

function generalInfo(generalInfoD, numberOfIrrigation){
    console.log(generalInfoD)
    console.log('number of irrigation:  ' + numberOfIrrigation)
    generalInfoD.splice(0,1,numberOfIrrigation)
    let generalInfoUpdated = generalInfoD.join('  ')
    return generalInfoUpdated
}

function specifiedInfo(ssPojo){
    let dataArray = ssPojo['datePojo'];
    let dateArray = dataArray.map(function(item){
        return item[0];
    })
    console.log(dateArray)
    let specifiedInfoUpdate = (1 + '  ' 
                                 + ssPojo['typeOfR'] + '  '
                                 + ssPojo['timingOfIrrigation'] + '  '
                                 + ssPojo['timingOfIrrigation'] + ' '
                                 + ssPojo[''])
}

module.exports = {
    subirrigation: function subirrigation(datData){
        let ssPojo = JSON.parse(sessionStorage.getItem('methodDetail'));
        //default value of parameters, no subirrigation
        const defaultVal = '0  0  0  0.0  0.0  20.0  0.0  0'
        //to update the parameters in the dat file, it's necessary to locate the the line number of the designated parameters
        //find which line the parameter of subirrigation starts
        //console.log(datData)
        lineNum = (datData.indexOf('=   . . .  repeat Rec 2-4 for each operation')) + 2;
        //to calculate how many lines needs to be spliced
        numToSplice = datData.length - lineNum;
        //onsole.log("num    " + lineNum + 'splice    ' + numToSplice);
        let newData = datData;
        let generalInfoUpdated = generalInfo(extractNumbers(datData[lineNum]),ssPojo['numberOfIrrigation']);
        
        //to reset
        //newData.splice(lineNum,numToSplice,defaultVal);

        //updating the general info into the dat array
        newData.splice(lineNum,numToSplice,generalInfoUpdated);
        specifiedInfo(ssPojo,'2012/02/02')
        //console.log(newData)
        return newData;
    }
}