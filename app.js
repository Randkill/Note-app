console.log('Starting app.js');

const fs = require('fs');
//const userInfo = require('user-info');
const _ = require('lodash');
const notes = require('./notes.js')

//Title Options

const titleOptions = {
    describe: 'Title of note'
    ,demand: true
    ,alias: 't'
}

//Body options
const bodyOptions = {
    describe: 'Body of note'
    ,demand: true
    ,alias: 'b'
}
const yargs = require('yargs'); //YARGS is used to parse the input arguments

const argv = yargs.command('add' , 'Add a new note' , {
    title: titleOptions,
    body: bodyOptions
}).command('list' , 'List all notes')
.command('read' , 'Read a note' , {
    title: titleOptions
})
.command('remove' , 'Remove a note' , {
   title:  titleOptions
})
.help().argv;

//Getting commands from input :
var command = process.argv[2];
console.log('command: ' , command);
//console.log('Process: ' , process.argv);
console.log("Yargs:" , argv);

//Commands:
if(command === 'add'){
    console.log('Adding new note');
    var note = notes.addNote(argv.title , argv.body);
    if(note) {
        console.log('Note created');
        notes.logNote(note);
    }else{
        console.log('Note title taken');
    }
}
else if(command === 'list'){
    notes.getAll();
    var allNotes= notes.getAll();
    console.log('Printing ' , allNotes.lenght , ' note(s)');
    allNotes.forEach(note => {
        notes.logNote(note);
    });
}
else if(command === 'read'){
    console.log('Getting note: ' , argv.title);
    var note = notes.getNote(argv.title);
    if(note){
        console.log('Note found');
        notes.logNote(note);
    }else{
        console.log('Note not found');
    }
}
else if(command === 'remove'){
    console.log('Removing note');
    var noteRemoved = notes.remove(argv.title);
    //if the noteRemoved is 'true' then the statement next to it will invoke
    var messege = noteRemoved ? 'Note was removed' : 'Note was not found' ;
    console.log(messege);
}
else{
    console.log('Command not recognized');
}