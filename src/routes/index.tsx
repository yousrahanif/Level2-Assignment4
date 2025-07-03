
import App from "@/App";
import AddBook from "@/components/modules/AddBook";
import AllBooks from "@/components/modules/AllBooks";
import BorrowSummary from "@/components/modules/BorrowSummary";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AllBooks />,
      },
      {
        path: "/allBooks",
        element: <AllBooks />,
      },
       {
    path: "/addBook",
    element: <AddBook />,
  },
  {
    path: "/borrowSummary",
    element: <BorrowSummary />,
  },
    ],
  },
 
]);
export default router;