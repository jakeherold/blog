var blog = blog || ({});

function printArticle (details) {
    this.title = details.title;
    this.category = details.category;
    this.author = details.author;
    this.authorUrl = details.authorUrl;
    this.publishedOn = details.publishedOn;
    this.body = details.body;
}
