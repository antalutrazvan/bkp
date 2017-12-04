import { createThemedComponent } from '../utils';
import PlainContextMenu from './ContextMenu';
import PlainContextMenuItem from './ContextMenuItem';

import theme from './theme.scss';

const ThemedContextMenu = createThemedComponent('ContextMenu', PlainContextMenu, theme);

const ThemedContextMenuItem = createThemedComponent('ContextMenuItem', PlainContextMenuItem, theme);

export default ThemedContextMenu;
export { PlainContextMenu };
export { ThemedContextMenu as ContextMenu };
export { PlainContextMenuItem };
export { ThemedContextMenuItem as ContextMenuItem };
