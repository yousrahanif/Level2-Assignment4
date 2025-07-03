import { useState } from "react";
import { useCreateBookMutation } from "@/redux/api/baseAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; // optional for multiline
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("FICTION");
  const [isbn, setIsbn] = useState("");
  const [copies, setCopies] = useState(1);
  const [description, setDescription] = useState("");

  const [createBook, { isLoading }] = useCreateBookMutation();
const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const result = await createBook({
      title,
      author,
      genre,
      isbn,
      description,
      copies,
      available: true,
    }).unwrap();

    Swal.fire({
      title: "Book added successfully!",
      text: `"${result.data?.title}" by ${result.data?.author}`,
      icon: "success",
    }).then(() => {
      navigate("/allBooks"); 
    });

    setTitle("");
    setAuthor("");
    setGenre("FICTION");
    setIsbn("");
    setDescription("");
    setCopies(1);

  } catch (error: any) {
    Swal.fire({
      title: "Error!",
      text: error?.data?.message || "Something went wrong while adding the book.",
      icon: "error",
    });
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 p-4 border rounded-lg"
    >
      <h2 className="text-xl font-semibold text-center">Add Book</h2>

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

      <Select value={genre} onValueChange={setGenre}>
        <SelectTrigger>
          <SelectValue placeholder="Select genre" />
        </SelectTrigger>
        <SelectContent>
          {[
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
          ].map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Adding..." : "Add Book"}
      </Button>
    </form>
  );
}
