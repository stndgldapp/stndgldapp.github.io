const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');

// Resolve the correct path to the preload script dynamically
const preloadScriptPath = path.resolve(__dirname, 'preload.js');

// Function to append data to a log file (with error handling)
const appendToLogFile = (filePath, data) => {
    try {
        fs.appendFileSync(filePath, data);
    } catch (error) {
        console.error(`Error appending to log file: ${error.message}`);
    }
};

contextBridge.exposeInMainWorld('api', {
    lin: (msg) => appendToLogFile('/home/tableapp/log.txt', msg),
    win: (msg) => appendToLogFile('C:/tableapp/log.txt', msg),
    // Assuming returnParticipants() is defined elsewhere
    part: returnParticipants(),
});
