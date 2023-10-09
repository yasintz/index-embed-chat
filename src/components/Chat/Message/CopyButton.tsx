import { useEffect, useState } from 'react';
import { Copy, Check } from 'react-feather';

type CopyButtonProps = {
  text: string;
};

const CopyButton = ({ text }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [isCopied]);

  const className = 'stroke-gray-500 min-w-[20px] min-h-[20px] cursor-pointer';

  if (isCopied) {
    return <Check size={20} className={className} />;
  }

  return (
    <Copy
      size={20}
      className={className}
      onClick={() => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
      }}
    />
  );
};

export default CopyButton;
