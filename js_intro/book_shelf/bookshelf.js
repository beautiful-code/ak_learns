"use strict";
var BookShelf = {
  books: [ { id:1, name: "aaaa", isRead: false}, { id:2, name:'bbbb', isRead: false}, { id:3, name: "ccc", isRead: true}],
  print_unread_books :function() {
    for( var i=0; i< BookShelf.books.length;i++) {
      if(!BookShelf.books[i].isRead)
        console.log(BookShelf.books[i].name);
    }
  },
  print_read_books : function() {
    for( var i=0; i< BookShelf.books.length;i++) {
      if(BookShelf.books[i].isRead)
        console.log(BookShelf.books[i].name);
    }
  },

  mark_book_read : function(book_id) {
    for( var i=0; i< BookShelf.books.length;i++) {
      if(BookShelf.books[i].id === book_id)
        BookShelf.books[i].isRead = true;
    }
  }
};




