

$(function() {

  function sortDate(A) {
    A.sort(
      function(a, b) {
        if (a.publishedOn < b.publishedOn) { return 1; }
        if (a.publishedOn > b.publishedOn) { return -1; }
        return 0;
      }
    );
  }
  sortDate(blog.rawData);

  function printArticle(obj) {
    this.title = obj.title;
    this.author = obj.author;
    this.authorUrl = obj.authorUrl;
    this.publishedOn = obj.publishedOn;
    this.body = obj.body;
    this.category = obj.category;
  }

  //append article to blog
  printArticle.prototype.toHtml = function () {
      var $newArticle = $('.articlePlaceholder').clone();
      $newArticle.removeClass('articlePlaceholder');
      $newArticle.find('h1:first').html(this.title);
      $newArticle.append('<hr>');
      $newArticle.find('#authorSpot').html('<a href= '+this.authorUrl+'<p>Author: '+this.author + '</p></a>');
      $newArticle.find('time').html('Published ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
      $newArticle.append('<hr>');
      $newArticle.find('.articleContent').html(this.body);
      $newArticle.find('.articleContent').children().not('p:first').hide();
      $newArticle.find('.buttonAnchor').html('<br><button class="expandArticleText"> -> Expand Article </button><br>');
      $newArticle.append('<hr><br>');

      return $newArticle;
  }


  var dataArray = {};

  for(ii=0; ii<blog.rawData.length; ii++){
    dataArray = new printArticle(blog.rawData[ii]);
    $('#articleWrapper').append(dataArray.toHtml());
  }

//Button events listener that changes the display attribute relative to where the button was pressed.
  $(".expandArticleText").on('click',function(){
    $(this).parent().prev().children().fadeIn();
  });


//Trying to pull up about page on about click. But, it doesn't wanna go. debug!
  $("#aboutNavElement").on('click', function(){
      $(this).attr("z-index","3");
      $(this).attr("display","block");
  });

//getUnique takes an array arguement and parses out all redundant bits of the array, returning a clean//simple array back
  var getUnique = function(array){
    console.log("before =" + array);
     var u = {}, a = [];
     for(var i = 0, l = array.length; i < l; ++i){
        if(u.hasOwnProperty(array[i])) {
           continue;
        }
        a.push(array[i]);
        u[array[i]] = 1;
     }
     console.log("after =" + a);
     return a;
  }

  function populateAuthor (){
    var authorArray = [];
    for (jj=0 ; jj<blog.rawData.length ; jj++){
      authorArray.push(blog.rawData[jj].author);
      //console.log(blog.rawData[jj].author);
    }
    //console.log(authorArray);
    return authorArray;
  }
  var populatedAuthorArray = populateAuthor();
  var populatedAuthorArray = getUnique(populatedAuthorArray);




  var populateCategory= function (){
    var categoryArray = [];
    for (kk=0 ; kk<blog.rawData.length ; kk++){
      categoryArray.push(blog.rawData[kk].category);
      //console.log(blog.rawData[kk].category);
    }
    //console.log(categoryArray);
    return categoryArray;
  }
  var populatedCategoryArray = populateCategory();
  var populatedCategoryArray = getUnique(populatedCategoryArray);

  //Functions to print unique arrays and option tags to the select tag
  function printToDropdown(array, elementId){
    for(i=0; i<array.length; i++){
      $(elementId).append("<option value='"+array[i]+"'>"+array[i]+"</option>");
      console.log(array[i]);
    }
  }


  printToDropdown(populatedCategoryArray, '#categoryDropDownAnchor');
  printToDropdown(populatedAuthorArray, '#authorDropDownAnchor');

  // //On Author select change, hide all divs not selected
  // $('select').on('change', function (e) {
  //   var $selection = $(this).val();
  //   console.log($selection);
  //   $('article').hide();
  //   $(".authorUrl:contains('" + $selection + "')").parents('article').show();
  // });

});
