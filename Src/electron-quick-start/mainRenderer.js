/*
        <div class="card">
          <h1>Title</h1>
          <hr>
          <p>Sample text from the article. The length should be about two paragraphs.</p>
          <p id ="id_text">35</p>
        </div>
*/
window.addEventListener('load', function () 
{
    window.getAllPosts();
});
document.getElementById("search_form").elements["SearchBTN"].addEventListener('click',function()
{
    document.getElementById("cardsContainer").innerHTML = '';

    var categorySelection = document.getElementById("categoryOPT");
    var category = categorySelection.options[categorySelection.selectedIndex].value;
    var title = document.getElementById("SearchString").value;

    window.getAllPosts();
    if(category==0)
    {

        //select all
    }
    else
    {
        //select all where category id = 
    }
})