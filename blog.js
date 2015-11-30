function articleOut() {
 $('h1:first').html(blog.rawData[0].title);
 
}

articleOut();
//append article to blog
printArticle.prototype.toHtml = function () {
    var $newArticle =


    $('articleWrapper.articlePlaceholder').clone();
    $newArticle.removeClass('articlePlaceholder');
    $newArticle.find('h1:first').html(this.title);
    $newArticle.find('time').html('exactly ' + parseInt((new Date() - new Date(this.pubdate))/60/60/24/1000) + ' days ago');
    $newArticle.find('.articleContent').html(this.body);
    $newArticle.append('<hr>');
    return $newArticle;

}

//sort function?
