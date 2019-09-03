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

//pop up a dialog window for user to locate the file path
  function chooseFilePath(title){
    fileFinalName = dialog.showOpenDialog({'title':title, properties: ['openFile']});
    return fileFinalName[0];
  };

  function chooseDirectoryPath(title){
    fileFinalName = dialog.showOpenDialog({'title':title, properties: ['openDirectory']});
    return fileFinalName[0];
  };  
  
//locate the filepath, read the .dat file, then return both the path of the file as well as the data
function locateTheRzwqm(){
    let filePath = chooseFilePath("Please locate the Rzwqm.DAT file.");
    let resultData = fs.readFileSync(filePath).toString().split("\n");
    let trimData = resultData.map(function(item){
      return item.trim()
    })

    return {"data":trimData,"path":filePath};
  }
  
module.exports = {
  //locate the filepath, read the .dat file, then return both the path of the file as well as the data
      locateTheRzwqm:function locateTheRzwqm(){
      let filePath = chooseFilePath("Please locate the Rzwqm.DAT file.");
      let resultData = fs.readFileSync(filePath).toString().split("\n");
      return {"data":resultData,"path":filePath};
    },

      locateTheReleaseFile: function locateTheReleaseFile(){
        let filePath = chooseDirectoryPath("Please locate the folder that contains the RzwqmRelease.exe file.");
        return filePath;
      },

  //take in the data and the parameters that needed to be updated in the .dat file
      writeRzwqm:function writeRzwqm(){  
      let locate = locateTheRzwqm();
      let filePath = locate.path;
      let fileData = locate.data;
      let update = require('./updatePojo').subirrigation(fileData);
      console.log(update)         
      fs.writeFile(filePath,update.join("\n"), function(err){
          if (err) return console.log(err);
          console.log('success')
      })
    },

    chooseFilePath:function chooseFilePath(title){
        fileFinalName = dialog.showOpenDialog({'title':title});
        return fileFinalName[0];
      },

    readData:function readData(){
        // let filepath = chooseFilePath();
        // let the user choose the analysis file and read the data from it.
         let resultFilepath = chooseFilePath("Please choose the analysis file.");
    
         //let data = fs.readFileSync(filepath).toString().split("\n");
         let resultData = fs.readFileSync(resultFilepath).toString().split("\n");
         //console.log(data);
         resultData.splice(0,23);
         //writeToLocal(data);
         //should take in argument
         //let N2O = [];
         //let NxO = [];
         //let CO2 = [];
         //let yearDay = [];
         for(let i = 0; i < resultData.length; i++ ){
             let oneData = resultData[i];
             let numbers;
             let resultArray = []
             while (numbers = regex.exec(oneData)) {
                 resultArray.push(numbers[0]);
             }
             N2O.push({"N2O":Number(resultArray[100])});
             NxO.push(Number(resultArray[101]));
             CO2.push({"CO2":Number(resultArray[77])});
             yearDay.push(resultArray[0]);
         } 
         console.log('N20:  ' + N2O);
         console.log('Nx0:  ' + NxO);
         console.log('CO2:  ' + CO2);
         console.log('Date:  ' + yearDay);
    }
}