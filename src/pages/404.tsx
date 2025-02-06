// src/pages/404.tsx
import React from 'react';
import { Redirect } from '@docusaurus/router';

export default function NotFound() {
  return <Redirect to="/error404" />;
}
