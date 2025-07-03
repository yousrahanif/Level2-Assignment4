// components/BorrowModal.tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Swal from "sweetalert2";
import { clearBorrowBook } from "@/redux/features/borrowSlice";

interface BorrowModalProps {
  book: any;
}

export default function BorrowModal({ book }: BorrowModalProps) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const handleBorrow = async () => {
    if (quantity < 1 || quantity > book.copies) {
      Swal.fire("Error", `Please enter a quantity between 1 and ${book.copies}`, "error");
      return;
    }

    if (!dueDate) {
      Swal.fire("Error", "Please select a due date", "error");
      return;
    }

    try {
      await borrowBook({
        book: book._id,
        quantity,
        dueDate,
      }).unwrap();

      Swal.fire("Success", "Book borrowed successfully", "success");
      dispatch(clearBorrowBook());
    } catch (error) {
      Swal.fire("Error", "Failed to borrow book", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm space-y-4 shadow-xl">
        <h2 className="text-lg font-semibold text-center">
          Borrow: {book.title}
        </h2>

        <Input
          type="number"
          min={1}
          max={book.copies}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder={`Max ${book.copies} copies`}
          required
        />

        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <div className="flex gap-2 justify-end">
          <Button onClick={handleBorrow} disabled={isLoading}>
            {isLoading ? "Borrowing..." : "Confirm"}
          </Button>
          <Button variant="outline" onClick={() => dispatch(clearBorrowBook())}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
