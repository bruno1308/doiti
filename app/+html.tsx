import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";
import config from "../app.json";

// Public assets live at the site root in development and under /doiti on Pages.
const publicRoot = process.env.NODE_ENV === "production" ? `${config.expo.experiments.baseUrl}/` : "/";

export default function RootHtml({ children }: PropsWithChildren) {
  return <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#f2efe6" />
      <meta name="description" content="Practise German with sentence puzzles, everyday conversations and A1/A2 grammar exercises." />
      <link rel="manifest" href={`${publicRoot}manifest.webmanifest`} />
      <link rel="apple-touch-icon" sizes="180x180" href={`${publicRoot}icons/apple-touch-icon.png`} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Doiti" />
      <ScrollViewStyleReset />
    </head>
    <body>{children}</body>
  </html>;
}
