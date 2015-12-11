var localContentRaw = $.getJSON('blogArticles.json', function(localContentRaw)
 {

var localContent = convertToMarkdown(localContentRaw);
 console.log(localContent);
//pass it (makeSearchFilter("keytype", "value"));
//example: var x = qq.filter(makeSearchFilter("author", "rowling"));
//returns array that fits criteria
function makeSearchFilter(keyType, value){
  var valueToSearchFor = value;
  return function (A){
    return A[keyType] == valueToSearchFor;
  }
}
//getUnique takes an array arguement and parses out all redundant bits of the array, returning a clean//simple array back
function getUnique (array) {
  var u = {},
    a = [];
  for (var i = 0, l = array.length; i < l; ++i) {
    if (u.hasOwnProperty(array[i])) {
      continue;
    }
    a.push(array[i]);
    u[array[i]] = 1;
  }
  return a;
}


//a=article
function makeAuthorArray(a){
  var authArray = {};
  authArray.author = a.author;
  return authArray;
}
//Takes in an object and outputs an interger
function wordCount(rawArticles){
  var countedWordsInArticle = $(rawArticles.body).text().split(' ').length;
  return countedWordsInArticle
}

//Takes in a string and outputs an interger
function wordLength(word){
  return word.length;
}

function getWordLengths(x){
  var wordsSplit = wordLength(x);
  var arrayOfWordLengths = wordsSplit.map(wordLength);
  return arrayOfWordLengths.reduce(sum);
}
function convertToMarkdown(a){
  if (a.markdown){
    a.body = marked(a.markdown);
  }
  return a;
}
function sum(p, n) {
  return p + n;
}



function authorStatsMaker (author, authorAverageWordLength){
  var authorStatsObject = {};
  authorStatsObject.author = author;
  authorStatsObject.avgWordLength = authorAverageWordLength;
  return authorStatsObject;
}


//THE MAIN BIT


function getStats (rawBrowserData){

  var stats = stats || {}; //sets object to be filled with keys
  var rawArticles = rawBrowserData;
  var bodyValue = 0;

  // var articlesContainingHtmlStill;
  // var articlesWordCount;
  // var wordLengthsTotal;
  var getArticleBody = $.grep(localContent, function(my) {
     return my.markdown;
   });

   $.each(getArticleBody, function(key, value) {
     bodyValue += $(marked(value.markdown)).text();
    //  console.log(bodyValue);
   });

  var wordArray = bodyValue.split(/\s+/); //sets an array with every word available

//WORD COUNT
  var numWords = wordArray.length;
  $('#wordCount').append(numWords);

//ALL AUTHORS
  var arrayOfAuthors = rawArticles.map(makeAuthorArray);

//WORDS PER ARTICLE
  stats.avgWordsPerArticle = Math.floor((numWords)/(rawArticles.length));
  $('#averageWordsPerArticle').append(stats.avgWordsPerArticle);

//NUMBER OF ARTICLES
  stats.numberArticles = rawArticles.length;
  $('#numberArticles').append(stats.numberArticles);

//Unique and number OF AUTHORS
  var uniqueAuthorArray = $.unique(arrayOfAuthors.map(function(A) { return A.author; }));
  stats.numberAuthors = uniqueAuthorArray.length;
  $('#uniqueAuthors').append(stats.numberAuthors);

//Letters Per Word:
totalWordLengths = wordArray.map(wordLength);
stats.avgWordLength = Math.round((totalWordLengths.reduce(sum))/(numWords));
$('#avgWordLength').append(stats.avgWordLength);


//???????????????????WORK ZONE??????????????????
function Author (name, wordCount){ //makes author object
  this.name = name;
  this.wordCount = wordCount;
}

stats.authorWordsPerArticle = uniqueAuthorArray.map(function(authorPassingThrough){  //iterates through the array holding each author's name

  var matchingAuthor = authorPassingThrough; //sets matching author so we can use it in the function
  var matchingArticles = localContent.filter(function(aa){   //filter processed articles, filtering by each author in uniqueAuthorsArray
    if (aa.author==matchingAuthor){
      return true;
    }
    else {
      return false;
    }
  });

  var wordCountArrayPerAuthor = matchingArticles.map(function(articleObject){ //get an array of numbers that returns words per article for a given author
     var words = wordCount(articleObject);
     return words;

  });

  var wordCountPerAuthor = wordCountArrayPerAuthor.reduce(sum); //takes all numbers for each array and sums them
  var potato = new Author (authorPassingThrough , wordCountPerAuthor);
  return potato;

});
console.log(stats.authorWordsPerArticle);
function printAuthorWordsPerArticle () {
  var array = stats.authorWordsPerArticle;
  for (i = 0; i < array.length; i++) {
    $('#authorWordsPerArticle').append("<p"+array[i]+"</p>");
    console.log(array[i]);
  }
};
//!!!!!!!!!!!!!!!!!!!!!!!END Words per Author ZONE!!!!!!!!!!!!!

  return stats;
};

getStats(localContent);

});//ends getJSON Callback
