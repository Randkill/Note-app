console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = function() {
    try {
        //it will save the eldest data
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
        }
        catch (e) {
            return [];
        }
};

var saveNotes = function(notes) {
    fs.writeFileSync('notes-data.json' , JSON.stringify(notes));
};

var addNote = function(title , body) {
    console.log('addNote function invoked');
    var notes = fetchNotes();
    var note = {
        title: title,
        body: body
    };

    var duplicateNotes =notes.filter(function(note){    //filter() method would create another
        return note.title === title;    //array based on a filter affected on the old array
    });

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;    //it is going to get returned
      }//to whoever invokes the function
    
    console.log('addNote function invokation has been done');
};

var getAll = function(title) {
    console.log('Getting all notes')
    return fetchNotes();
};

var getNote = function(title) {
    //it gets the title and it would return the body
    console.log('Getting note -> ' ,  title);
    //fetch notes
    var notes = fetchNotes();
    var filteredNotes = notes.filter(function(note){
        return note.title === title;
    });
    return filteredNotes[0];
};

var remove = function(title) {
    console.log('Removing note -> ' , title);
    //fethc the notes
    var notes = fetchNotes();
    //filter notes,removing one with the title of argument
    var filteredNotes = notes.filter(function(note){
        note.title !== title;
        //there will create an array containing all 
        //titles except the given on as the argument
    });
    //save notes
    saveNotes(filteredNotes);
    //checking whether any note was removed or not
    //true-> was    removed flase->was not removed
    if(notes.length !== filteredNotes.length){
        return true;
    }
    else{
        return false;
    }
};

var logNote = function(note){
    console.log('--');
        console.log('Title: ' + note.title);
        console.log('Body: ' + note.body);
};

module.exports = {
    addNote: addNote
    ,getAll: getAll
    ,remove: remove
    ,getNote: getNote
    ,logNote: logNote
};