var moviesDb = {
  movies: [ { title: "avengers", actors: ["ak", "sj", "gp"] }, { title: "ironman", actors: [ "ak", "pg"]} ],
  movies_acted_in: function(actor_name) {
    for( var i =0 ; i < this.movies.length; i++) {
      if(this.movies[i].actors.indexOf(actor_name) != -1)
        console.log(this.movies[i].title);
    }
}
};
