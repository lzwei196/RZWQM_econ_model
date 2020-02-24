const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const db = require("./js/DB.js").db;
const path = require("path");
const ipc = require("electron").ipcRenderer;
var model_scheme = require('./js/model_schemes')
let loaded_project_name = "";
let duration_year_regex = /\b\d{4}\b/g;
var moment = require('moment');
var ana_date = [];

var array_to_obj = (the_array) =>{
  let result = {};
  for (let i = 0; i < the_array.length; i++) {
    result[Object.keys(the_array[i])[0]] = Object.values(the_array[i])[0];
  }
  return result
}

var db_connection = async function (db, table_name, model_scheme, property, value, fill, findOneOrNot) {
  let info_model = await project_model_function(db, table_name, model_scheme);
  let info_result = {};
  let filtered_output_obj= {}
  //return a single record when equal to 1, return the entire table when equal to 0
  if (findOneOrNot === 1){
     info_result = await info_model.findOne({
      [property]: value})
    filtered_output_obj = await filter_object_results(info_result)
  //doesnt return an result
  }else if(findOneOrNot === 0){
    info_result = await info_model.find(property)
    // filtered_output_obj = await filter_array_results(info_result)
  }else {
    info_result = await info_model.find(property)
  }

  if (fill === 1) {
    fill_the_blank(filtered_output_obj);
    console.log(filtered_output_obj)
    return filtered_output_obj;
  } else if (fill === 0) {
    create_input_table(filtered_output_obj, 'fixed_cost_parts')
    console.log(filtered_output_obj)
    return filtered_output_obj;
  }else if (fill === 2){
   //create_input_table(filtered_output_obj, 'fixed_cost_parts')
    return info_result;
  }else if (fill === 3){
    return info_result;
  }
};

var date_diff_endof = (year) =>{
  const start = moment(year, "DD-MM-YYYY")
  const end = moment(year, "DD-MM-YYYY").endOf('year').format("DD/MM/YYYY").toString();
  const end_moment = moment(end, 'DD-MM-YYYY')
  return end_moment.diff(start, 'days')
}

var date_diff_startof = (year) =>{
  const end = moment(year, "DD-MM-YYYY")
  const start = moment(year, "DD-MM-YYYY").startOf('year').format("DD/MM/YYYY").toString();
  const start_moment = moment(start, 'DD-MM-YYYY')
  return end.diff(start_moment, 'days')
}

var if_date= (year) =>{
  if (year.length  === 1){
    return year
  }else if (year.length > 1 ){
    const splitted_year = year.split('-').map(x=>x.trim())
    return  splitted_year;
  }
}

var if_read_date = (duration_array) =>{
  switch (true) {
    //only has one year
    case duration_array.length === 1:
      return 1;
      //only has two years
    case duration_array.length === 2:
      return 2;
      //have more than two years.
    case duration_array.length > 2 :
      return 3;
  }
}

var complete_date_each_year = (year, length, duration)=>{
  if(length === 1){
    const days_in_year = date_diff_endof(year)
    ana_date.push({[duration[0]]:days_in_year})
  } else if (length === 2){
      for (let z =0; z<duration.length;z++){
        let days_in_year = date_diff_endof(year[z])
        ana_date.push({[duration[z]]:days_in_year})
      }
  }else {
      for (let z=0; z<duration.length;z++){
        if (z === 0){
          let days_in_year = date_diff_endof(year[0])
          ana_date.push({[duration[z]]:days_in_year+1})
        }else if (z===duration.length-1){
          let days_in_year = date_diff_startof(year[1])
          ana_date.push({[duration[z]]:days_in_year+1})
        }else {
          let year_with_date = '01-01-'+duration[z]
          let days_in_year = date_diff_endof(year_with_date)
          ana_date.push({[duration[z]]:days_in_year+1})
        }
      }
  }
}

var splice_ana_field =(ana_date, field_data)=>{
  const final_field_each_year = [];
  ana_date.forEach(function (item,index,name) {
    let days = 0;
    if (index === 0) {
      days = days + Object.values(item)[0]
      final_field_each_year.push({[Object.keys(item)[0]]: field_data.splice(0, days)})
    }else {
      final_field_each_year.push({[Object.keys(item)[0]]: field_data.splice(days, days + Object.values(item)[0])})
      days = days + Object.values(item)[0]
    }
  })
  return final_field_each_year
}

//need to adjust from array filter to object reduce, taking out the value thats not null, then assign the value to the corresponding field by using jquery
    var filter_object_results = (myObj)=>{
    const filtered_output_obj = {};
    Object.keys(myObj).forEach(element =>{
      if ((myObj[element]) != 0){
        filtered_output_obj[element] = myObj[element];
      }
    })
    return filtered_output_obj;
  }

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