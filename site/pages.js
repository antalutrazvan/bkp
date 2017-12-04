import GetStarted from 'pages/GetStarted';
import WhatsNew from 'pages/WhatsNew';
import Guideline from 'pages/Guideline';
import Motion from 'pages/Motion';
import Theming from 'pages/Theming';
import Localization from 'pages/Localization';

import Button from 'pages/Button';
import ContextMenu from 'pages/ContextMenu';
import LoadMore from 'pages/LoadMore';

export const general = [
  { class: GetStarted, id: 'GetStarted', title: 'Get Started' },
  { class: WhatsNew, id: 'WhatsNew', title: "What's new" },
  { class: Guideline, id: 'Guideline' },
  { class: Motion, id: 'Motion' },
  { class: Theming, id: 'Theming' },
  { class: Localization, id: 'Localization' }
];

export const components = [
  { class: Button, id: 'Button' },
  { class: ContextMenu, id: 'ContextMenu' },
  { class: LoadMore, id: 'LoadMore', title: 'Load More Scroll' }
];

export const layouts = [];
