import { AppSettings } from "../constants/Settings";

async function getBookByGenreId (genreId) {
   let response = await fetch(`${AppSettings.BaseURL}/genre/${genreId}`);
   let data = await response.json();

   return data;
}

export async function getBookListByGenreId (genreId) {
   let response = await fetch(`${AppSettings.BaseURL}/list/genre/${genreId}`);
   let data = await response.json();

   return data;
}

export async function getAllBooks() {
   let response = await fetch(`${AppSettings.BaseURL}`);
   let data = await response.json();

   return data;
}

export async function getAllGenres() {
   let response = await fetch(`${AppSettings.BaseURL}/genres`)
   let data = await response.json();

   return data;
}

export async function getImagesByBookId(bookId) {
   let response = await fetch(`${AppSettings.BaseURL}/images/${bookId}`);
   let data = await response.json();

   return data;
}

export async function getOpenLibraryBookDetails(isbn) {
   let response = await fetch(`${AppSettings.BaseURL}/openlibrary/${isbn}`);
   let data = await response.json();

   return data;
}