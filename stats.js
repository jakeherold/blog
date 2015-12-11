 var localContentRaw = $.getJSON('blogArticles.json', function(localContentRaw)
 {



var localContent = convertMarkdown(localContentRaw);
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
//outputs interger
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

function convertMarkdown (arrayOfObj) {
  for (ii = 0; ii < arrayOfObj.length; ii++) {
    if (arrayOfObj[ii].markdown) {
      arrayOfObj[ii].body = marked(arrayOfObj[ii].markdown);
    }
  }
  return arrayOfObj;
};


//THE MAIN BIT


function getStats (rawBrowserData){

  var stats = stats || {}; //sets object to be filled with keys
  var rawArticles = rawBrowserData;
  console.log(rawArticles);
  var bodyValue = 0;
  console.log(bodyValue);

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
  console.log(wordArray);

//WORD COUNT
  var numWords = wordArray.length;
  console.log("total words on site is " +  numWords);
  $('#wordCount').append(numWords);

//ALL AUTHORS
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

//Unique and number OF AUTHORS
  var uniqueAuthorArray = $.unique(arrayOfAuthors.map(function(A) { return A.author; }));
  console.log(uniqueAuthorArray);
  stats.numberAuthors = uniqueAuthorArray.length;
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




  console.log(wordCountArrayPerAuthor);

  var wordCountPerAuthor = wordCountArrayPerAuthor.reduce(sum); //takes all numbers for each array and sums them
  var potato = new Author (authorPassingThrough , wordCountPerAuthor);
  return potato;
  console.log(wordCountPerAuthor);

  // authorsWithMatchingArticles.push(matchingArticles);
});
console.log(stats.authorWordsPerArticle);
// console.log(authorsWithMatchingArticles);






// authorsWithMatchingArticles.forEach(function(item){
//   var finishedAuthors = [];
//   var author = item[0].author;
//   perAuthorWordLengthArray = item.forEach(function(array){
//     array.map(wordCount);
//   });
//   perAuthorWordCountArray = item.map(articlesWordCount);
//
//   authorAverageWordLength = Math.round((perAuthorWordLengthArray.reduce(sum))/(perAuthorWordCountArray.length));
//
//   stats.authorWordsPerArticle.push(authorStatsMaker(author, authorAverageWordLength) );
//   console.log(stats.authorWordsPerArticle);
//   $('#authorWordLengths').append(stats.authorWordsPerArticle);
//
// });

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
