import IndexChat from '../IndexChat';
import { id, user } from './data';
import Iframe from './iframe';

const RouterExample = () => {
  return (
    <>
      <Iframe src="https://reactrouter.com/en/main" />
      <IndexChat id={id} style={{ darkMode: true }} user={user} />
    </>
  );
};

export default RouterExample;
