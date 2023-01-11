import { ComponentPropsWithRef } from 'react';

type SaveIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const SaveIcon = ({ size, color, ...props }: SaveIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM12 19C10.34 19 9 17.66 9 16C9 14.34 10.34 13 12 13C13.66 13 15 14.34 15 16C15 17.66 13.66 19 12 19ZM5 9H15V5H5V9Z"
      fill={color}
    />
  </svg>
);

export default SaveIcon;
