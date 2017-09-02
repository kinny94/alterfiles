var fs = require('fs');
var testPath = "./../alterfiles";
var testPath2 = './../';
var testPath3 = './../alterfiles/Test/';
var testPath4 = './../alterfiles/Test/Folder1';
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

//check if file exists
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

const changeExtensionAll = (path, extension) => {
    if(!path || !extension){
        return console.log("Invalid function Arguments");
    }

    var changedOne = false;

    fs.readdirSync(path).forEach(file => {
        let pathToFile = path + file;
        if(!fs.lstatSync(pathToFile).isDirectory()){
            changedOne = true;
            let brokenFileName = file.split('.');
            brokenFileName[brokenFileName.length - 1] = "." + extension;
            var newName = brokenFileName.toString().replace(",", "");
            fs.rename(pathToFile, newName, (err) => {
                if(err){
                    return console.log(err);
                }
            })
        }
    });

    if(changedOne){
        return console.log("Files extensions changed!");
    }
    return console.log("No files found!");
}

// function that change the extension of a particular file in a folder

const changeExtention = (path, fileName, extension) => {
    if(!path || !fileName || !extension){
        return console.log("Invalid function arguements.");
    }

        var changedOne = false;
    fs.readdirSync(path).forEach(file => {
        let pathToFile = path + file;
        if(!fs.lstatSync(pathToFile).isDirectory()){
            if(file === fileName){
                changedOne = true;
                let brokenFileName = file.split('.');
                brokenFileName[brokenFileName.length - 1] = "." +    extension;
                var newName = brokenFileName.toString().replace(",", "");
                fs.rename(pathToFile, newName, (err) => {
                    if(err){
                        return console.log(err);
                    }
                });
            }
        }
    });

    if(changedOne){
        return console.log("File extension has been changed!!");
    }
    return console.log("File not found!!");
}

//change extension of a file with a particular extension

const changeAllFilesWithExtension = (path, oldExtension, newExtension) => {
    if(!path || !oldExtension || !newExtension){
        return console.log("Invalid function arguements!");
    }

    var changedOne = false;

    fs.readdirSync(path).forEach(file => {
        let pathToFile = path + file;
        if(!fs.lstatSync(pathToFile).isDirectory()){
            let brokenFileName = file.split(".");
            let currentExtention = brokenFileName[brokenFileName.length - 1];
            if(currentExtention === oldExtension){
                changedOne = true;
                brokenFileName[brokenFileName.length - 1] = "." + newExtension;
                let newName = brokenFileName.toString().replace(",", "");
                fs.rename(pathToFile, newName, (err) => {
                    return console.log(err);
                })
            }
        }
    });

    if(changedOne){
        return console.log("File extensions has been changed!!");
    }
    return console.log("No files found with extension " + oldExtension);
}

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

//rename all folders inside a folder with incremental values
const renameAllFolder = (path, newName) => {
    var incrementalValue = 1;
    var changedOne = false;
    fs.readdirSync(path).forEach(file => {
        let pathToFile = path + file;
        if(fs.lstatSync(pathToFile).isDirectory()){
            changedOne = true;
            fs.rename(pathToFile, newName + incrementalValue, (err) => {
                return console.log(err);
            });
            incrementalValue++;
        }
    });

    if(changedOne){
        return console.log("All folders have been renamed");
    }
    return console.log("No folders found!!");
}

// functon that create files (Programming or txt);

