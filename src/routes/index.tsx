import App from "@/App";
import Banner from "@/components/layout/Banner";
import { Books } from "@/pages/Books";

import Borrow from "@/pages/Borrow";


import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        index: true,
        element: <Banner/>
      },
      {
        path: "books",
        Component: Books,
      },
      {
        path: "borrow",
        Component: Borrow
      },
    ],
  },
]);
export default router;