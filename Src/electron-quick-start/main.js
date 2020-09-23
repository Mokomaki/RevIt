const {app, ipcMain ,BrowserWindow, Menu} = require('electron');
const path = require('path');
const sql = require('mysql');

let mainWindow;
var postPageID;

ipcMain.on('SET_POSTPAGE_ID', function(event,arg)
{
  postPageID = arg;
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
    else
    {
        console.log('connected');
    }
  });

  connection.query('SELECT `contents` FROM `risto_h`.`posts` WHERE `postID` = 6', function (error, results, fields) 
  {
    if(error) throw error;
    var dec = new TextDecoder("utf-8");
    contentObject = Object.assign({}, results);
    event.reply('GET_CONTENTS_BY_ID_REPLY', dec.decode(contentObject[0].contents));
    console.log(dec.decode(contentObject[0].contents))
  });
/*con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT contents FROM risto_h.posts WHERE postID = 5", function (err, result, fields) {
    if (err) throw err;
    trivial_object = Object.assign({}, result);
    dec = new TextDecoder("utf-8");
    console.log(dec.decode(trivial_object[0].contents));
  });
}); */
  connection.end(function(err) 
  {
    if (err) 
    {
      return console.log('error:' + err.message);
    }
    console.log('connection ended');
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
    else
    {
        console.log('connected');
    }
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
      connection.query('SELECT last_insert_id();', function (error, results, fields) 
      {
        event.reply('ADDPOST_REPLY_QUERY', results);
      });
    }
  });

  connection.end(function(err) 
  {
    if (err) 
    {
      return console.log('error:' + err.message);
    }
    console.log('connection ended');
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

  mainWindow.webContents.openDevTools();
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
