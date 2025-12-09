import { ChevronDown, BookOpen } from "lucide-react";
import type { Book } from "../types/book";

interface BookItemsProps {
    books: Book[];
    expandedId: number | null;
    onToggleExpand: (id: number) => void;
    onEdit: (book: Book) => void;
    onDelete: (id: number) => void;
}

function BookItems({ books, expandedId, onToggleExpand, onEdit, onDelete }: BookItemsProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            {books.map((book) => (
                <div key={book.id} className="border-b last:border-b-0 border-slate-100 transition-all hover:bg-slate-50">
                    <div
                        className="flex items-center justify-between p-5 cursor-pointer group"
                        onClick={() => onToggleExpand(book.id)}
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
                                    e.stopPropagation();
                                    onEdit(book);
                                }}
                                className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Edit
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(book.id);
                                }}
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
                            <div className="flex justify-between items-start ml-14 mr-14">

                                <div className="space-y-3 text-sm pr-8">
                                    <div className="flex">
                                        <span className="font-semibold text-slate-700 w-24">Author:</span>
                                        <span className="text-slate-600">{book.author}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="font-semibold text-slate-700 w-24">Description:</span>
                                        <span className="text-slate-600">{book.description}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center bg-white px-2 py-1">
                                    <span className="font-semibold text-sm text-slate-700">
                                        Units
                                    </span>
                                    <span className=" text-slate-800">
                                        {book.units}
                                    </span>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            ))}

            {books.length === 0 && (
                <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-medium">No books found</p>
                    <p className="text-slate-500 text-sm mt-1">Try adjusting your search or add a new book</p>
                </div>
            )}
        </div>
    );
}

export default BookItems;