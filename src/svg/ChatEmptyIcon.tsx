import React from 'react';
import { Svg, Path } from 'react-native-svg';

export const ChatEmptyIcon = ({ color = '#A5A9B5' }: { color?: string }) => (
  <Svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <Path
      d="M45 10.2857H15C12.1875 10.2857 10 12.5513 10 15.2857V37.7857C10 40.5982 12.1875 42.7857 15 42.7857H22.5V49.3482C22.5 49.9732 22.8906 50.2857 23.4375 50.2857C23.5938 50.2857 23.75 50.2857 23.9844 50.1295L33.75 42.7857H45C47.7344 42.7857 50 40.5982 50 37.7857V15.2857C50 12.5513 47.7344 10.2857 45 10.2857ZM46.25 37.7857C46.25 38.4888 45.625 39.0357 45 39.0357H32.5L31.4844 39.817L26.25 43.7232V39.0357H15C14.2969 39.0357 13.75 38.4888 13.75 37.7857V15.2857C13.75 14.6607 14.2969 14.0357 15 14.0357H45C45.625 14.0357 46.25 14.6607 46.25 15.2857V37.7857ZM20 24.0357C18.5938 24.0357 17.5 25.2076 17.5 26.5357C17.5 27.942 18.5938 29.0357 20 29.0357C21.3281 29.0357 22.5 27.942 22.5 26.5357C22.5 25.2076 21.3281 24.0357 20 24.0357ZM30 24.0357C28.5938 24.0357 27.5 25.2076 27.5 26.5357C27.5 27.942 28.5938 29.0357 30 29.0357C31.3281 29.0357 32.5 27.942 32.5 26.5357C32.5 25.2076 31.3281 24.0357 30 24.0357ZM40 24.0357C38.5938 24.0357 37.5 25.2076 37.5 26.5357C37.5 27.942 38.5938 29.0357 40 29.0357C41.3281 29.0357 42.5 27.942 42.5 26.5357C42.5 25.2076 41.3281 24.0357 40 24.0357Z"
      fill={color}
    />
  </Svg>
);
