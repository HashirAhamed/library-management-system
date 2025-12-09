import type {Book} from '../types/book';
import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL;

export async function getBooks(): Promise<Book[]> {
    const response = await axios.get<Book[]>(`${url}/Book`);
    console.log(response.data);
    return response.data;
}

export async function getBookById(id: number): Promise<Book> {
    const response = await axios.get<Book>(`${url}/Book/${id}`);
    return response.data;
}

export async function createBook(book: Omit<Book, 'id'>): Promise<Book> {
    const response = await axios.post<Book>(`${url}/Book`, book);
    return response.data;
}

export async function updateBook(id: number, updatedBook:Book): Promise<Book> {
    await axios.put<Book>(`${url}/Book/${id}`, updatedBook);
    return updatedBook;
}

export async function deleteBook(id: number): Promise<void> {
    const response= await axios.delete<void>(`${url}/Book/${id}`);
    return response.data;
}

