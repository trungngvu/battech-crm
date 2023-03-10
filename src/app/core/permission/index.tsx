import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { ROUTES_CONFIG, SETTINGS_CONFIG } from '@configs';
import history from '@history';
import { selectUserPermissions, selectUserRoles, useAppSelector } from '@store';
import checkPermission from '@utils/check-permission';

type PermissionProps = {
  children: ReactNode;
};

const { SIGN_IN_REDIRECT_URL, PERMISSION_REDIRECT_URL } = SETTINGS_CONFIG;

const Permission = ({ children }: PermissionProps): JSX.Element => {
  const [access, setAccess] = useState(true);
  const signInRedirectUrl = useRef<string | null>(null);

  const userRoles = useAppSelector(selectUserRoles);
  const userPermissions = useAppSelector(selectUserPermissions);
  const location = useLocation();

  const redirectRoute = useCallback(() => {
    const redirectUrl = signInRedirectUrl.current || SIGN_IN_REDIRECT_URL;

    /**
     * User is guest
     * Redirect to default url redirect or previous page
     */

    if (userRoles.length === 0) {
      setTimeout(() => {
        history.push(PERMISSION_REDIRECT_URL);
      }, 0);

      signInRedirectUrl.current = location.pathname;
    } else {
      /**
       * User is member
       * Redirect to default url redirect after sign in
       */
      setTimeout(() => {
        history.push(redirectUrl);
      }, 0);

      signInRedirectUrl.current = SIGN_IN_REDIRECT_URL;
    }
  }, [userRoles, location.pathname]);

  /**
   * Check user access permission to current page
   */
  useDeepCompareEffect(() => {
    const [matchedRoute] = matchRoutes(ROUTES_CONFIG, location) || [];

    const matchedRouteConfig = ROUTES_CONFIG.find(item => item.path === matchedRoute.pathname);

    setAccess(
      matchedRoute && matchedRouteConfig
        ? checkPermission({
            auth: matchedRoute.route.auth,
            roles: userRoles,
            permissions: userPermissions,
            name: matchedRouteConfig.name,
          })
        : true
    );
  }, [location, userRoles]);

  /**
   * Redirect route if user don't have access permission to current page
   */
  useEffect(() => {
    if (!access) {
      redirectRoute();
    }
  }, [access]);

  if (access) {
    return <>{children}</>;
  }

  return <></>;
};

export default Permission;
