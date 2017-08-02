var fs = require('fs');
var testPath = "./../alterfiles";
var testPath2 = './../';
var testPath3 = './../alterfiles/Test/';
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

const typeOfFiles = (path)   => {
    let allFiles = {};

    fs.readdirSync(path).forEach(file => {
        let pathToFile = path + "/" + file;

        if(fs.lstatSync(pathToFile).isDirectory()){
            if("folder" in allFiles){
                allFiles["folder"] = allFiles["folder"] + 1;
            }else{
                allFiles["folder"] = 1;
            }
        }else{
            let brokenFileName = file.split('.');
            let extension = brokenFileName[brokenFileName.length - 1];

            if(extension in allFiles){
                allFiles[extension] = allFiles[extention] + 1;
            }else{
                allFiles[extension] = 1;
            }
        }
    });
    return allFiles;
}

// function that renames the files in a folder

const renameFile = (path, filename, newName) => {
    if(!path){
        return console.log("Error: Invalid path");
    }

    var changedAtleastOneFile = false;

    fs.readdirSync(path).forEach(file => {
        if(filename === file){
            changedAtleastOneFile = true;
            fs.rename(file, newName, function(err){
                if(err)
                    console.log(err);
            });
        }
    });

    if(!changedAtleastOneFile){
        return console.log("No File with filename " + filename + " found!!");
    }else{
        return console.log("Files with names " + filename + " has been changed to "  + newName);
    }
}

// Added to backlog /*  function that renames a specific file in a folder */ 

// function that create a files in a folder

// function that removes a file from a folder

// function that removes all files of a particular type from a folder

// fuction that checks if a specific files exists in a folder

const fileExists = (path, filename) => {
    var found = false;
    fs.readdirSync(path).forEach(file => {
        if(filename === file){
            found = true;
            return found;  
        }
    });

    return found;
}

// function that change the names of all the files in a folder with incremental value

const changeAllFilesNames = (path, filename) => {
    if(!path){
        return console.log("Path not specified!!");
    }

    if(!filename){
        filename = "";
    }

    var incrementalValue = 1;
    fs.readdirSync(path).forEach(file => {

        if(!fs.lstatSync(path + file).isDirectory()){
            let brokenFileName = file.split('.');
            let extention = brokenFileName[brokenFileName.length - 1];
            let pathToFile = path + file;
            let newName =  filename + incrementalValue + "." + extention;
            fs.rename(pathToFile, newName, (err) => {
                if(err)
                    return console.log(err);
            });
            incrementalValue++;
        }
    });
    
    return console.log("All file names changed!!");
}
// function that change the extensions of all the files in a folder

// function that change the extension of a particular file in a folder

// functon that create a files (Programming or txt);

// function that renames a folder

const renameFolder = (path, folderName, newName) => {
    if(!path || !folderName){
        return console.log("Function take two valid arguements.");
    }

    var changedOne = false;

    fs.readdirSync(path).forEach(file => {
        let pathToFile = path + file;
        if(fs.lstatSync(pathToFile).isDirectory()){
            if(file === folderName){
                changedOne = true;
                fs.rename(pathToFile, newName, (err) => {
                    if(err){
                        return console.log(err);
                    }
                });
            }
        }
    });

    if(changedOne){
        return console.log("Folder " + folderName + " has been changed to " + newName);
    }
        
    return console.log("No such folder found!!");    
}

// function that returns the system path of a file

// function that moves a files from one folder to another

// function that create a copy of a files 

// function to copy the contents of a files of one extesion to another
