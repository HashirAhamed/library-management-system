import { useState, useEffect } from "react";
import type { Book } from "../types/book";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: Omit<Book, 'id'>) => void;
  initialBook?: Book | null;
}

export default function AddForm({
  onClose,
  onSubmit,
  initialBook
}: AddModalProps) {

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    units: 0,
  });

  useEffect(() => {
    if (initialBook) {
      setFormData({
        title: initialBook.title,
        author: initialBook.author,
        description: initialBook.description ?? "",
        units: initialBook.units,
      });
    } else {
      setFormData({ title: "", author: "", description: "", units: 0 });
    }
  }, [initialBook]);

  return (
    <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">
          {initialBook ? "Edit Book" : "Add New Book"}
        </h2>

        <form onSubmit={(e) => {
          e.preventDefault();

          if (initialBook) {
            // edit if initialBook exists
            onSubmit({
              ...initialBook,
              ...formData,
            });
          } else {
            // add if no initialBook
            onSubmit({
              ...formData,
            });
          }

          onClose();
        }}
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Author
              </label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Units
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.units}
                onChange={(e) =>
                  setFormData({ ...formData, units: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all"
            >
              {initialBook ? "Save Changes" : "Add Book"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
