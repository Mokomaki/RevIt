const {app, ipcMain ,BrowserWindow, Menu} = require('electron');
const path = require('path');
const sql = require('mysql');

let mainWindow;

ipcMain.on('SEND_QUERY', (event, arg) => 
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

  connection.connect((err)=> {
          if (err) throw err;
          else
          {
              console.log('connected');
          }
      }
  );

  var command = arg;
  connection.query(command, function (error, results, fields) 
  {
    if (error) console.log(error.code);
    else 
    {
      event.reply('REPLY_QUERY', 'pong')
    }
  });


  connection.end(
    function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('connection ended');
    }
  );
  event.reply('asynchronous-reply', 'pong')
})


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
