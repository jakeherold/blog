$(function() {

  //Declare variables for matching jQuery objects
  var titleInput = $('#userInputTitle');
  var categoryInput = $('#userInputCategory');
  var authorInput = $('#userInputAuthor');
  var authorUrlInput = $('#userInputUrl');
  var publishedOnInput = $('#userInputPublishedOn');
  var bodyInput = $('#userInputBody');
  var pRawHtmlOutput = $('#pRawHtmlOutput');
  var pMarkdownOutput = $('#pMarkdownOutput');
  var pJson    = $('#pJson');

  // Empty object, filled into during JSON string update
  var newArticleObj = {};

  function render() {

    // Collected User Input values
    var titleVal = titleInput.val();
    var categoryVal = categoryInput.val();
    var authorVal = authorInput.val();
    var authorUrlVal = authorUrlInput.val();
    var publishedOnVal = publishedOnInput.val();
    var bodyVal = bodyInput.val();

    // Convert markup to html (for body), shorten variable for others
    var t = titleVal;
    var c = categoryVal;
    var a = authorVal;
    var u = authorUrlVal;
    var p = publishedOnVal;
    var b = marked(bodyVal);

    //Combine all inputs for markdown output
    var allInputs = t + c + a + u + p + b;

    //Output all inputs to live markdown
    pMarkdownOutput.html(allInputs); // Render article preview (rendered as HTML)

    pRawHtmlOutput.text(allInputs); // Render raw html



    // Update JSON article
    newArticleObj.articleBody = b;
    newArticleObj.title = t;
    var jsonStr = pJson.text(JSON.stringify(newArticleObj));
  }

  // Any character change (article editing) updates the live output paragraphs
  titleInput.on('input', render);
  categoryInput.on('input', render);
  authorInput.on('input', render);
  authorUrlInput.on('input', render);
  publishedOnInput.on('input', render);
  bodyInput.on('input', render);

  render(); // Render once on doc load
});
