import Header from "./component/Header";
import Meals from "./component/Meals";
import { CartProvider } from "../src/store/CartContext";
import Cart from "./component/Cart";
import { UserContextProvider } from "./store/UserContext";
import Checkout from "./component/Checkout";

function App() {
  return (
    <UserContextProvider>
      <CartProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartProvider>
    </UserContextProvider>
  );
}

export default App;
