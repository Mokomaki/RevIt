//Application controls
document.getElementById("win_close").addEventListener('click', function() 
{
  window.CloseWindow();
});
document.getElementById("win_min").addEventListener('click', function() 
{
  window.MinimizeWindow();
});
document.getElementById("win_max").addEventListener('click', function() 
{
  window.MaximizeWindow();
});



//http
const rqst = {
  id: 1,
  name: 'jesse'
};

//test submit
document.getElementById("test_form").elements["dobby"].addEventListener('click', function()
{
  document.getElementById("testii").innerHTML = document.getElementById("test_form").elements["bam"].value;
  
  rqst.name = document.getElementById("test_form").elements["bam"].value;

  
  window._Post(rqst);

});