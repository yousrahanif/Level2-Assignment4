import { useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCartPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseAPI";
import { setSelectedBook } from "@/redux/features/bookSlice";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/app/store";
import EditBook from "./EditBook";
import Swal from "sweetalert2";
import { setBorrowBook } from "@/redux/features/borrowSlice";
import BorrowModal from "./BorrowModal";


export default function AllBooks() {
  const dispatch = useDispatch();
  const [deleteBook] = useDeleteBookMutation();

  const { data, isLoading, error } = useGetBooksQuery();
  const selectedBook = useSelector((state: RootState) => state.book.selectedBook);
const borrowBookData = useSelector((state: RootState) => state.borrow.selectedBook);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to fetch books</p>;

  return (
    <div>
{selectedBook && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
      <EditBook />
    </div>
  </div>
)}    
{borrowBookData && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <BorrowModal book={borrowBookData} />
  </div>
)}

  <h2 className="text-center text-xl font-semibold mb-4">All Books</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.data?.map((book: any) => (
            <TableRow key={book._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>{book.available ? "Available" : "Unavailable"}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                 <Button
  size="sm"
  variant="ghost"
  disabled={book.copies < 1}
  onClick={() => dispatch(setBorrowBook(book))}
>
  <FaCartPlus />
</Button>
                 <Button
  size="sm"
  variant="outline"
  onClick={() => {
    console.log("Setting selected book:", book);
    dispatch(setSelectedBook(book));
  }}
>
  <FaEdit />
</Button>
                  <Button
  size="sm"
  variant="outline"
  onClick={() => {
    Swal.fire({
      title: `Delete "${book.title}"?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBook({ id: book._id });
          Swal.fire("Deleted!", "The book has been removed.", "success");
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  }}
>
  <FaTrash />
</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      
    </div>
  );
}