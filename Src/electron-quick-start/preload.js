const remote = require('electron').remote;
const { ipcRenderer } = require('electron');
const Quill = require('quill');

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
    if(authorID!=null&&title!=""&&contents!=""&&categoryID!=null)
    {
        var arg = 'INSERT INTO `posts` (`authorID`,`title`,`contents`,`categoryID`) VALUES ("'+ authorID + '","' + title + '",' +"'" + JSON.stringify(contents) + "'" + ',"' + categoryID + '");';
        ipcRenderer.send('ADDPOST_SEND_QUERY', arg);
    }
}

ipcRenderer.on('ADDPOST_REPLY_QUERY', function(event, arg) 
{
    console.log(arg)
    if(arg=="failed")
    {
        document.getElementById("error_msg").innerHTML = "An error occurred while sending review...";
    }
    else
    {
        window.location.href = "readpost.html";
        //ipcRenderer.send('SET_POSTPAGE_ID',arg);
        //document.getElementById("post_container").innerHTML = convertDeltaToHtml(arg);
        //console.log(arg);
    }
})

window.GetPostContentsById = function()
{
    ipcRenderer.send('GET_CONTENTS_BY_ID','foo');
}
ipcRenderer.on('GET_CONTENTS_BY_ID_REPLY', function(event, arg) 
{
    console.log(arg);
    console.log(quillGetHTML(arg));
    document.getElementById("post_container").innerHTML = quillGetHTML(arg);
})
function quillGetHTML(inputDelta) {
    var tempCont = document.createElement("div");
    (new Quill(tempCont)).setContents(inputDelta);
    return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
}