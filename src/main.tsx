import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { SnackbarProvider } from "notistack"

import App from "./App.tsx"
import "./index.css"
import StoreProvider from "./context/store.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <StoreProvider>
        <App />
      </StoreProvider>
    </SnackbarProvider>
  </BrowserRouter>
)
