import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light';
import js from 'react-syntax-highlighter/dist/languages/javascript';
import html from 'react-syntax-highlighter/dist/languages/xml';
import docco from 'react-syntax-highlighter/dist/styles/docco';
import jsxToString from 'jsx-to-string';

registerLanguage('html', html);
registerLanguage('javascript', js);

const Highlight = ({ children, language = 'html' }) => (
  <SyntaxHighlighter language={language} style={docco}>
    {typeof children === 'string' ? children : jsxToString(children)}
  </SyntaxHighlighter>
);

Highlight.propTypes = {
  language: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

export default Highlight;

/* raw source code utilities */

const trimSemicolon = s => s.replace(/;$/, '');
const oneLessTab = s => s.replace(/^\s\s/, '');
const intoLines = s => s.split('\n');
const isNotExportLine = line => line.indexOf('export default') < 0;
const replaceExport = s => s.replace('export default () => ', '');
const isOneLineExport = line =>
  line.indexOf('export default') >= 0 && line.indexOf(';') > 0;

const splitText = s => s.split('/* SPLIT */').map(s => s.trim());
const trimExport = s => {
  const lines = intoLines(s);
  const isOneLine = lines.find(isOneLineExport);
  let withoutExport;

  if (isOneLine) {
    withoutExport = replaceExport(s);
  } else {
    withoutExport = lines
      .map(oneLessTab)
      .filter(isNotExportLine)
      .join('\n')
      .replace(/\n\)/, '');
  }

  return trimSemicolon(withoutExport);
};

export const utils = {
  splitText,
  trimExport
};
