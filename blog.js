//var date = []

function printArticle(obj) {
  this.title = obj.title;
  this.publishedOn = obj.publishedOn;
  this.body = obj.body;
  console.log("baseline printArticle works");
}
//append article to blog
printArticle.prototype.toHtml = function () {
    var $newArticle = $('.articlePlaceholder').clone();
    $newArticle.removeClass('articlePlaceholder');
    $newArticle.find('h1:first').html(this.title);
    $newArticle.find('time').html('exactly ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
    $newArticle.find('.articleContent').html(this.body);
    $newArticle.append('<hr>');
    console.log("print prototype works");
    return $newArticle;
}


$.each(blog.rawData, function(i) {
 $.each(blog.rawData[i], function(key,val) {
   $('#articleWrapper').append(key+val);
 });
});
