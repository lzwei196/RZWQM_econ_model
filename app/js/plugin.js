  //loading up the required depenency variable
  var app = require('electron').remote; 
  var dialog = require('electron').remote.dialog;
  var fs = require('fs')

  //regex to extract numbers
  var regex = /[+-]?((\.\d+)|(\d+(\.\d+)?)([eE][+-]?\d+)?)/g;

  function writeToLocal(data){
    fs.writeFile("C:\\GHG-SE\\GHG-SE-FD\\RZWQM.DAT",data.join("\n"), function(err){
        if (err) return console.log(err);
    })
}

function readData(){
    // let filepath = chooseFilePath();
    // let the user choose the analysis file and read the data from it.
     let resultFilepath = chooseFilePath("Please choose the analysis file.");

     //let data = fs.readFileSync(filepath).toString().split("\n");
     let resultData = fs.readFileSync(resultFilepath).toString().split("\n");
     //data.splice(974,2,"0  0  0  0.0  0.0  20.0  0.0  0")
     //console.log(data);
     resultData.splice(0,23);
     //writeToLocal(data);
     //should take in argument
     let N2O = [];
     let NxO = [];
     let CO2 = [];
     let yearDay = [];
     for(let i = 0; i < resultData.length; i++ ){
         let oneData = resultData[i];
         let numbers;
         let resultArray = []
         while (numbers = regex.exec(oneData)) {
             resultArray.push(numbers[0]);
         }
         N2O.push(resultArray[102]);
         NxO.push(resultArray[103]);
         CO2.push(resultArray[77]);
         yearDay.push(resultArray[0]);
     } 
     console.log(N2O);
     console.log(NxO);
};

function chooseFilePath(title){
    fileFinalName = dialog.showOpenDialog({'title':title});
    return fileFinalName[0];
  };
  
exports.chooseFilePath = chooseFilePath();
exports.readData = readData();