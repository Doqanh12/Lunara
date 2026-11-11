import React from 'react';
import { useApp } from '../../context/AppContext';
import { getBilingualText } from '../../utils/language';

export interface BilingualTextProps {
  vi: string;
  en: string;
  className?: string;
  primaryClassName?: string;
  subClassName?: string;
}

/**
 * Renders ONLY the active language (Vietnamese when 'vi', English when 'en').
 * Prioritizes a clean, single-language display without dual-language subtitle clutter,
 * keeping proper names intact.
 */
export const BilingualText: React.FC<BilingualTextProps> = ({
  vi,
  en,
  className = '',
  primaryClassName = '',
}) => {
  const { language } = useApp();
  const text = language === 'en' ? en : vi;

  return (
    <span className={primaryClassName || className}>
      {text}
    </span>
  );
};
