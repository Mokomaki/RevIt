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
window.GetTitleById = function()
{
    ipcRenderer.send('GET_TITLE_BY_ID','foo');
}
window.GetPostContentsById = function()
{
    ipcRenderer.send('GET_CONTENTS_BY_ID','foo');
}
ipcRenderer.on('GET_CONTENTS_BY_ID_REPLY', function(event, contents) 
{
    contents = contents.slice(1,-1);
    console.log(contents);
    document.getElementById("post_container").innerHTML = contents;
})

ipcRenderer.on('GET_TITLE_BY_ID_REPLY', function(event, title) 
{
    document.getElementById("Title").innerHTML = title;
})


window.getAllPosts = function()
{
    ipcRenderer.send('GET_ALL_POSTS','foo');
}

ipcRenderer.on('PARSE_POST_ARRAY',function(event,result)
{
    var dec = new TextDecoder("utf-8");
    contentObject = Object.assign({}, result);
    //var dec = new TextDecoder("utf-8");
    for(i=0;i<result.length;i++)
    {
        
        var title = contentObject[i].title;
        var id = contentObject[i].postID;
        console.log(contentObject[i].title);
        console.log(contentObject[i].postID);
        var htmlString = dec.decode(contentObject[i].contents);
        var d = document.createElement('div');
        d.innerHTML = htmlString;
        var sampleText;

        if(d.innerText.length>16)
        {
            sampleText = d.innerText.substring(1,16);
        }
        else
        {
            sampleText = d.innerText;
        }
        sampleText = sampleText.concat("...");
        console.log(sampleText);
        
        var postELEMENT = document.createElement("DIV");
        postELEMENT.className = "card";
        postELEMENT.innerHTML = '<h1>' + title + '</h1><hr><p>' + sampleText + '</p><p id ="id_text">' + id + '</p>';
        postELEMENT.addEventListener('click',function(e)
        {
            console.log(e.target);
            var setID = e.target.lastChild.innerHTML;
            if(setID == null)
            {
                console.log("ERROR");
                document.getElementById("error").innerHTML = "Can't load page please try again";
            }
            else
             {
                ipcRenderer.send('SET_POSTPAGE_ID',parseInt(setID, 10));
                window.location.href = "readpost.html";
             }

        })
        document.getElementById("cardsContainer").appendChild(postELEMENT);
        
    }
}) 