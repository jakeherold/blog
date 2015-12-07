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
    // pRawHtmlOutput.text(allInputs); // Render raw html

    // Update previously empty newArticleObj with each input
    newArticleObj.title = t;
    newArticleObj.category = c;
    newArticleObj.author = a;
    newArticleObj.authorUrl = u;
    newArticleObj.publishedOn = p;
    newArticleObj.body = b;
    console.log(newArticleObj);

    //Stringify newArticleObj and output to JSON div
    // pJson.text(JSON.stringify(newArticleObj));
    pJson.val(newArticleObj);

    //Run object through handlebars and then output to Live HTML div
    var boilerplateContent = $('#articleTemplate').html();
    var theTemplate = Handlebars.compile(boilerplateContent);
    var compiledArticle = theTemplate(newArticleObj);

    pRawHtmlOutput.html(compiledArticle);


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
