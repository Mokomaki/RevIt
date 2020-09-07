const remote = require('electron').remote;
const axios = require('axios');

//window controls
window.CloseWindow = function() 
{
    remote.BrowserWindow.getFocusedWindow().close();
}
window.MinimizeWindow = function() 
{
    remote.BrowserWindow.getFocusedWindow().minimize();
}
window.MaximizeWindow = function() 
{
    if(remote.BrowserWindow.getFocusedWindow().isMaximized())
    {
        remote.BrowserWindow.getFocusedWindow().unmaximize();
    }
    else
    {
        remote.BrowserWindow.getFocusedWindow().maximize();
    }
}

//http methods
window._Post = function(args)
{
    axios.post('https://localhost:44348/api/testModels', args,)
    .then(res => {
    console.log(`statusCode: ${res.statusCode}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  })
}