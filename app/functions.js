var fs = require('fs')
var filepath = "D:\testing\test.txt";
var content = "This is the new content of the file";

export function testWriteToFile(){
    fs.writeFile(filepath, content, (err) =>{
        if(err){
            alert("An error has occured" + err.message);
            console.log(err);
            return;
        }
    
        alert("The file has been successfully updated")
    })
    
}

