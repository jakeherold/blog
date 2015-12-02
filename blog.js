

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
      //$newArticle.find('p:first').show();
      $newArticle.find('.buttonAnchor').html('<br><button class="expandArticleText"> -> Expand Article </button><br>');
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
    $(this).parent().prev().children().show();
    console.log("The JS interpret should've expanded now");
  });

});
