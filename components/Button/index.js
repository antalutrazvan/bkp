import { createThemedComponent } from '../utils';
import PlainButton from './Button';
import PlainSegmentedButton from './SegmentedButton';

import theme from './theme.scss';
import segmentedTheme from './segmented-theme.scss';

const ThemedButton = createThemedComponent('Button', PlainButton, theme);
const ThemedSegmentedButton = createThemedComponent('SegmentedButton', PlainSegmentedButton, segmentedTheme);

export default ThemedButton;
export { PlainButton };
export { PlainSegmentedButton };
export { ThemedSegmentedButton as SegmentedButton }
export { ThemedButton as Button };
