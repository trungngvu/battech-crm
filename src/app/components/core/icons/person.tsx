import { ComponentPropsWithRef } from 'react';

type PersonIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const PersonIcon = ({ size, color, ...props }: PersonIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8C8 5.79 9.79 4 12 4C14.21 4 16 5.79 16 8ZM4 18C4 15.34 9.33 14 12 14C14.67 14 20 15.34 20 18V20H4V18Z"
      fill={color}
    />
  </svg>
);

export default PersonIcon;
