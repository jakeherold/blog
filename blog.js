//Each locally stored object is ("localEtag":"numbers and crap", localArticleData: "bunch of article stuff")
$(function() {





//SORT DATE FUNCTION TO OPEN
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
  // sortDate(blog.rawData);

//SETS EMPTY VARIBLE TO HOLD SERVER"S eTag VALUE
  var serverEtag;

//SETS EMPTY VARIABLE TO HOLD THE eTag STORED LOCALLY
  var localEtag = localStorage.getItem(localEtag);



//PULLS eTag FROM SERVER (FILLS INTO serverETag)
var getEtagFromServer = function (){
  $.ajax({
   type: 'HEAD',
   url: 'blogArticles.json',
   // dataType: "json",
   success: function( data, status, xhr){
       console.log(xhr.getResponseHeader ('eTag'));
       var eTag = xhr.getResponseHeader('eTag');
       serverETag = eTag;
     }
   });
}
//PULLS OBJECT FROM SERVER (FILLS INTO SERVERCONTENT)
var getArticleDataObjectFromServer = function (){
  return $.ajax({
    type: 'GET',
    url: 'blogArticles.json',

  });
};


getArticleDataObjectFromServer().done(function(data, textStatus, xhr){
  console.log("got stuff from server good");
  localEtagPlaceholder = getEtagFromBrowser();
  //CHECKS TO SEE IF THERE IS A LOCAL eTAG
    if (localEtagPlaceholder){
        getEtagFromServer();
        if (localEtagPlaceholder !== serverEtag){  //local  etag ==== server etag
          console.log("cache needs update. Updating");
          updateLocalArticles();
                            //pull from local cache
        } else {
          console.log("cache up to date. Printing.");
          printFromLocal();    //load from server
        }
    } else {
        console.log("cache empty. Updating");
        updateLocalArticles();         //pull data from server and load
    }

});

//TAKES JS ETAG VARIABLE AND PRINTS IT TO LOCAL STORAGE
var setEtagFromServer = function (){
  localStorage.setItem('localEtag', serverEtag);

}

//
var getEtagFromBrowser = function (){
  localStorage.getItem('localEtag', localEtag)
}

//shamelessly accepted help from J. Hurr. Mad props for the assist, yo. :P
var convertMarkdown = function(arrayOfObj){
   for (ii = 0; ii<arrayOfObj.length; ii++){
     if(arrayOfObj[ii].markdown){
       arrayOfObj[ii].body = marked(arrayOfObj[ii].markdown);
     }
   }
   return arrayOfObj;
 };


var updateLocalArticles = function(){
  localStorage.setItem('localEtag', localEtag);
  $.getJSON('blogArticles.json',function (localArticleData){
    console.log('Updating local articles');
    localStorage.setItem('localArticleData', JSON.stringify(localArticleData));
    console.log('local articles updated. Let do this thing!');
    printFromLocal();
  });
};

//PRINTS ARTICLES. Takes local data, updated by updateLocal
var printFromLocal = function(){
  localArticleData = JSON.parse(localStorage.getItem('localArticleData'));
  console.log(localArticleData);
  sortDate(localArticleData);
  console.log(localArticleData);
  localArticleData = convertMarkdown(localArticleData);
  console.log(localArticleData);


  $.get( 'template.html' , function (z) {
    console.log(z);
    var theTemplate = Handlebars.compile(z);
    console.log(theTemplate);
    console.log(localArticleData);
      for (mm = 0; mm < localArticleData; mm++){
        var compiledArticle = theTemplate(localArticleData[mm]);
        console.log("make an article!");
        $('#articleWrapper').append(compiledArticle);
        console.log("print an article!");
    }
    console.log("lets hope to the lord that it printed, else may God have mercy on my soul");
  });
  // var populatedAuthorArray = populateAuthor();
  // var populatedAuthorArray = getUnique(populatedAuthorArray);
  // var populatedCategoryArray = populateCategory();
  // var populatedCategoryArray = getUnique(populatedCategoryArray);
  // printToDropdown(populatedCategoryArray, '#categoryDropDownAnchor');
  // printToDropdown(populatedAuthorArray, '#authorDropDownAnchor');
}

// var serverContent =
 localContent = localStorage.getItem('localArticleData');
//Hides non-first paragraphs on load
  $('.articleContent').each(function(){
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
    $('html,body').animate( {scrollTop: $(this).closest('.realArticle').offset().top}, 400);
  });

  $("#aboutNavElement").on('click', function() {
    console.log("registered onclick");
    $('#articleWrapper').fadeOut('slow');
    $('#aboutDiv').fadeIn();
  });

  $("#homeNavElement").on('click', function() {
    console.log("registered onclick");
    $('#articleWrapper').fadeIn();
    $('#aboutDiv').fadeOut('fast');
  });

  //getUnique takes an array arguement and parses out all redundant bits of the array, returning a clean//simple array back
  var getUnique = function(array) {
    console.log("before =" + array);
    var u = {},
      a = [];
    for (var i = 0, l = array.length; i < l; ++i) {
      if (u.hasOwnProperty(array[i])) {
        continue;
      }
      a.push(array[i]);
      u[array[i]] = 1;
    }
    console.log("after =" + a);
    return a;
  }

  function populateAuthor() {
    var authorArray = [];
    for (jj = 0; jj < localContent.length; jj++) {
      authorArray.push(localContent[jj].author);
      //console.log(blog.rawData[jj].author);
    }
    //console.log(authorArray);
    return authorArray;
  }
  // var populatedAuthorArray = populateAuthor();
  // var populatedAuthorArray = getUnique(populatedAuthorArray);

  var populateCategory = function() {
    var categoryArray = [];
    for (kk = 0; kk < localContent.length; kk++) {
      categoryArray.push(localContent[kk].category);
      //console.log(blog.rawData[kk].category);
    }
    //console.log(categoryArray);
    return categoryArray;
  }

  // var populatedCategoryArray = populateCategory();
  // var populatedCategoryArray = getUnique(populatedCategoryArray);

  //Functions to print unique arrays and option tags to the select tag
  function printToDropdown(array, elementId) {
    for (i = 0; i < array.length; i++) {
      $(elementId).append("<option value='" + array[i] + "'>" + array[i] + "</option>");
      //console.log(array[i]);
    }
  }

  // printToDropdown(populatedCategoryArray, '#categoryDropDownAnchor');
  // printToDropdown(populatedAuthorArray, '#authorDropDownAnchor');

  // $('#authorDropDownAnchor').on('change', function() {
  //   var author = $(this).val();
  //   $('.authorSpot').each(function() {
  //     var text = $(this);
  //     if (text.text() !== author) {
  //       text.closest('.realArticle').hide();
  //     } else {
  //       text.closest('.realArticle').show();
  //     }
  //   })
  // });

  // $('#categoryDropDownAnchor').on('change',
  //
  // function() {
  //   var category = $(this).val();
  //
  //   $('.articleCategory').each(function() {
  //     var text = $(this);
  //     //shows all articles if Category placeholder is selected
  //     if (text === "Category"){
  //       console.log("cry havoc and let loose the articles regardless of category!");
  //       $('.articleContent').each(function(){
  //         $(this).children().not('p:first').hide();
  //       });
  //
  //     }
  //
  //
  //     //if thing selected equals article category, show all
  //     else if(text.text() !== category) {
  //       text.closest('.realArticle').hide();
  //     } else {
  //       text.closest('.realArticle').show();
  //     }
  //   });
  // });

}); //this one has to be here for IIFE
