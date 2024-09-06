/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import useAuth from '../hooks/useAuth';
import AmitySocialUIKitV4Navigator from '../v4/ila-26/routes/AmitySocialUIKitV4Navigator';
import AmitySocialHomePage from '../v4/ila-26/PublicApi/pages/AmitySocialHomePage/AmitySocialHomePage';

export interface SocialNavigatorProps  {
  AppsTab ?: React.ReactNode
}

export default function SocialNavigator({ AppsTab} :SocialNavigatorProps) {
  const { isConnected } = useAuth();

  const Stable = React.useCallback(() => <AmitySocialHomePage AppsTab={AppsTab} /> , [AppsTab])

  return <>{isConnected && <AmitySocialUIKitV4Navigator AppsTab={Stable} />}</>;
}