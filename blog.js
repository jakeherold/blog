//Each locally stored object is ("localEtag":"numbers and crap", localArticleData: "bunch of article stuff")
$(function() {


//++++++++++++++++++WORKZONE++++++++++++++++++++++++
webDB.init();
webDB.execute('DROP TABLE articles');
webDB.setupTables();

var blogData ;
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
    }
    else {
      $.getJSON('blogArticles.json', processJSON);






    }

  }

});


//passed an array of objects
function processJSON(data){
  middleData = convertMarkdown(data); //takes raw data with mix of body and markdown notations, and makes them all have at least body
  
  webDB.setupTables();  //
  webDB.insertAllRecords(middleData);

  // webDB.insertAllRecords(cleanData);
  webDB.getAllArticles(printFromTable);//TODO
  localStorage.setItem('localEtag', localEtag);
  blogData = data;
  console.log('processJSON done.');
}


function printFromTable(d){
  articleBeingProcessed = d;
  $.get('template.html', function(templateData) {

    $.each(articleBeingProcessed, function (key, value){
      $articleWrapper = $('#articleWrapper');
      var theTemplate = Handlebars.compile(templateData);
      var finishedArticle = theTemplate(value);
      console.log(finishedArticle);
      $articleWrapper.append(finishedArticle);
    });

  });

  // console.log("The computer gods are perfectly just. To them, capriciousness is anathema. You have in your Page what you made to be there. We all must reap what we sow. ");

  setEventListeners();
  setExpandContractListeners();

  };


});




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
















//++++++++++++end work zone++++++++++++++++++++++
  // var localArticleData = JSON.parse(localStorage.getItem('localArticleData'));
  // var localContent = localStorage.getItem('localArticleData');
  // var data = convertMarkdown(localArticleData);
  //
  // webDB.insertRecord(data);
  //
  //
  //
  // //variables to hold author and category data for dropdown population
  // var arrayOfAuthors = data.map(makeAuthorArray)
  // var uniqueAuthorArray = $.unique(arrayOfAuthors.map(function(A) {
  //   return A.author;
  // }));
  // var arrayOfCategories = data.map(makeCategoryArray);
  // var uniqueCategoryArray = $.unique(arrayOfCategories.map(function(C) {
  //   return C.category;
  // }));
  //
  // printToDropdown(uniqueAuthorArray, '#authorDropDownAnchor');
  // printToDropdown(uniqueCategoryArray, '#categoryDropDownAnchor');
  //
  //
  //
  //
  //
  // //getUnique takes an array arguement and parses out all redundant bits of the array, returning a clean//simple array back
  // function getUnique(array) {
  //   var u = {},
  //     a = [];
  //   for (var i = 0, l = array.length; i < l; ++i) {
  //     if (u.hasOwnProperty(array[i])) {
  //       continue;
  //     }
  //     a.push(array[i]);
  //     u[array[i]] = 1;
  //   }
  //   return a;
  // }
  //
  //
  //
  //
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
  //
  // //a=article
  // function makeAuthorArray(a) {
  //   var authArray = {};
  //   authArray.author = a.author;
  //   return authArray;
  // }
  //
  // //c=category
  // function makeCategoryArray(c) {
  //   var catArray = {};
  //   catArray.category = c.category;
  //   return catArray;
  // }
  //
  // //SETS EMPTY VARIBLE TO HOLD SERVER"S eTag VALUE
  // var serverETag;
  //
  // //PULLS eTag FROM SERVER (FILLS INTO serverETag)
  // var getEtagFromServer = function() {
  //   $.ajax({
  //     type: 'HEAD',
  //     url: 'blogArticles.json',
  //     // dataType: "json",
  //     success: function(data, status, xhr) {
  //       var eTag = xhr.getResponseHeader('eTag');
  //       // console.log(eTag);
  //       serverETag = eTag;
  //     }
  //   });
  // }
  //
  // getEtagFromServer();
  //
  // //SETS EMPTY VARIABLE TO HOLD THE eTag STORED LOCALLY
  // var localEtag = localStorage.getItem('localEtag');
  //
  // //TAKES SERVERSIDE ETAG VARIABLE AND PRINTS IT TO LOCAL STORAGE
  // var setEtagFromServer = function() {
  //   localStorage.setItem('localEtag', serverETag);
  // }

  function getEtagFromBrowser () {
    eTagTemp = localStorage.getItem('localEtag', localEtag);
    localEtag = eTagTemp;
    return localEtag;
  }

  //PULLS OBJECT FROM SERVER (FILLS INTO SERVERCONTENT)
  // var getArticleDataObjectFromServer = function() {
  //   return $.ajax({
  //     type: 'GET',
  //     url: 'blogArticles.json',
  //   });
  // };
  //
  //
  // getArticleDataObjectFromServer().done(function(data, status_Code, xhr) {
  //   console.log("got stuff from server good");
  //
  //   //CHECKS TO SEE IF THERE IS A LOCAL eTAG
  //   if (localEtag) {
  //     getEtagFromServer();
  //     if (localEtag !== serverETag) { //local  etag ==== server etag
  //       console.log("cache needs update. Updating");
  //       updateLocalArticles();//pull data from server and load to cache
  //     } else {
  //       console.log("cache up to date. Printing.");
  //       printFromLocal(); //load from local cache
  //     }
  //   } else {
  //     console.log("cache empty. Updating");
  //     updateLocalArticles(); //pull data from server and load to cache
  //   }
  // });


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
      console.log("The computer gods are perfectly just. To them, capriciousness is anathema. You have in your Page what you made to be there. We all must reap what we sow. ");

      setEventListeners();
      setExpandContractListeners();

    });

  }



  $("#aboutNavElement").on('click', function() {
    $('#articleWrapper').fadeOut('slow');
    $('#aboutDiv').fadeIn();
  });

  $("#homeNavElement").on('click', function() {
    $('#articleWrapper').fadeIn();
    $('#aboutDiv').fadeOut('fast');
  });



  //gets messy array of objects, and filters by key
  function populateUniqueArray(array, keyToFilterBy) {
    var x = [];
    for (vv = 0; vv < array.length; vv++) {
      x.push(array[vv].keyToFilterBy);
    }
    var z = $.unique(x.map(function(A) {
      return A.keyToFilterBy;
    }));
    return z;
  }

  function populateAuthor() {
    var authorArray = [];
    for (jj = 0; jj < globalUniqueAuthorArray.length; jj++) {
      authorArray.push(globalUniqueAuthorArray[jj]);
    }
    return authorArray;
  }

  var populateCategory = function() {
    var categoryArray = [];
    for (kk = 0; kk < localContent.length; kk++) {
      categoryArray.push(localContent[kk].category);
    }
    return categoryArray;
  }


  //Functions to print unique arrays and option tags to the select tag
  function printToDropdown(array, elementId) {
    for (i = 0; i < array.length; i++) {
      $(elementId).append("<option value='" + array[i] + "'>" + array[i] + "</option>");
    }
  }






// }); //this one has to be here for IIFE
