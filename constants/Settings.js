const baseURL = 'http://192.168.1.37:8080/';

const AppSettings = {  
   BaseURL:  baseURL,
   BooksURL: `${baseURL}api/books`,
   GenresURL: `${baseURL}api/genres`,
   AuthorsURL: `${baseURL}api/authors`,
   PublisherURL: `${baseURL}api/publishers`
}

export { AppSettings }