const createFile = (fileName, extension, dataToWrite) => {
    var path = __dirname;
    if(!fileName){
        return console.log("Filename not provied!");
    }

    if(!extension){
        if(dataToWrite){
            var data = dataToWrite;
        }else{
            var data = "Hello! I am text File!!";
        }
        
        fs.writeFile(fileName + ".txt", data, (err) => {
            if(err) console.log(err);
            return console.log("Text File created!!");
        });
    }else if(extension === "cpp"){

        if(dataToWrite){
            var data = dataToWrite;
        }else{
            var data = "#include<iostream> \n void main(){ \n \t\tstd::cout << 'A Cpp file' << std::endl \n }";
        }
        
        fs.writeFile(fileName + ".cpp" , data, (err) => {
            if(err) console.log(err);
            return console.log("Cpp file created !!");
        });
    }else if(extension === "java"){

        if(dataToWrite){
            var data = dataToWrite;
        }else{
            var data = `public class ${fileName}{\n\tpublic static void main(){ \n\t\t System.out.println("Hello!!"); \n\t\t} \n\t}`;
        }
        
        fs.writeFile(fileName + ".java" , data, (err) => {
            if(err) console.log(err);
            return console.log("Java file created !!");
        });
    }else if(extension === "js"){

        if(dataToWrite){
            var data = dataToWrite;
        }else{
             var data = `console.log("Hello!")`;
        }

        fs.writeFile(fileName + ".js" , data, (err) => {
            if(err) console.log(err);
            console.log("Javascript file created!!");
        });
    }else if(extension === "py"){
        if(dataToWrite){
            var data = dataToWrite;
        }else{
             var data = `print("Hello!")`;
        }

        fs.writeFile(fileName + ".py" , data, (err) => {
            if(err) console.log(err);
            console.log("Javascript file created!!");
        });
    }else{
        if(dataToWrite){
            var data = dataToWrite;
        }else{
            data = `//start writing in your file`;
        }

        fs.writeFile(fileName + "." + extension, data, (err) => {
            if(err) console.log(err);
            console.log(extension  + " file created!!");
        });
    }
}


// function that removes a file from a folder

const deleteFile = (filename) => {
    var path = (__dirname);
    var completePathToFile = path + "/" + filename;
    var found = false;
    fs.readdirSync(path).forEach(file => {
        if(filename === file){
            found = true;
            fs.unlinkSync(completePathToFile, (err) => {
                if(err) return console.log(err);
                return console.log("File successully deleted!");
            });
        }
    });

    if(!found){
        return console.log("File not found!!");
    }
}

// function that removes all files of a particular type from a folder

const deleteAll = (path) => {
    if(!path){
        return console.log("Path not specified!!");
    }

    fs.readdirSync(path).forEach(file => {
        fs.unlinkSync(path + "/" + file, (err) => {
            if(err) console.log(err);
        });
    });
    console.log("All files deleted!!");
}

// fuction that checks if a specific files exists in a folder

const checkFile = (path, filename) => {
    if(!path || !filename){
        return console.log("Invalid arguments!!");
    }
    var found = false;

    fs.readdirSync(path).forEach(file => {
        if(file ===  filename){
            found = true;
            return;
        }
    });

    if(!found){
        return false;
    }else{
        return true;
    }
}

// function that returns the system path of a file

const getPath = (filename) => {
    var path = __dirname;
    if(!filename){
        return path;
    }else{
        var path = __dirname + "\\" + filename;
        return path; 
    }
}

// function that create a copy of a file 

const createCopy = (path, filename, newFilename) => {
    if(!filename || !path){
        return console.log("Inavlid function argument!");
    }

    var brokenFileName = filename.split('.');
    var extension = brokenFileName[brokenFileName.length - 1];

    if(!newFilename){
        var newName = "Copied." + extension;
    }else{
        var newName = newFilename;
    }

    var found = false;
    fs.readdirSync(path).forEach(file => {
        if(file === filename){
            found = true;
            fs.createReadStream(path + "\\" + filename).pipe(fs.createWriteStream(newName));
            return console.log("File copied!");
        }else{
            console.log("")
        }
    });

    if(!found){
        return console.log("File not found!!");
    }
}

const csvToJSON = (path) => {
    var lines=csv.split("\n");
    
      var result = [];
    
      var headers=lines[0].split(",");
    
      for(var i=1;i<lines.length;i++){
          var obj = {};
          var currentline=lines[i].split(",");
    
          for(var j=0;j<headers.length;j++){
              obj[headers[j]] = currentline[j];
          }
          result.push(obj);
      }

      console.log(JSON.stringify(result));
      return JSON.stringify(result);
}

module.exports = {

    allFiles: allFiles,
    allFilesOfType: allFilesOfType,
    NumberOfFiles: NumberOfFiles,
    filesWithExtension: filesWithExtension,
    typeOfFiles: typeOfFiles,
    renameFile: renameFile,
    fileExists: fileExists,
    changeAllFilesNames: changeAllFilesNames,
    changeExtensionAll: changeExtensionAll,
    changeExtention: changeExtention,
    changeAllFilesWithExtension: changeAllFilesWithExtension,
    renameFolder: renameFolder,
    renameAllFolder: renameAllFolder,
    createFile: createFile,
    deleteFile: deleteFile,
    deleteAll: deleteAll,
    checkFile: checkFile,
    getPath: getPath,
    createCopy: createCopy

}