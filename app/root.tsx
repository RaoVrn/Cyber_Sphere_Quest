import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Analytics } from '@vercel/analytics/react';

import Nav from './components/nav';
import './global.css';

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Nav />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
