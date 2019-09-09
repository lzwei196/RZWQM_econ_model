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

function dateConvertion(date){
    let dateStringUpdate = dateFormat(date, 'dd  mm  yyyy' )
    return dateStringUpdate;
}

function dateConvertionOneSpace(date){
    let dateStringUpdate = dateFormat(date, 'dd mm yyyy' )
    return dateStringUpdate;
}

function earlyDate(dateArray){
    let earlyDate = dateArray[0];
    dateArray.forEach(function(item,index){
        if(index < dateArray.length -1){
            if(earlyDate.getTime() < dateArray[index + 1].getTime()){
            return;
        } else{
            earlyDate = dateArray[index + 1]
        }
    }
    })
    return earlyDate;
}

function latestDate(dateArray){
    let latestDate = dateArray[0];
    dateArray.forEach(function(item,index){
        if(index < dateArray.length -1){
            if(latestDate.getTime() > dateArray[index + 1].getTime()){
            return;
        } else{
            latestDate = dateArray[index + 1]
        }
    }
    })
    return latestDate;
}

function generalInfo(generalInfoD, numberOfIrrigation){
    //console.log(generalInfoD)
    //console.log('number of irrigation:  ' + numberOfIrrigation)
    generalInfoD.splice(0,1,numberOfIrrigation)
    let generalInfoUpdated = generalInfoD.join('  ')
    return generalInfoUpdated
}

function specifiedInfo(ssPojo){
    let dataArray = ssPojo['datePojo'];
    let dateArray = dataArray.map(function(item){
        let date = new Date(item[0]);
        return date;
    })
    //getting the latest and early date of irrigation
    let latestD = latestDate(dateArray);
    let earlyD = earlyDate(dateArray);
    let latestDateString = dateConvertionOneSpace(latestD);
    let earlyDateString = dateConvertionOneSpace(earlyD)

    let numOfPractice = dateArray.length;

    let irriArray = dataArray.map(function(item){
        return item[1];
    })

    let irriArrayString = irriArray.join('  ')

    let dateArrayString = dateArray.map(function(item){
        return dateConvertion(item);
    })
    //pul all the date together
    let specifiedInfoUpdate = (1 + '  ' 
                                 + ssPojo['typeOfR'] + '  '
                                 + ssPojo['timingOfIrrigation'] + '  '
                                 + ssPojo['timingOfIrrigation'] + ' '
                                 + earlyDateString + ' '
                                 + latestDateString + ' '
                                 + ssPojo['minDays'] + ' '
                                 + ssPojo['maxDepth'] + '  '
                                 + ssPojo['sRate'] + '  ')
    return {specifiedInfoUpdate, numOfPractice, irriArrayString, dateArrayString};
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
        //update the second line of the array, with specfic info for the opration
        newData.push(specifiedInfo(ssPojo).specifiedInfoUpdate);
        //update the number of practice
        newData.push(specifiedInfo(ssPojo).numOfPractice);
        //update the specific date for each practice
        specifiedInfo(ssPojo).dateArrayString.forEach(function(item){
            newData.push(item)
        })
        //update the number of practice
        newData.push(specifiedInfo(ssPojo).numOfPractice);
        //update the value of irri for each practice
        newData.push(specifiedInfo(ssPojo).irriArrayString);

        //console.log(newData)
        return newData;
    }
}