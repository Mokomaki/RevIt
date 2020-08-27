const fs = require('fs')
const remote = require('electron').remote;

window.test = function() 
{
    console.log(fs);
    console.log(remote);
}