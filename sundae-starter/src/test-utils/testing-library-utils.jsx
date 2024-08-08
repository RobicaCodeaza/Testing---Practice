import { render } from '@testing-library/react';
import { OrderDetailsProvider } from '../context/OrderDetails';

// eslint-disable-next-line react-refresh/only-export-components
const AllTheProviders = ({ children }) => {
  return <OrderDetailsProvider>{children}</OrderDetailsProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';

// override render method
export { customRender as render };
