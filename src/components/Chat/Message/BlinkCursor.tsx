import cx from 'classnames';
import styles from './index.module.css';

const BlinkCursor = () => {
  return (
    <span
      className={cx(
        styles.blinkingCursor,
        'dark:bg-white bg-gray-300 text-transparent'
      )}
    >
      .
    </span>
  );
};

export default BlinkCursor;
