import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";
import Introduce from "../pages/introduce";
import Course from "../pages/course";
import Cart from "../pages/cart";
import Blog from "../pages/blog";
import CheckoutPage from "../pages/checkout";
import PurchaseHistoryContent from "../pages/purchase";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/introduce",
        element: <Introduce />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/course",
        element: <Course />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/history-order",
        element: <PurchaseHistoryContent />,
      },
    ],
  },
]);
