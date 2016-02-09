var moviesDb = { };
moviesDb.xmen = {
  title: "Xmen",
  actors: ["ak", "sj", "pg", "ng"]
};
moviesDb.avengers = {
  title: "Avengers",
  actors: ["sj", "pg"]
}

var movies_acted_in = function(actor_name) {
  for( movie in moviesDb) {
    if(moviesDb[movie].actors.indexOf(actor_name) != -1)
      console.log(moviesDb[movie].title);
  }
}
