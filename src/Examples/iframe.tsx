type IframeProps = {
  src: string;
};

const Iframe = (props: IframeProps) => {
  return (
    <iframe
      src={props.src}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default Iframe;
