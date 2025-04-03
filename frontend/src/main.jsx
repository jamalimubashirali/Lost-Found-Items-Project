import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./store/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
