import React from 'react';
import { useTranslatedText } from '../hooks/useTranslatedText';

const TranslatableText = ({ 
  children, 
  text, 
  component: Component = 'span',
  showLoading = false,
  loadingText = '...',
  className = '',
  ...props 
}) => {
  const originalText = text || children;
  const { translatedText, isLoading } = useTranslatedText(originalText);

  if (isLoading && showLoading) {
    return <Component className={className} {...props}>{loadingText}</Component>;
  }

  return <Component className={className} {...props}>{translatedText}</Component>;
};

export default TranslatableText;