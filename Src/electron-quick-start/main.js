const {app, ipcMain ,BrowserWindow, Menu} = require('electron');
const path = require('path');
const sql = require('mysql');

let mainWindow;
var postPageID;

ipcMain.on('GET_ALL_POSTS', function(event,arg)
{
  var connection = sql.createConnection(
    {
        host     : "185.53.85.170",
        port     : "3306",
        user     : "risto_h",
        password : "dbpasswordisristo",
        database : "risto_h"
    }
  );

  connection.connect(function(err)
  {
    if (err) throw err;
  });
  connection.query('SELECT `postID`,`title`,`contents` FROM risto_h.posts;', function (error, results, fields) 
  {
    if(error) throw error;
    //var dec = new TextDecoder("utf-8");
    event.reply('PARSE_POST_ARRAY', results);
    //contentObject = Object.assign({}, results);
    //event.reply('GET_CONTENTS_BY_ID_REPLY', dec.decode(contentObject[0].contents));
  });

  connection.end(function(err) 
  {
    if (err) 
    {
      return console.log('error:' + err.message);
    }
  });
})

ipcMain.on('SET_POSTPAGE_ID', function(event,arg)
{
  console.log(arg);
  postPageID = arg;
});

ipcMain.on('GET_TITLE_BY_ID', function(event,arg)
{
  var connection = sql.createConnection(
    {
        host     : "185.53.85.170",
        port     : "3306",
        user     : "risto_h",
        password : "dbpasswordisristo",
        database : "risto_h"
    }
  );

  connection.connect(function(err)
  {
    if (err) throw err;
  });
  connection.query('SELECT `title` FROM `risto_h`.`posts` WHERE `postID` = ' + postPageID, function (error, results, fields) 
  {
    if(error) throw error;
    //var dec = new TextDecoder("utf-8");
    contentObject = Object.assign({}, results);
    event.reply('GET_TITLE_BY_ID_REPLY', contentObject[0].title);
    //event.reply('GET_TITLE_BY_ID_REPLY', results);
  });

  connection.end(function(err) 
  {
    if (err) 
    {
      return console.log('error:' + err.message);
    }
  });
});

ipcMain.on('GET_CONTENTS_BY_ID', function(event,arg)
{
  var connection = sql.createConnection(
    {
        host     : "185.53.85.170",
        port     : "3306",
        user     : "risto_h",
        password : "dbpasswordisristo",
        database : "risto_h"
    }
  );

  connection.connect(function(err)
  {
    if (err) throw err;
  });
  connection.query('SELECT `contents` FROM `risto_h`.`posts` WHERE `postID` = ' + postPageID, function (error, results, fields) 
  {
    if(error) throw error;
    var dec = new TextDecoder("utf-8");
    contentObject = Object.assign({}, results);
    event.reply('GET_CONTENTS_BY_ID_REPLY', dec.decode(contentObject[0].contents));
  });

  connection.end(function(err) 
  {
    if (err) 
    {
      return console.log('error:' + err.message);
    }
  });
});

ipcMain.on('ADDPOST_SEND_QUERY', (event, arg) => 
{
  var command = arg;

  var connection = sql.createConnection(
    {
        host     : "185.53.85.170",
        port     : "3306",
        user     : "risto_h",
        password : "dbpasswordisristo",
        database : "risto_h"
    }
  );

  connection.connect(function(err)
  {
    if (err) throw err;

  });

  connection.query(command, function (error, results, fields) 
  {
    if (error)
    {
      console.log(error.code);
      event.reply('ADDPOST_REPLY_QUERY', 'failed');
    } 
    else 
    {
      postPageID = results.insertId;
      event.reply('ADDPOST_REPLY_QUERY', results);
      /*connection.query('SELECT last_insert_id();', function (error, results, fields) 
      {
        event.reply('ADDPOST_REPLY_QUERY', results);
      });*/
    }
  });

  connection.end(function(err) 
  {
    if (err) 
    {
      return console.log('error:' + err.message);
    }
  });
});

function createWindow () 
{
  mainWindow = new BrowserWindow(
  {
    width:  800,
    height: 800,
    minHeight:  650,
    minWidth:   450,
    
    titleBarStyle: "hidden", 
    frame: false,
    icon: __dirname + '/Graphics/Icon.png',

    webPreferences: 
    {
      enableRemoteModule: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html');

  //mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => 
{
  createWindow();
  
  app.on('activate', function () 
  {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

app.on('window-all-closed', function () 
{
  if (process.platform !== 'darwin') app.quit();
})
