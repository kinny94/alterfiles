var fs = require('fs');
var testPath = "./../alterfiles";
var testPath2 = "./../";
// function that returns the list of files in a folder

const allFiles = ( path ) => {
    fs.readdirSync( path ).forEach( file => {
        let pathToFile = path + "/" + file;
        if ( fs.lstatSync( pathToFile ).isFile()){
            return console.log( "File : " + file );
        }; 
        if ( fs.lstatSync( pathToFile ).isDirectory()){
            return console.log( "Folder : " + file );
        } else {
            return console.log( "Unknown type : " + file );
        }
    });
}

//merge with the function that returns the list of files with a particular extension

const allFilesOfType = (path, extention) => {
    
    var listOfFiles = [];
    if(extention === "" || extention === null || extention === undefined){
        console.log("No Extension provided!!");
        return allFiles(path);
    }

    fs.readdirSync(path).forEach( file => {
        let brokenFileName = file.split('.');
        let currentFileExtention = brokenFileName[brokenFileName.length - 1];
        if(currentFileExtention === extention){
            listOfFiles.push(file);
        }
    });

    if(listOfFiles.length > 0){
        return console.log(listOfFiles.toString());
    }else{
        return console.log(" There are no files with " + extention + " in " + path);
    }
}


// funtion that returns the number of files in a folder

const NumberOfFiles = (path, particularFile) => {
    
    var filesObj = {};
    if(!path){
        return console.log("Path not specified");
    }

    fs.readdirSync(path).forEach(file => {

        //algo gets hident files
        var pathToFile = path + "/" + file;
        //checking if the current object is a file or a folder
        if(fs.lstatSync(pathToFile).isDirectory()){
            if("Folder" in filesObj){                       
                filesObj["Folder"].push(file);
            }else{
                filesObj["Folder"] = [];
                filesObj["Folder"].push(file);
            }
        }else{ // if not then treat it as a file.

            let brokenFileName = file.split(".");
            let extension = brokenFileName[brokenFileName.length - 1];

            if(extension in filesObj){
                filesObj[extension].push(file);
            }else{
                filesObj[extension] = [];
                filesObj[extension].push(file);
            }
        }
    });
    
    return filesObj;
}

// function to return the number of files of a particular extension
const filesWithExtension = (path, extension) => {
    let allFiles = NumberOfFiles(path);
    if(allFiles !== null || allFiles !== undefined || !allFiles){
        return console.log(allFiles[extension]);
    }else{
        return console.log("No files or folder found!");
    }
}

// function that returns the type of files in a folder

// function that renames the files in a folder

// function that renames a specific file in a folder

// function that create a files in a folder

// function that removes a file from a folder

// function that removes all files of a particular type from a folder

// fuction that checks if a specific files exists in a folder

// function that change the names of all the files in a folder with incremental value

// function that change the extensions of all the files in a folder

// function that change the extension of a particular file in a folder

// functon that create a files (Programming or txt);

// function that renames a folder

// function that returns the system path of a file

// function that moves a files from one folder to another

// function that create a copy of a files 

// function to copy the contents of a files of one extesion to another
