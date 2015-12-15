//Each locally stored object is ("localEtag":"numbers and crap", localArticleData: "bunch of article stuff")
$(function() {


//++++++++++++++++++WORKZONE++++++++++++++++++++++++
webDB.init();
webDB.execute('DROP TABLE articles'); //TODO
webDB.setupTables();

var blogData ;
var blogContent;
var localEtag;
var serverEtag;

var ajaxRequest = $.ajax({
  type: 'head',
  url: 'blogArticles.json',

  success: function(data, serveStatus, jqXHR){
    console.log(serveStatus);

    serverEtag = jqXHR.getResponseHeader('eTag');
    localEtag  = localStorage.getItem('localEtag');
    console.log('ajaxRequest was successful');

    if (serverEtag == localEtag){
      webDB.getAllArticles(printFromTable);
      // blogContent = webDB.getAllArticles();
      // console.log(blogContent);

    }
    else {
      $.getJSON('blogArticles.json', processJSON);
    }

  }

});

// .done(){
//
// }
//passed an array of objects
function processJSON(data){
  middleData = convertMarkdown(data); //takes raw data with mix of body and markdown notations, and makes them all have at least body

  webDB.setupTables();
  webDB.insertAllRecords(middleData);

  // webDB.insertAllRecords(cleanData);
  webDB.getAllArticles(printFromTable);
  localStorage.setItem('localEtag', localEtag);
  blogData = data;
  console.log('processJSON done.');
}


function printFromTable(d){
  blogContent = d;
  articleBeingProcessed = d;
  $.get('template.html', function(templateData) {

    $.each(articleBeingProcessed, function (key, value){
      $articleWrapper = $('#articleWrapper');
      var theTemplate = Handlebars.compile(templateData);
      var finishedArticle = theTemplate(value);
      // console.log(finishedArticle);
      $articleWrapper.append(finishedArticle);
    });

    populateDropdowns();
    console.log('WHAT UP ILLY!?');
    setEventListeners();
    setExpandContractListeners();


  });
  // .done(function(){
  //   populateDropdowns();
  //   console.log('WHAT UP ILLY!?');
  //   setEventListeners();
  //   setExpandContractListeners();
  // });


  // populateDropdowns();
  // console.log('WHAT UP ILLY!?');
  // setEventListeners();
  // setExpandContractListeners();

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
  };

  //ENDS EVENT LISTENERS CALL SECTION

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  //GET DATA FOR DROPDOWNS

  function populateDropdowns(){

    var Authors = populateAuthor();
    // var uAuthors = populateUniqueArray(Authors, author);
    printToDropdown(Authors, 'authorDropDownAnchor');
    // var Categories = populateCategory();
    // var uCategories = populateUniqueArray(Categories, "category");
    // printToDropdown(uCategory, '#categoryDropDownAnchor');
  }
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

  //gets messy array of objects, and filters by key
  function populateUniqueArray(array, keyToFilterBy) {
    var x = [];
    for (vv = 0; vv < array.length; vv++) {
      x.push(array[vv]);
    }
    var z = $.unique(x.map(function(A) {
      return A.author;
    }));
    return z;
  }

  function populateAuthor() {
    var authorArray = [];
    for (jj = 0; jj < blogContent.length; jj++) {
      authorArray.push(blogContent[jj].author);
    }
    var x = $.unique(authorArray.map(function(X){
      return X.author;
    }))
    return x;
  }

  var populateCategory = function() {
    var categoryArray = [];
    for (kk = 0; kk < blogContent.length; kk++) {
      categoryArray.push(blogContent[kk].category);
    }
    return categoryArray;
  }


  //Functions to print unique arrays and option tags to the select tag
  function printToDropdown(array, elementId) {
    for (i = 0; i < array.length; i++) {
      $(elementId).append("<option value='" + array[i] + "'>" + array[i] + "</option>");
    }
  }

  $("#aboutNavElement").on('click', function() {
    $('#articleWrapper').fadeOut('slow');
    $('#aboutDiv').fadeIn();
  });

  $("#homeNavElement").on('click', function() {
    $('#articleWrapper').fadeIn();
    $('#aboutDiv').fadeOut('slow');
  });



  function getEtagFromBrowser () {
    eTagTemp = localStorage.getItem('localEtag', localEtag);
    localEtag = eTagTemp;
    return localEtag;
  }

  //shamelessly accepted from J. Hurr. Mad props for the assist!
    function convertMarkdown(arrayOfObj) {
      for (ii = 0; ii < arrayOfObj.length; ii++) {
        if (arrayOfObj[ii].markdown) {
          arrayOfObj[ii].body = marked(arrayOfObj[ii].markdown);
        }
      }
      return arrayOfObj;
    };

  var updateLocalArticles = function() {
    getEtagFromServer();
    setEtagFromServer();
    $.getJSON('blogArticles.json', function(localArticleData) {
      console.log('Updating local articles');
      localStorage.setItem('localArticleData', JSON.stringify(localArticleData));
      console.log('local articles updated. Let do this thing!');
      printFromLocal();
    });
  };

  //PRINTS ARTICLES. Takes local data, updated by updateLocal
   function printFromLocal() {

    sortDate(localArticleData);
    localArticleData = convertMarkdown(localArticleData);

    $.get('template.html', function(z) {
      var theTemplate = Handlebars.compile(z);
      for (mm = 0; mm < localArticleData.length; mm++) {
        var compiledArticle = theTemplate(localArticleData[mm]);
        $('#articleWrapper').append(compiledArticle);
      }
      // console.log("The computer gods are perfectly just. To them, capriciousness is anathema. You have in your Page what you made to be there. We all must reap what we sow. ");

      setEventListeners();
      setExpandContractListeners();

    });

  }
}); //ends IIFE
