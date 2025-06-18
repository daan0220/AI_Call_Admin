import React from 'react';
import { FOOTER_TEXTS } from '@/constants/texts';

export default function Footer() {
  return (
    <footer className="w-full text-xs text-gray-500 text-center mt-8 pb-4">
      {FOOTER_TEXTS.version} | {FOOTER_TEXTS.copyright} | {FOOTER_TEXTS.brand}
    </footer>
  );
} 