import { useEffect, useState } from "react";
import { Search, ChevronDown, BookOpen, Plus } from "lucide-react";
import type { Book } from "../types/book";
import { getBooks, createBook, updateBook, deleteBook } from "../services/api";
import AddForm from "../components/AddForm";

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (error) {
                console.error("Failed to fetch books", error);
            }
        }
        fetchBooks();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this book?")) return;

        try {
            await deleteBook(id);
            setBooks(books.filter(book => book.id !== id));
            console.log("Book deleted successfully");
        } catch (error) {
            console.error("Failed to delete book", error);
        }
    };

    const handleUpdate = async (updatedBook: Book) => {
        try {
            const book = await updateBook(updatedBook.id, updatedBook);
            setBooks(books.map(b => b.id === updatedBook.id ? book : b));
            console.log("Book updated successfully");
            setExpandedId(null);
        }
        catch (error) {
            console.error("Failed to update book", error);
        }
    };

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const [searchTerm, setSearchTerm] = useState("");

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="font-bold text-4xl text-slate-800 mb-1">Book Management</h1>
                            <p className="text-slate-600">Manage your library collection</p>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add Book
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-5 py-4 pl-12 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                    {filteredBooks.map((book, index) => (
                        <div key={book.id} className="border-b last:border-b-0 border-slate-100 transition-all hover:bg-slate-50">
                            <div
                                className="flex items-center justify-between p-5 cursor-pointer group"
                                onClick={() => toggleExpand(book.id)}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-10 h-10 bg-slate-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
                                        {book.title.charAt(0).toUpperCase()}
                                    </div>
                                    <h2 className="font-semibold text-lg text-slate-800 group-hover:text-blue-800">{book.title}</h2>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={(e) => {
                                            setEditingBook(book);
                                            setShowAddModal(true);
                                        }}
                                        className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <div className={`ml-2 transition-transform duration-200 ${expandedId === book.id ? 'rotate-180' : ''}`}>
                                        <ChevronDown className="w-5 h-5 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            {expandedId === book.id && (
                                <div className="px-5 pb-5 pt-2 bg-slate-50 border-t border-slate-100">
                                    <div className="space-y-3 text-sm ml-14">
                                        <div className="flex">
                                            <span className="font-semibold text-slate-700 w-24">Author:</span>
                                            <span className="text-slate-600">{book.author}</span>
                                        </div>
                                        <div className="flex">
                                            <span className="font-semibold text-slate-700 w-24">Description:</span>
                                            <span className="text-slate-600">{book.description}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {filteredBooks.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-slate-600 font-medium">No books found</p>
                            <p className="text-slate-500 text-sm mt-1">Try adjusting your search or add a new book</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add/update Book Modal */}
            {showAddModal && (
                <AddForm
                    isOpen={showAddModal}
                    onClose={() => {
                        setShowAddModal(false);
                        setEditingBook(null);
                    }}
                    initialBook={editingBook}
                    onSubmit={async (book) => {
                        try {
                            if ("id" in book) {
                                await handleUpdate(book as Book);
                            } else {
                                const newBook = await createBook(book);
                                setBooks(prev => [...prev, newBook]);
                            }
                        } catch (err) {
                            console.error(err);
                        }
                    }}
                />

            )}
        </main>
    );
}

export default BookList;