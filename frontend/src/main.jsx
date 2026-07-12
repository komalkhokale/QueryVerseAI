import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import "../src/app/index.css";
import App from "./app/App.jsx";
import { store } from "./app/app.store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#18181B",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "14px 16px",
          },
          success: {
            iconTheme: {
              primary: "#8B5CF6",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </Provider>
  </StrictMode>,
);
