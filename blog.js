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

$(function() {
  var arObj0 = {};
  var arObj1 = {};
  if (blog.rawData[0].publishedOn < blog.rawData[1].publishedOn) {
    arObj0 = new printArticle(blog.rawData[1]);
    arObj1 = new printArticle(blog.rawData[0]);
  }
  else {
    arObj0 = new printArticle(blog.rawData[0]);
    arObj1 = new printArticle(blog.rawData[1]);
  }
  console.log("Empty auto-run part one");
  $('#articleWrapper').append(arObj0.toHtml());
  $('#articleWrapper').append(arObj1.toHtml());
console.log("Empty auto-run");
  }
);
