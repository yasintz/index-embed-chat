import IndexChat from '../IndexChat';
import { id, user } from './data';
import Iframe from './iframe';

const RouterExample = () => {
  return (
    <>
      <Iframe src="https://example.com" />
      <IndexChat id={id} style={{ darkMode: false }} user={user} />
    </>
  );
};

export default RouterExample;
