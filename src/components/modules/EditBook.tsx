
import { useUpdateBookMutation } from "@/redux/api/baseAPI";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { clearSelectedBook } from "@/redux/features/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/app/store";
import Swal from "sweetalert2";


export default function EditBook() {

  const dispatch = useDispatch();
  const selectedBook = useSelector((state: RootState) => state.book.selectedBook);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("FICTION");
  const [isbn, setIsbn] = useState("");
  const [copies, setCopies] = useState(1);
  const [description, setDescription] = useState("");

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  
useEffect(() => {
  if (selectedBook) {
    console.log("Selected genre:", selectedBook.genre); // 🔍
    setTitle(selectedBook.title);
    setAuthor(selectedBook.author);
    setGenre(selectedBook.genre.toUpperCase()); // still required
    setIsbn(selectedBook.isbn);
    setCopies(selectedBook.copies);
    setDescription(selectedBook.description);
  }
}, [selectedBook]);


  if (!selectedBook) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedData = {
        title,
        author,
        genre,
        isbn,
        copies,
        description,
        available: copies > 0,
      };

      await updateBook({ id: selectedBook._id, updatedData }).unwrap();

      Swal.fire({
        title: "Book updated successfully!",
        icon: "success",
      });

      dispatch(clearSelectedBook());
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Something went wrong while updating the book.",
        icon: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 p-4 border rounded-lg mt-4"
    >
      <h2 className="text-xl font-semibold text-center">Edit Book</h2>

      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
<select
  value={genre}
  onChange={(e) => setGenre(e.target.value)}
  className="w-full border rounded-md px-3 py-2 text-sm"
  required
>
  <option value="" disabled>Select genre</option>
  <option value="FICTION">FICTION</option>
  <option value="NON_FICTION">NON_FICTION</option>
  <option value="SCIENCE">SCIENCE</option>
  <option value="HISTORY">HISTORY</option>
  <option value="BIOGRAPHY">BIOGRAPHY</option>
  <option value="FANTASY">FANTASY</option>
</select>




      <Input
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Copies"
        value={copies}
        onChange={(e) => setCopies(Number(e.target.value))}
        required
      />
      <div className="flex flex-col">
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Updating..." : "Update Book"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => dispatch(clearSelectedBook())}
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}