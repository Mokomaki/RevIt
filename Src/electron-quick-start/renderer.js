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


document.getElementById("postForm").elements["postBTN"].addEventListener('click',function()
{
  var categorySelection = document.getElementById("categoryOPT");
  var category = categorySelection.options[categorySelection.selectedIndex].value;
  var title = document.getElementById("postTitle").value;
  
  console.log(title);
  console.log(category);
  console.log(quill.getContents());

  window.AddPost(0, title, quill.getContents(), category);
});
