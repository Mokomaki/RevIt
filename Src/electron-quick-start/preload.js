const remote = require('electron').remote;
const { ipcRenderer } = require('electron')


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

window.AddPost = function(authorID, title, contents, categoryID)
{
    if(authorID!=null&&title!=null&&contents!=null&&categoryID!=null)
    {
        var arg = 'INSERT INTO `posts` (`authorID`,`title`,`contents`,`categoryID`) VALUES ("'+ authorID + '","' + title + '",' +"'" + JSON.stringify(contents) + "'" + ',"' + categoryID + '");';
        ipcRenderer.send('SEND_QUERY', arg)
    }
}