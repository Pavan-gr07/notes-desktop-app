import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css"

const root = document.getElementById("root");

if (!root) {
    document.body.innerHTML = "<h1>ROOT NOT FOUND</h1>";
    throw new Error("Root not found");
}

createRoot(root).render(<App />);
