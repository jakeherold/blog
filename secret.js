$(function() {
  var titleInput = $('#userInputTitle');
  console.log(titleInput);
  var bodyInput = $('#userInputBody');
  var pRawHtmlOutput = $('#pRawHtmlOutput');
  var pMarkdownOutput = $('#pMarkdownOutput');
  var pJson    = $('#pJson');
  var mObj = {}; // Empty object, filled in to during JSON string update
  var blogAllInputs = {}; //create object to store values

  function render() {



    var titleVal = titleInput.val(); // Raw article markup
    console.log(titleVal);
    var bodyVal = bodyInput.val();

    var t = marked(titleVal); // Convert markup to html
    console.log(t);
    var b = marked(bodyVal);

    pRawHtmlOutput.text(t); // Render raw markup
    console.log(pRawHtmlOutput.text(t));
    pRawHtmlOutput.text(b);

    pMarkdownOutput.html(t); // Render article preview (rendered as HTML)

    // Update JSON article
    mObj.articleBody = b;
    mObj.title = t;
    var jsonStr = pJson.text(JSON.stringify(mObj));
  }

  // Any character change (article editing) updates the live output paragraphs
  titleInput.on('input', render);

  render(); // Render once on doc load
});
