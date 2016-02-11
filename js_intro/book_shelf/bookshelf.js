var BookShelf = {
  books: [ { id:1, name: "aaaa", isRead: false}, { id:2, name:'bbbb', isRead: false}, { id:3, name: "ccc", isRead: true}]
};
function print_unread_books() {
    for( var i=0; i< BookShelf.books.length;i++) {
      if(!BookShelf.books[i].isRead)
        console.log(BookShelf.books[i].name);
    }
};
function print_read_books() {
    for( var i=0; i< BookShelf.books.length;i++) {
      if(BookShelf.books[i].isRead)
        console.log(BookShelf.books[i].name);
    }
};

function mark_book_read(book_id) {
  for( var i=0; i< BookShelf.books.length;i++) {
      if(BookShelf.books[i].id === book_id)
        BookShelf.books[i].isRead = true;
    }
};



