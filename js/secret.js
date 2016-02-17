$(function() {
  var textTitle = $('#textTitle');
  var textAuthor = $('#textAuthor');
  var textUrl = $('#textUrl');
  var textCategory = $('#textCategory');
  var textDate = $('#textDate');
  var textBody = $('#textBody');
  //var articleTemplate = $('#articleTemplate').html();
  var liveRawHtmlOutput = $('#liveRawHtmlOutput');
  var pMarkOut = $('#pMarkOut');
  var pJson = $('#pJson');
  var mObj = {}; // Empty object, filled in to during JSON string update

  function render() {

    var titleVal = textTitle.val(); //raw title markup
    var authorVal = textAuthor.val(); //raw author markup
    var urlVal = textUrl.val(); //raw URL markup
    var categoryVal = textCategory.val(); //raw category markup
    var dateVal = textDate.val();
    var bodVal = textBody.val(); // Raw body markup


    var t = marked(titleVal); //convert title markup to html
    var b = marked(bodVal); // Convert body markup to html
    var a = marked(authorVal); //convert author markup to html
    var u = marked(urlVal); // Convert URL markup to html
    var d = marked(dateVal);
    var c = marked(categoryVal); //convert category markup to html
    var allTheBlock = t + a + u + c + b;



    liveRawHtmlOutput.text(allTheBlock); // Render raw markup
    pMarkOut.html(allTheBlock); // Render article preview (rendered as HTML)

    // Update JSON article
    mObj.title = t;
    mObj.body = b;
    mObj.category = c;
    mObj.publishedOn = d;
    mObj.author = a;
    mObj.authorURL = u;
    mObj.category = c;

    var secretData = {};

    var jsonStr = pJson.text(JSON.stringify(mObj));

    $.get('template.html', function(articleTemplate){
    // var articleTemplate = $('#articleTemplate').html();

    var secretData = mObj;
    var renderer = Handlebars.compile(articleTemplate);

    var compiledHtml = renderer(mObj);
    $('#pMarkOut').html(compiledHtml);
    // hljs.highlightBlock("#articleDemo");
    $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
  });
  }

  //Button events listener that changes the display attribute relative to where the button was pressed.
  var attachTruncationButtons = function (){
  $(".expandArticleText").on('click', function() {
    $(this).prev().children().fadeIn();
    $(this).hide();
    $(this).next().show();
  });

  $(".contractArticleText").on('click', function() {
    $(this).prev().prev().children().not('p:first').fadeOut();
    $(this).hide();
    $(this).prev().fadeIn();
    $(this).parent().prev().children().not('p:first').hide();
    $('html,body').animate({
      scrollTop: $(this).closest('.realArticle').offset().top
    }, 400);
  });
}
  // Any character change (article editing) updates the live output paragraphs
  textTitle.on('input', render);
  textBody.on('input', render);
  textAuthor.on('input', render);
  textUrl.on('input', render);
  textCategory.on('input', render);

  render(); // Render once on doc load

});
