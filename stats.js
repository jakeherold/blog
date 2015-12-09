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

// function convertToMarkdown(a){
//   if (a.markdown){
//     a.body = marked(a.markdown);
//   }
//   return a;
// }


//var characterCount = $(localContent.text).length;
//var avgLettersPerWord = ((characterCount) /(bodyValue));
//
//THE MAIN BIT

function getStats (rawBrowserData){


  var stats = stats || {}; //sets object to be filled with keys
  var rawArticles = rawBrowserData;
  console.log(rawArticles);
  var bodyValue = $(localContent.body).text();

  var articlesContainingHtmlStill;
  var articlesWordCount;
  var wordLengthsTotal;
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
  stats.numberAuthors = $.unique(arrayOfAuthors.map(function(A) { return A.author; })).length;
  console.log("Number of unique authors is: "+stats.numberAuthors);
  $('#uniqueAuthors').append(stats.numberAuthors);


  // stats.wordLengthsTotal = articlesWordCount.reduce(sum);
  //
  // wordLengthsTotal = articlesContainingHtmlStill.map(wordLengthsTotal);

  // stats.wordLengthAverage = Math.round(wordLengthsTotal.reduce(sum)/(wordLengthsTotal.length));
  return stats;
};


function totalLengthOfWordsInArticle (){

}
function averageWordLength(){

}


function sum (thingToBeCounted){
  var total = 0;
  forEach (thingToBeCounted, function (thingToBeCounted){
    total += thingToBeCounted;
  })
  return total;
}



getStats(localContent);

});//ends getJSON Callback
