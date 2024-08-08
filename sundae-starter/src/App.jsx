import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './context/OrderDetails';

function App() {
  return (
    <div>
      <OrderDetailsProvider>
        <OrderEntry></OrderEntry>
      </OrderDetailsProvider>
    </div>
  );
}

export default App;
