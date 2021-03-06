  //loading up the required depenency variable
  var app = require('electron').remote;
  var dialog = require('electron').remote.dialog;
  var fs = require('fs')

  //regex to extract numbers
  var regex = /[+-]?((\.\d+)|(\d+(\.\d+)?)([eE][+-]?\d+)?)/g;

  function writeToLocal(data) {
    fs.writeFile("C:\\GHG-SE\\GHG-SE-FD\\RZWQM.DAT", data.join("\n"), function (err) {
      if (err) return console.log(err);
    })
  }

  //pop up a dialog window for user to locate the file path
  async function chooseFilePath(title) {
    var fileFinalName = await dialog.showOpenDialogSync({
      'title': title,
      properties: ['openFile']
    });
    console.log(fileFinalName)
    return fileFinalName[0];
  };

  async function chooseDirectoryPath(title) {
    var fileFinalName = await dialog.showOpenDialogSync({
      'title': title,
      properties: ['openDirectory']
    });
    console.log(fileFinalName)
    return fileFinalName[0];
  }

  //locate the filepath, read the .dat file, then return both the path of the file as well as the data
  function locateTheRzwqm(projectDirectory) {
    let RZWQMDir = projectDirectory + '\\RZWQM.DAT';
    console.log(RZWQMDir)
    let resultData = fs.readFileSync(RZWQMDir).toString().split("\n");
    //use the map function to go through the data and trim each element in the array
    let trimData = resultData.map(function (item) {
      return item.trim()
    })
    return {
      "data": trimData,
      "path": RZWQMDir
    };
  }

  module.exports = {
    //locate the filepath, read the .dat file, then return both the path of the file as well as the data
    locateTheRzwqm: function locateTheRzwqm(projectDirectory) {
      let RZWQMDir = projectDirectory + '\\RZWQM.DAT';
      console.log(RZWQMDir)
      let resultData = fs.readFileSync(RZWQMDir).toString().split("\n");
      let trimData = resultData.map(function (item) {
        return item.trim()
      })
      return {
        "data": trimData,
        "path": RZWQMDir
      };
    },

    locateTheReleaseFile: async function locateTheReleaseFile() {
      let filePath = await chooseDirectoryPath("Please locate the project file.");
      var ss = require('./sessionStorage').projectDirectory
      ss(filePath)
      return filePath;
    },

    cropInfo: function cropInfo(data) {
      console.log(data)
    },

    //take in the data and the parameters that needed to be updated in the .dat file
    writeRzwqm: function writeRzwqm() {
      var ProjectDir = JSON.parse(sessionStorage.getItem('projectDirectory'));
      //find the location of the rzwqm file, also reading the data from it
      let locate = locateTheRzwqm(ProjectDir);
      //two varibales that should be returned from calling the function
      let filePath = locate.path;
      let fileData = locate.data;
      //call the specific function:subirrigation in the updatePojo JS file
      //the function takes in the original file data and updates it with the user input from the frontend 
      let update = require('./updatePojo').subirrigation(fileData);
      console.log(update)
      fs.writeFile(filePath, update.join("\n"), function (err) {
        if (err) return console.log(err);
        console.log('success')
      })
    },

    chooseFilePath: function chooseFilePath(title) {
      fileFinalName = dialog.showOpenDialog({
        'title': title
      });
      return fileFinalName[0];
    },

    readData: async function readData() {
      // let filepath = chooseFilePath();
      // let the user choose the analysis file and read the data from it.
      let resultFilepath = await chooseFilePath("Please choose the analysis file.");

      //let data = fs.readFileSync(filepath).toString().split("\n");
      let resultData = fs.readFileSync(resultFilepath).toString().split("\n");
      //console.log(data);
      resultData.splice(0, 24);
      //writeToLocal(data);
      //should take in argument
      let N2O = [];
      let NxO = [];
      let CO2 = [];
      let yield = [];
      let  CH4 = [];
      let yearDay = [];
      let data = [];
      for (let i = 0; i < resultData.length - 1; i++) {
        let oneData = resultData[i];
        let numbers;
        let resultArray = []
        while (numbers = regex.exec(oneData)) {
          resultArray.push(numbers[0]);
        }
        CH4.push(Number(resultArray[95]))
        N2O.push(Number(resultArray[96]));
        NxO.push(Number(resultArray[97]));
        CO2.push(Number(resultArray[77]));
        yield.push(Number(resultArray[43]))
        yearDay.push(resultArray[0]);
      }
      return {
        yield: yield,
        N2O: N2O,
        CO2: CO2,
        yearDay:yearDay,
        NxO:NxO,
        CH4:CH4
      };
    }
  }