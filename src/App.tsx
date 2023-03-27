import { RouterProvider } from 'react-router-dom';
import router from '@/router';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function App() {
  return <RouterProvider router={router} />;
}
