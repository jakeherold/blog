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














function makeAuthorArray(nameOfAuthor){
  var authArray = {};
  authArray.author = nameOfAuthor.author;
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


// var bodyValue            = $(localContent.body).text();
// var characterCount = $(localContent.text).length;
// console.log(characterCount);
// var avgLettersPerWord = ((characterCount) /(bodyValue));
// console.log(avgLettersPerWord);
// var caniHazMarkDown = $.grep(localContent, function(my) {
//    return my.markdown;
//  });
//
//  $.each(caniHazMarkDown, function(key, value) {
//    bodyValue += $(marked(value.markdown)).text();
//  });
//  var wordCount = bodyValue.split(/\s+/).length;
// console.log(wordCount);

//$wordCount.append(" " + wordCount + 'words written');


















function getStats (rawBrowserData){
  var stats = stats || {};
  console.log("JAKE! OVER HREE" + rawBrowserData);
  var rawArticles = rawBrowserData;
  console.log("These are the raw articles" + rawArticles);
  var articlesContainingHtmlStill;
  var articlesWordCount;
  var wordLengthsTotal;
  // var bodyValue            = $(blogData.body).text();

  var arrayOfAuthors = rawArticles.map(makeAuthorArray)
  //var uniqueAuthorNames = getUnique(arrayOfAuthors); //redundant

  stats.numberArticles = rawArticles.length;
  console.log("number of articles is: "+stats.numberArticles);

  stats.numberAuthors = $.unique(arrayOfAuthors.map(function(A) { return A.author; })).length;
  console.log("Number of unique authors is: "+stats.numberAuthors);

  // articlesContainingHtmlStill = rawArticles.map(convertToMarkdown);

  articlesWordCount = articlesContainingHtmlStill.map(articlesWordCount);
  stats.wordLengthsTotal = articlesWordCount.reduce(sum);
  wordLengthsTotal = articlesContainingHtmlStill.map(wordLengthsTotal);
  stats.wordLengthAverage = Math.round(wordLengthsTotal.reduce(sum)/(wordLengthsTotal.length));
  return stats;
};


//works in console: saving for postarity



//var numberOfUniqueAuthors = $.unique(arrayOfAuthors.map(function(A) { return A.author; })).length






// var arrayOfAuthors = localContent.map(makeAuthorArray);






function totalLengthOfWordsInArticle (){

}
function averageWordLength(){

}
// var arrayWithWordCount = localContent.map(wordCount());
// console.log(arrayWithWordCount);


function sum (thingToBeCounted){
  var total = 0;
  forEach (thingToBeCounted, function (thingToBeCounted){
    total += thingToBeCounted;
  })
  return total;
}

// var myCoolString = qq[0].body//(wordCount);
// arrayOfAwesomeWords = myCoolString.split(/\s+/);
// console.log(arrayOfAwesomeWords);
//
// console.log(arrayOfAwesomeWords.length);





getStats(localContent);

// var localContent = JSON.parse(localStorage.getItem('localArticleData'));
// console.log(localContent);
});//ends getJSON Callback
