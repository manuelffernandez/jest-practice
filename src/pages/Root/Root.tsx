import { Header } from '@/components';
import { Outlet } from 'react-router-dom';

const Root = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Root;
