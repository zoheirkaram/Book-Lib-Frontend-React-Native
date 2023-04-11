import { AppSettings } from "../constants/Settings";
import * as API from "./APIService";

export async function getBookListByGenreId (genreId) {
   return API.get(`${AppSettings.BooksURL}/list/genre/${genreId}`);
}

export async function getAllGenres() {
   return API.get(`${AppSettings.GenresURL}`);
}

export async function AddGenre(genre) {
   return API.put(`${AppSettings.GenresURL}`, genre);
}

export async function AddBook(book) {
   return API.put(`${AppSettings.BooksURL}`, book);
}

export async function getAllAuthors() {
   return API.get(`${AppSettings.AuthorsURL}`);
}

export async function AddAuthor(author) {
   return API.put(`${AppSettings.AuthorsURL}`, author);
}

export async function AddPublisher(publisher) {
   return API.put(`${AppSettings.PublisherURL}`, publisher);
}

export async function getAllPublishers() {
   return API.get(`${AppSettings.PublisherURL}`);
}

export async function getImagesByBookId(bookId) {
   return API.get(`${AppSettings.BaseURL}/images/${bookId}`);
}

export async function getOpenLibraryBookDetails(isbn) {
   return API.get(`${AppSettings.BooksURL}/openlibrary/${isbn}`);
}

export async function getBookListBySearchTerm(searchTerm){
   return API.get(`${AppSettings.BooksURL}/search/${searchTerm}`);
}