import { ComponentPropsWithRef } from 'react';

type VisibilityIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const VisibilityIcon = ({ size, color, ...props }: VisibilityIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9957 9.6803C10.7668 9.6803 9.78479 10.6639 9.78479 11.8706C9.78479 12.491 9.95324 12.9383 10.4332 13.4177C10.8159 13.8 11.3605 13.9647 11.9826 13.9289C12.6132 13.8926 13.2343 13.6512 13.6476 13.3401C13.8342 13.1996 14.0526 12.9486 14.2233 12.6434C14.3969 12.3328 14.473 12.0529 14.473 11.8705C14.473 11.5762 14.3103 11.2205 14.0563 10.8753C13.9384 10.7151 13.8191 10.5818 13.7295 10.489C13.6851 10.4431 13.6492 10.4083 13.6259 10.3864C13.6144 10.3755 13.606 10.3679 13.6015 10.3638L13.598 10.3606L13.5987 10.3613L13.5993 10.3618L13.5996 10.362C13.5989 10.3615 13.5983 10.3609 13.5977 10.3604C13.5848 10.349 13.5721 10.3372 13.5599 10.3251C13.1567 9.92463 12.6086 9.6803 11.9957 9.6803ZM14.7398 9.10401L14.741 9.10507C14.7535 9.11639 14.7701 9.13169 14.7904 9.15076C14.8308 9.18883 14.8858 9.24226 14.9505 9.30926C15.0791 9.44232 15.2507 9.63373 15.4238 9.86904C15.7517 10.3147 16.1709 11.0329 16.1709 11.8705C16.1709 12.44 15.964 13.0091 15.7052 13.4719C15.4435 13.9401 15.0799 14.3871 14.6687 14.6966C13.982 15.2135 13.0381 15.5689 12.0801 15.624C11.1135 15.6796 10.0456 15.4303 9.23336 14.619C8.42701 13.8136 8.08691 12.931 8.08691 11.8706C8.08691 9.71539 9.83997 7.98242 11.9957 7.98242C13.0668 7.98242 14.0332 8.41048 14.7398 9.10401Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.49551 9.2125C5.56827 5.97635 8.62216 4 11.9965 4C13.9675 4 15.8526 4.68219 17.4799 5.90136C17.4896 5.90862 17.4991 5.91608 17.5085 5.92375C17.9272 6.26634 18.5686 6.85711 19.1695 7.54512C19.7561 8.21664 20.3748 9.06006 20.6559 9.90334C20.683 9.98461 20.7133 10.0713 20.7454 10.1632C21.0159 10.9377 21.4143 12.0782 21.1012 13.4083C20.7464 14.9161 19.5482 16.4871 16.9254 18.2356C16.8961 18.2551 16.8657 18.2728 16.8342 18.2886C14.911 19.2502 12.4395 19.2904 10.4192 19.004C9.39386 18.8587 8.44186 18.6233 7.67683 18.3509C7.29473 18.2148 6.94651 18.065 6.65353 17.9053C6.39812 17.7662 6.1335 17.5924 5.93175 17.3765C5.02587 16.5948 4.20084 15.6349 3.49548 14.5352C3.00216 13.7673 2.78418 12.7949 2.78418 11.8739C2.78418 10.9529 3.00217 9.98049 3.49551 9.2125ZM11.9965 5.69788C9.33672 5.69788 6.76676 7.25287 4.92494 10.1287L4.92423 10.1299C4.64858 10.5588 4.48206 11.1906 4.48206 11.8739C4.48206 12.5572 4.64858 13.189 4.92423 13.6179L4.92462 13.6185C5.55851 14.6068 6.29113 15.4506 7.0777 16.1225C7.11203 16.1518 7.14396 16.1839 7.17319 16.2182C7.17299 16.218 7.17302 16.218 7.1733 16.2183C7.17564 16.2208 7.19521 16.2412 7.24371 16.2768C7.2959 16.315 7.36895 16.3616 7.46587 16.4144C7.66056 16.5205 7.92286 16.6362 8.24641 16.7514C8.89267 16.9815 9.73245 17.1918 10.6575 17.3229C12.5187 17.5868 14.5596 17.5079 16.0289 16.7926C18.4641 15.1602 19.2386 13.9114 19.4485 13.0193C19.6424 12.1955 19.4132 11.5226 19.1396 10.7194C19.1085 10.6282 19.0768 10.5353 19.0452 10.4403C18.8735 9.92523 18.4381 9.28866 17.8907 8.66201C17.3648 8.05984 16.8008 7.54003 16.4473 7.24925C15.0868 6.2343 13.5583 5.69788 11.9965 5.69788Z"
      fill={color}
    />
  </svg>
);

export default VisibilityIcon;
