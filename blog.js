//var date = []

function printArticle(obj) {
  this.title = obj.title;
  this.author = obj.author;
  this.publishedOn = obj.publishedOn;
  this.body = obj.body;
}
//append article to blog
printArticle.prototype.toHtml = function () {
    var $newArticle = $('.articlePlaceholder').clone();
    $newArticle.removeClass('articlePlaceholder');
    console.log("1");
    $newArticle.find('h1:first').html(this.title);
    console.log("2");
    $newArticle.append('<hr>');
    console.log("3");
    $newArticle.find('#authorSpot').html('<p>Author: '+this.author + '</p>');
    console.log("4");
    $newArticle.find('time').html('Published ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
    console.log("5");
    $newArticle.append('<hr>');
    console.log("6");
    $newArticle.find('.articleContent').html(this.body);
    console.log("7");
    $newArticle.append('<hr>');
    console.log("8");
    return $newArticle;
}


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

   var dataArray = {};
   for(ii=0; ii<blog.rawData.length; ii++){
     dataArray = new printArticle(blog.rawData[ii]);
     $('#articleWrapper').append(dataArray.toHtml());
   }
 });


// //sort rawdata array
// $(function() {
//
//    function sortArticles(A) {
//      A.sort(
//       function(a, b) {
//         if (a.publishedOn.getTime() < b.publishedOn.getTime()) { return 1; }
//         if (a.publishedOn.getTime() > b.publishedOn.getTime()) { return -1; }
//         return 0;
//       }
//     );
//    }
//
//    sortArticles(blog.rawData);
//  });
//
//
//
// //print ALL THE THINGS!
// $.each(blog.rawData, function(i) {
//  $.each(blog.rawData[i], function(key,val) {
//    $('#articleWrapper').append(val);
//  });
// });
