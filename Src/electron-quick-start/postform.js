document.getElementById("postForm").elements["postBTN"].addEventListener('click',function()
{
  var categorySelection = document.getElementById("categoryOPT");
  var category = categorySelection.options[categorySelection.selectedIndex].value;
  var title = document.getElementById("postTitle").value;

  window.AddPost(0, title, quill.getContents(), category);
});
