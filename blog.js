$(function() {

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
  sortDate(blog.rawData);




  var boilerplateContent = $('#articleTemplate').html();

  var theTemplate = Handlebars.compile(boilerplateContent);

//prints all articles to DOM
  for (mm = 0; mm < blog.rawData.length; mm++){
    var compiledArticle = theTemplate(blog.rawData[mm]);
    $('#articleWrapper').append(compiledArticle);
  }

//Hides non-first paragraphs on load
  $('.articleContent').each(function(){
    $(this).children().not('p:first').hide();
  });

//Button events listener that changes the display attribute relative to where the button was pressed.
  $(".expandArticleText").on('click', function() {
    $(this).prev().children().fadeIn();
    $(this).hide();
    console.log('1');
    $(this).next().show();
    console.log('2');
  });

  $(".contractArticleText").on('click', function() {
    $(this).prev().prev().children().not('p:first').fadeOut();
    $(this).hide();
    $(this).prev().fadeIn();
    console.log('3');
    $(this).parent().prev().children().not('p:first').hide();
    console.log('4');
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
    for (jj = 0; jj < blog.rawData.length; jj++) {
      authorArray.push(blog.rawData[jj].author);
      //console.log(blog.rawData[jj].author);
    }
    //console.log(authorArray);
    return authorArray;
  }
  var populatedAuthorArray = populateAuthor();
  var populatedAuthorArray = getUnique(populatedAuthorArray);

  var populateCategory = function() {
    var categoryArray = [];
    for (kk = 0; kk < blog.rawData.length; kk++) {
      categoryArray.push(blog.rawData[kk].category);
      //console.log(blog.rawData[kk].category);
    }
    //console.log(categoryArray);
    return categoryArray;
  }
  var populatedCategoryArray = populateCategory();
  var populatedCategoryArray = getUnique(populatedCategoryArray);

  //Functions to print unique arrays and option tags to the select tag
  function printToDropdown(array, elementId) {
    for (i = 0; i < array.length; i++) {
      $(elementId).append("<option value='" + array[i] + "'>" + array[i] + "</option>");
      //console.log(array[i]);
    }
  }

  printToDropdown(populatedCategoryArray, '#categoryDropDownAnchor');
  printToDropdown(populatedAuthorArray, '#authorDropDownAnchor');

  $('#authorDropDownAnchor').on('change', function() {
    var author = $(this).val();
    $('.authorName').each(function() {
      var text = $(this);
      if (text.text() !== author) {
        text.closest('.realArticle').hide();
      } else {
        text.closest('.realArticle').show();
      }
    })
  });

  $('#categoryDropDownAnchor').on('change', function() {
    var category = $(this).val();
    $('.categoryAnchor').each(function() {
      var text = $(this);
      if (text.text() !== category) {
        text.closest('.realArticle').hide();
      } else {
        text.closest('.realArticle').show();
      }
    })
  });
});
