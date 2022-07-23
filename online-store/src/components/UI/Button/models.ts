type ButtonType = 'button' | 'submit';

export type ButtonProps = {
  type: ButtonType;
  text: string;
  onClick: () => void;
  iconName?: string;
  iconPosition?: 'left' | 'right';
};
