//Each locally stored object is ("localEtag":"numbers and crap", localArticleData: "bunch of article stuff")
$(function() {


//DEBUG UTILITY FUNCTION
  debug = true;

  function cl (text){
    if (debug === true){
      console.log(text)
    }
  }




//END DUBUG UTILITY FUNCTION



  //                  WORKZONE
  webDB.init();
  // webDB.setupTables();

  var blogData;
  var blogContent;
  var localEtag;
  var serverEtag;

  var ajaxRequest = $.ajax({
    type: 'head',
    url: 'blogArticles.json',

    success: function(data, serveStatus, jqXHR) {
      console.log(serveStatus);

      serverEtag = jqXHR.getResponseHeader('eTag');
      localEtag = localStorage.getItem('localEtag');
      console.log('ajaxRequest was successful');

      if (serverEtag == localEtag) {
console.log("local up to date, printing");
        webDB.getAllArticles(printFromTable);
        // blogContent = webDB.getAllArticles();
        // console.log(blogContent);

      } else {
console.log("local needs update");
        $.getJSON('blogArticles.json', processJSON);
      }

    }

  });

  //passed an array of objects
  function processJSON(data) {
    webDB.execute('DELETE FROM articles'); //TODO
    processedData = convertMarkdown(data); //takes raw data with mix of body and markdown notations, and makes them all have at least body
    webDB.insertAllRecords(processedData);
    webDB.getAllArticles(printFromTable);

    localStorage.setItem('localEtag', localEtag);
    blogData = data;
    console.log('processJSON done.');
  }


  function printFromTable(d) {
    console.log("PRINTING FROM TABLE")
    blogContent = d;
    articleBeingProcessed = d;
    $.get('template.html', function(templateData) {

      $.each(articleBeingProcessed, function(key, value) {
        $articleWrapper = $('#articleWrapper');
        var theTemplate = Handlebars.compile(templateData);
        var finishedArticle = theTemplate(value);
        // console.log(finishedArticle);
        $articleWrapper.append(finishedArticle);
      });

      webDB.getUniqueAuthors(authorCallback);
      webDB.getUniqueCategories(categoryCallback);
      // console.log('WHAT UP ILLY!?');
      setEventListeners();
      setExpandContractListeners();


    });


  };


  function setEventListeners() {
    //STARTS AUTHOR LISTENER
    $('#authorDropDownAnchor').on('change', function() {
      var author = $(this).val();
      $('.authorSpot').each(function() {
        var text = $(this);
        if (text.text() !== author) {
          text.closest('.realArticle').hide();
        } else {
          text.closest('.realArticle').show();
        }
      })
    });
    //STARTS CATEGORY EVENT LISTENER
    $('#categoryDropDownAnchor').on('change', function() {
      var category = $(this).val(); //general VARIABLE
      $('.articleCategory').each(function() {
        var text = $(this);
        //shows all articles if Category placeholder is selected
        if (text === "Category") {
          console.log("cry havoc and let loose the articles regardless of category!");
          $('.articleContent').each(function() {
            $(this).children().not('p:first').hide();
          });
        }
        //if thing selected equals article category, show all
        else if (text.text() !== category) {
          text.closest('.realArticle').hide();
        } else {
          text.closest('.realArticle').show();
        }
      });
    });

  };



  // Hides non-first paragraphs on load
  function setExpandContractListeners() {
    $('.articleContent').each(function() {
      $(this).children().not('p:first').hide();
    });

    //Button events listener that changes the display attribute relative to where the button was pressed.
    $(".expandArticleText").on('click', function() {
      cl("Read More Firing");
      $(this).prev().prev().children().show();
    //  $(this).prevUntil().children().show();
      $(this).hide();
       $(this).next().show();
    });

    $(".contractArticleText").on('click', function() {
      //$(this).prev().prev().children().not('p:first').fadeOut();
      cl("less is firing");
      $(this).prev().prev().prev().children().not('p:first').hide();
      // .children().next().not('p:first').hide(); //fades out paragraph
      $(this).hide(); //hides "read less"
      $(this).prev().fadeIn(); //shows "read more"
      //$(this).parent().prev().children().not('p:first').hide();
      $('html,body').animate({
        scrollTop: $(this).closest('.realArticle').offset().top
      }, 400);
    });
  };


  //author callback

  function authorCallback (x){

    x.forEach(function(object){
      $('#authorDropDownAnchor').append("<option value='"+object.author+"'>"+object.author+ "</option>");
    });
  };

  function categoryCallback (c){
    c.forEach(function(object){
      $('#categoryDropDownAnchor').append("<option value='"+object.category+"'>"+object.category+"</option>");
    });
  };
  //SORT DATE FUNCTION
  function sortDate(A) {
    A.sort(
      function(a, b) {
        if (a.publishedOn < b.publishedOn) {
          return 1;
        }
        if (a.publishedOn > b.publishedOn) {
          return -1;
        }
        return 0;
      }
    );
  }




  $("#aboutNavElement").on('click', function() {
    $('#articleWrapper').fadeOut('slow');
    $('#aboutDiv').fadeIn();
  });

  $("#homeNavElement").on('click', function() {
    $('#articleWrapper').fadeIn();
    $('#aboutDiv').fadeOut('slow');
  });


  function convertMarkdown(arrayOfObj) {
    console.log('about to loop in convertMarkdown');

    arrayOfObj.forEach(function(obj){
// console.log('in for loop, prior to if');
      if (obj.markdown){

        obj.body = marked(obj.markdown);
        // console.log(obj.body);
      }
    })
    return arrayOfObj;

  };

}); //ends IIFE
