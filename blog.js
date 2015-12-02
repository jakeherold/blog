

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

  $(".expandArticleText").on('click',function(){
    $(this).parent().prev().children().fadeIn();
  });

  $("#aboutNavElement").on('click', function(){
      $(this).attr("z-index","3");
      $(this).attr("display","block");
  });




// $("#authorDropDownAnchor").append('<option value="'+this.author+'">'+this.author+'</option>');
// $("#categoryDropDownAnchor").append('<option value="'+this.category+'">'+this.category+'</option>');

  function populateAuthor (){
    var authorArray = [];
    for (jj=0 ; jj<blog.rawData.length ; jj++){
      authorArray.push(blog.rawData[jj].author);
      //console.log(blog.rawData[jj].author);
    }

    console.log(authorArray);
    return authorArray;
  }
  var populatedAuthorArray = populateAuthor();

  populatedAuthorArray.getUnique = function(){
     var u = {}, a = [];
     for(var i = 0, l = this.length; i < l; ++i){
        if(u.hasOwnProperty(this[i])) {
           continue;
        }
        a.push(this[i]);
        u[this[i]] = 1;
     }
     console.log(a);
     return a;
  }
  var populatedAuthorArray = populatedAuthorArray.getUnique();





  var populateCategory= function (){
    var categoryArray = [];
    for (kk=0 ; kk<blog.rawData.length ; kk++){
      categoryArray.push(blog.rawData[kk].category);
      //console.log(blog.rawData[kk].category);
    }
    console.log(categoryArray);
    return categoryArray;
  }
  var populatedCategoryArray = populateCategory();


  populatedCategoryArray.getUnique = function(){
     var u = {}, a = [];
     for(var i = 0, l = this.length; i < l; ++i){
        if(u.hasOwnProperty(this[i])) {
           continue;
        }
        a.push(this[i]);
        u[this[i]] = 1;
     }
     console.log(a);
     return a;
  }
  var populatedCategoryArray = populatedCategoryArray.getUnique();



});


// //snippit from james

//     //Function to put all the unique items in an array
//     function getUnique(inputArray){
//       var outputArray = [];
//       for (i=0; i < inputArray.length; i++){
//         if (($.inArray(inputArray[i], outputArray)) == -1)
//         {
//           outputArray.push(inputArray[i]);
//         }
//       }
//       return outputArray;
//     }
//     //Store returned unique arrays in a variable
//     var uniqueCategories = getUnique(categoryStrings);
//     var uniqueAuthors = getUnique(authorStrings);
//     //Functions to print unique arrays and option tags to the select tag
//     function printToSelect(array, elementId){
//       for(i=0; i<array.length; i++){
//         $(elementId).append("<option value='"+array[i]+"'>"+array[i]+"</option>");
//         console.log(array[i]);
//       }
//     }
//     printToSelect(uniqueCategories, '#category-filter');
//     printToSelect(uniqueAuthors, '#author-filter');
//     //On Author select change, hide all divs not selected
//     $('select').on('change', function (e) {
//       var $selection = $(this).val();
//       console.log($selection);
//       $('article').hide();
//       $(".authorUrl:contains('" + $selection + "')").parents('article').show();
//     });
//   });
