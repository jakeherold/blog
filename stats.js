 var localContent = $.getJSON('blogArticles.json', function(localContent)
 {
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
// var searchResult = localContent.filter(makeSearchFilter("category", "sports"));
// console.log(searchResult);





//getUnique takes an array arguement and parses out all redundant bits of the array, returning a clean//simple array back
function getUnique (array) {
  console.log("before =" + array);
  var u = {},
    a = [];
  for (var i = 0, l = array.length; i < l; ++i) {
    if (u.hasOwnProperty(array[i])) {
      continue;
    }
    a.push(array[i]);
    u[array[i]] = 1;
  }
  console.log("after =" + a);
  return a;
}

//a=article
function makeAuthorArray(a){
  var authArray = {};
  authArray.author = a.author;
  return authArray;
}
function wordCount(rawArticles){
  var countedWordsInArticle = $(rawArticles.body).text().split(' ').length;
  return countedWordsInArticle
}

function wordLength(word){
  return word.length;
}
function getWordLengths(x){
  var wordsSplit = wordLength(x);
  var arrayOfWordLengths = wordsSplit.map(wordLength);
  console.log(wordsSplit);
  return arrayOfWordLengths.reduce(sum);
}
// function convertToMarkdown(a){
//   if (a.markdown){
//     a.body = marked(a.markdown);
//   }
//   return a;
// }
function sum(p, n) {
  return p + n;
}

//var characterCount = $(localContent.text).length;
//var avgLettersPerWord = ((characterCount) /(bodyValue));
//

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
  console.log(rawArticles);
  var bodyValue = $(localContent.body).text();

  // var articlesContainingHtmlStill;
  // var articlesWordCount;
  // var wordLengthsTotal;
  var getArticleBody = $.grep(localContent, function(my) {
     return my.markdown;
   });

   $.each(getArticleBody, function(key, value) {
     bodyValue += $(marked(value.markdown)).text();
   });

  var wordArray = bodyValue.split(/\s+/); //sets an array with every word available
  console.log(wordArray);

//WORD COUNT
  var wordCount = bodyValue.split(/\s+/).length;
  console.log("total words on site is " +  wordCount);
  $('#wordCount').append(wordCount);

//UNIQUE AUTHORS
  var arrayOfAuthors = rawArticles.map(makeAuthorArray)
  console.log(arrayOfAuthors);

//WORDS PER ARTICLE
  stats.avgWordsPerArticle = Math.floor((wordCount)/(rawArticles.length));
  console.log("number of words per article is " +stats.avgWordsPerArticle);
  $('#averageWordsPerArticle').append(stats.avgWordsPerArticle);

//NUMBER OF ARTICLES
  stats.numberArticles = rawArticles.length;
  console.log("number of articles is: "+stats.numberArticles);
  $('#numberArticles').append(stats.numberArticles);

//NUMBER OF AUTHORS
  var uniqueAuthorArray = $.unique(arrayOfAuthors.map(function(A) { return A.author; }));
  console.log(uniqueAuthorArray);
  stats.numberAuthors = $.unique(arrayOfAuthors.map(function(A) { return A.author; })).length;
  console.log("Number of unique authors is: "+stats.numberAuthors);
  $('#uniqueAuthors').append(stats.numberAuthors);

//Letters Per Word:
console.log(wordArray);
totalWordLengths = wordArray.map(wordLength);
console.log(totalWordLengths);
stats.avgWordLength = Math.round((totalWordLengths.reduce(sum))/(wordCount));
console.log(stats.avgWordLength);
$('#avgWordLength').append(stats.avgWordLength);


//???????????????????WORK ZONE??????????????????

stats.authorWordsPerArticle = [];
var authorsWithMatchingArticles = [];

uniqueAuthorArray.forEach(function(authorPassingThrough){
  var matchingAuthor = authorPassingThrough;
  var matchingArticles = localContent.filter(function(aa){
    if (aa.author==matchingAuthor){
      return true;
    }
    else {
      return false;
    }
  });
  authorsWithMatchingArticles.push(matchingArticles);
});
console.log(authorsWithMatchingArticles);

authorsWithMatchingArticles.forEach(function(authorsWithMatchingArticles){
  var author = authorsWithMatchingArticles[0].author;
  perAuthorWordLengthArray = authorsWithMatchingArticles.map(getWordLengths);
  perAuthorWordCountArray = authorsWithMatchingArticles.map(articlesWordCount);
  authorAverageWordLength = Math.round((perAuthorWordLengthArray.reduce(sum))/(perAuthorWordCountArray));
  stats.authorWordsPerArticle.push(authorStatsMaker(author, authorAverageWordLength) );
  console.log(stats.authorWordsPerArticle);
  $('#authorWordLengths').append(stats.authorWordsPerArticle);

});

// //h for autHor
// function wordCountPerAuthor (h){
//    uniqueAuthorArray.forEach(function (){
//
//       return
//
// var workByAuthor = localContent.filter(makeSearchFilter("author", uniqueAuthorArray));
// console.log(workByAuthor);
//
// });
// };

//!!!!!!!!!!!!!!!!!!!!!!!END WORK ZONE!!!!!!!!!!!!!

  return stats;
};





// function sum (thingToBeCounted){
//   var total = 0;
//   thingToBeCounted.forEach (function (number){
//     total += number;
//   });
//   return total;
// }



getStats(localContent);

});//ends getJSON Callback
