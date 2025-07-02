import App from "@/App";
import Banner from "@/components/layout/Banner";
import AddBook from "@/pages/AddBook";
import { AllBooks } from "@/pages/Books";
import Borrow from "@/pages/Borrow";
import { Footer } from "@/components/layout/Footer";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        index: true,
        element: <Banner />,
      },
      {
        index: true,
        element: <Footer />,
      },
      {
        path: "all-books",
        Component: AllBooks,
      },
      {
        path: "borrow-summary",
        Component: Borrow,
      },
      {
        path: "add-book",
        Component: AddBook,
      },
    ],
  },
]);
export default router;
