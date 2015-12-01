

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
      $newArticle.find('.articleContent').hide();
      $newArticle.find('p:first').show();

      // $newArticle.find('p:first').removeClass('minimize');
      $newArticle.find('.buttonAnchor').html('<br><button class="expandArticleText"> -> Expand Article </button><br>');
      //console.log("button cretor firing");
      $newArticle.append('<hr><br>');
      $("#authorDropDownAnchor").append('<option value="'+this.author+'">'+this.author+'</option>');
      $("#categoryDropDownAnchor").append('<option value="'+this.category+'">'+this.category+'</option>');
      return $newArticle;
  }


  var dataArray = {};

  for(ii=0; ii<blog.rawData.length; ii++){
    dataArray = new printArticle(blog.rawData[ii]);
    $('#articleWrapper').append(dataArray.toHtml());
  }

  $(".expandArticleText").click(function(){
    console.log("Expand firing 1.0");
    $(this).parent().prev().show();

  });

});

// jQuery(function(){
//
//     var minimized_elements = $('.articleContent');
//
//     minimized_elements.each(function(){
//         var t = $(this).text();
//         if(t.length < 100) return;
//
//         $(this).html(
//             t.slice(0,100)+'<span>... </span><a href="#" class="more">More</a>'+
//             '<span style="display:none;">'+ t.slice(100,t.length)+' <a href="#" class="less">Less</a></span>'
//         );
//
//     });
//
//     $('a.more', minimized_elements).click(function(event){
//         event.preventDefault();
//         $(this).hide().prev().hide();
//         $(this).next().show();
//     });
//
//     $('a.less', minimized_elements).click(function(event){
//         event.preventDefault();
//         $(this).parent().hide().prev().show().prev().show();
//     });
// });


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
