import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SelectYearProvider } from "./context/SelectYearContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <SelectYearProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </SelectYearProvider>
  </AuthContextProvider>
);
