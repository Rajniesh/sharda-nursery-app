import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes";
import Layout from "./components/Layout";
import { CartProvider } from "./contexts/CartContext";
function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
