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

allFiles(testPath);

// funtion that returns the number of files in a folder
    // merge with the function to return the number of files of a particular extension

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
