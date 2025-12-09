import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import type { Book } from "../types/book";
import { getBooks, createBook, updateBook, deleteBook } from "../services/api";
import AddForm from "../components/AddForm";
import BookItems from "../components/BooksList";

function Books() {
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
                            className="w-full px-5 py-4 pl-12 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-sm"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                </div>

                <BookItems
                    books={filteredBooks}
                    expandedId={expandedId}
                    onToggleExpand={toggleExpand}
                    onDelete={handleDelete}
                    onEdit={(book) => {
                        setEditingBook(book);
                        setShowAddModal(true);
                    }}
                />
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

export default Books;