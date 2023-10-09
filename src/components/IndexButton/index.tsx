import cx from 'classnames';
import IndexIcon from './icon';
import styles from './button.module.css';

type IndexButtonProps = {
  onClick: () => void;
};

const IndexButton = ({ onClick }: IndexButtonProps) => {
  return (
    <div
      className={cx(
        'fixed bottom-4 right-4 bg-white w-12 h-12 flex items-center justify-center rounded-full cursor-pointer select-none',
        styles.button
      )}
      onClick={onClick}
    >
      <IndexIcon />
    </div>
  );
};

export default IndexButton;
