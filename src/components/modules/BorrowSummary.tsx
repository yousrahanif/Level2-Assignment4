import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowedBooksQuery } from "@/redux/api/baseApi";

export default function BorrowSummary() {
  const { data, isLoading, error } = useGetBorrowedBooksQuery({});

  if (isLoading) return <p className="text-center">Loading summary...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load summary</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Borrowed Books Summary</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total Borrowed</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.data?.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{item.book.title}</TableCell>
              <TableCell>{item.book.isbn}</TableCell>
              <TableCell>{item.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
