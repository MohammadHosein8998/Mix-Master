import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  About,
  Error,
  HomeLayout,
  Landing,
  Newsletter,
  SinglePageError,
  Cocktail,
} from "./pages";
import {  QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";
import { action as NewsletterAction } from "./pages/Newsletter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
const route = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <HomeLayout />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cocktail/:id",
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient),
        element: <Cocktail />,
      },
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader(queryClient),
      },
      {
        path: "Newsletter",
        element: <Newsletter />,
        action: NewsletterAction,
      },
      {
        path: "Error",
        element: <Error />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route} />
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
};
export default App;
