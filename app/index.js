const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const db = require("./js/DB.js").db;
const path = require("path");
const ipc = require("electron").ipcRenderer;
let loaded_project_name = "";
var db_connection = async function (
  db,
  table_name,
  model_scheme,
  property,
  value,
  fill
) {
  var info_model = await project_model_function(db, table_name, model_scheme);
  var info_result = await info_model.findOne({
    [property]: value
  });
  console.log(info_result);
  if (fill == 1) {
    fill_the_blank(info_result);
  } else if (fill == 0) {
    create_input_table(info_result, 'fixed_cost_parts')
  }
};

var fill_the_blank = function (myObj) {
  Object.keys(myObj).forEach(key => {
    if (myObj[key] != null) {
      var field = "#" + key;
      var value_of_field = myObj[key];
      $(field).val(value_of_field);
    }
  });
};

var create_input_table = (myObj, table_name) => {
  Object.keys(myObj).forEach(key => {
    var input_div = '#' + table_name
    var input_value = "<div class='col-6 col-md-4' id='" + key + "'>" +
      "<br><h2>" + key + "</h2>"
    "</div><br>"
    $(input_div).append(input_value)
    $("#" + key).append($('<input>', {
      type: 'text',
      class: 'form-control',
      val: myObj[key]
    }))
  })
}

ipc.on("messageFromMain", (event, message) => {
  console.log(message);
  loaded_project_name = message;
  if (loaded_project_name != null) {
    win.webContents.send("main_reply_from_renderer", "200");
  } else {
    win.webContents.send("main_reply_from_renderer", "400");
  }
});

ipc.on("messageFromMain_create", (event, message) => {
  console.log(message);
  if (message != null) {
    win.webContents.send("main_reply_create", "200");
  } else {
    win.webContents.send("main_reply_create", "400");
  }
});