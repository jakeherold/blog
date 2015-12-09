// var localContent = localStorage.getItem('localArticleData');
//
// function getArrayOfBodies (element, index, array){
//
//   return $.map();
// }
//
// bodies = localContent.forEach(getArrayOfBodies);

qq = [
    {"author": "Tolkien", "body": "THE RING!"},
    {"author": "LeGuin", "body": "EARTHSEA!" },
    {"author": "Rowling",  "body": "EXPECTO PATRONUS"},
    {"author": "Rowling",  "body": "A CASUAL VACANCY"},

];
//MAKE FILTER
//Goal: give author with articles associated. Articles have author, title, etc. Only
function getPotter(A){
  return A.author == "Rowling";  //Return info at index# only when true

}
// var searchResult = qq.filter(getPotter);
// console.log(searchResult);


function makeAuthorFilter(author){
  var AuthorToSearchFor = author;
  return function (A){
    return A.author == AuthorToSearchFor;

  }

}




//pass it ("author", "rowling")
function makeSearchFilter(keyType, value){
  var valueToSearchFor = value;
  return function (A){
    return A[keyType] == valueToSearchFor;


  }
}

// function wordCount(){
//
// }
// returns true if harry potter article
var searchResult = qq.filter(makeSearchFilter("body", "EARTHSEA!"));

console.log(foundPotter);

// var searchResuleWordCount = searchResult.map(wordCount);
