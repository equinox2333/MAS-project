import { Button as UIButton } from '@ui-kitten/components';
import type { ButtonProps as UIButtonProps } from '@ui-kitten/components';
import Loading from '@/components/Loading';

export interface ButtonProps extends UIButtonProps {
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const { loading, children, disabled, ...restProps } = props;

  return (
    <UIButton
      accessoryLeft={loading ? <Loading /> : undefined}
      disabled={disabled || loading}
      {...restProps}
    >
      {children}
    </UIButton>
  );
};

export default Button;
