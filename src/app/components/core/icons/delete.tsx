import { ComponentPropsWithRef } from 'react';

type DeleteIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const DeleteIcon = ({ size, color, ...props }: DeleteIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.5 4H19V6H5V4H8.5L9.5 3H14.5L15.5 4ZM8 21C6.9 21 6 20.1 6 19V7H18V19C18 20.1 17.1 21 16 21H8Z"
      fill={color}
    />
  </svg>
);

export default DeleteIcon;