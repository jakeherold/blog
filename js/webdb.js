var webDB = {};
webDB.sqlResult = null;

webDB.verbose = function (verbose) {
  var msg;
  if (verbose) {
    html5sql.logInfo = true;
    html5sql.logErrors = true;
    html5sql.putSelectResultsInArray = true;
    msg = 'html5sql verbosity on';
  } else {
    html5sql.logInfo = false;
    html5sql.logErrors = false;
    html5sql.putSelectResultsInArray = false;
    msg = 'html5sql verbosity off';
  }
  console.log(msg);
};

webDB.init = function() {
  // Open and init DB
  try {
    if (openDatabase) {
      webDB.verbose(true);
      webDB.connect('blogDB', 'Blog Database', 5*1024*1024);
      webDB.setupTables();
    } else {
      console.log('Web Databases not supported.');
    }
  } catch (e) {
    console.error('Error occured during DB init. Web Database may not be supported.');
  }
};

webDB.connect = function (database, title, size) {
  html5sql.openDatabase(database, title, size);
};

webDB.setupTables = function () {
  html5sql.process(
    'CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY, title VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, authorUrl VARCHAR (255), category VARCHAR(20), publishedOn DATETIME, body TEXT NOT NULL);',
    function() {
      // on success
      console.log('Success setting up tables.');
    }
  );
};

webDB.importArticlesFrom = function (path) {
  $.getJSON(path, webDB.insertAllRecords);
};

webDB.insertAllRecords = function(articles){
  articles.forEach(webDB.insertRecord);
};

webDB.insertRecord = function (a) {
  // insert article record into database
  html5sql.process(
    [
      {
        'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, body) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [a.title, a.author, a.authorUrl, a.category, a.publishedOn, a.body],
      }
    ],
    function () {
      // console.log('Success inserting record for ' + a.title);
    }
  );
};

webDB.execute = function (sql, callback) {
  callback = callback || function() {};
  html5sql.process(
    sql,
    function (tx, result, resultArray) {
      callback(resultArray);
    }
  );
};

webDB.getAllArticles = function (callback) {
  console.log("get all articles running");
  callback = callback || function() {};
  html5sql.process(
    // 'SELECT * FROM articles;',
    'SELECT * FROM articles LIMIT 40',
    function (tx, result, resultArray) {
      console.log("inside GETALLARTICLES function");
      callback(resultArray);
    }
  );
};

webDB.getUniqueAuthors = function(callback){
  html5sql.process(
    // 'SELECT DISTINCT author FROM articles ORDER BY author;',
    'SELECT DISTINCT author FROM articles ORDER BY author LIMIT 40;',

    function (tx, results, resultArray){
      callback(resultArray);
    }
  );
};




webDB.getUniqueCategories = function(callback){
  html5sql.process(
    // 'SELECT DISTINCT category FROM articles ORDER BY category;',
    'SELECT DISTINCT category FROM articles ORDER BY category LIMIT 20;',

    function (tx, results, resultArray){
      callback(resultArray);
    }
  );
};
