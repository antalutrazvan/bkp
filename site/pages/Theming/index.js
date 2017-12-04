import React from 'react';
import { Page, Highlight, HighlightUtils, HSplit } from 'controls';

import Button, { PlainButton } from 'components/Button';
import ButtonIndexSource from 'components/Button/index.js?raw'; // eslint-disable-line

import ExampleThemeProvider from './ExampleThemeProvider';
import ExampleThemeProviderSource from './ExampleThemeProvider.js?raw';
// eslint-disable-next-line no-unused-vars
let [_, codeThemeProviderJS, codeThemeProviderJSX] = HighlightUtils.splitText(
  ExampleThemeProviderSource
);
codeThemeProviderJSX = HighlightUtils.trimExport(codeThemeProviderJSX);

import ExampleThemeProp from './ExampleThemeProp';
import ExampleThemePropSource from './ExampleThemeProp?raw';
let codeThemeProp = HighlightUtils.splitText(ExampleThemePropSource)[1];
codeThemeProp = HighlightUtils.trimExport(codeThemeProp);

export default () => (
  <Page name="Theming">
    <h2>Themed vs Plain components</h2>
    <p>
      Nebula has a default theme that is provided for all its components. It is based on
      the UX team's designs.
    </p>
    <p>
      Each component also has a <i>plain</i>, unstyled variation, so that it can be styled
      from scratch.
    </p>
    <p>
      Based on your theming needs, you can choose any of those. If the style change you
      have to do is just a small deviation from default nebula theme, you can use themed
      component and adjust it. If the visual you're trying to achieve is very different,
      plain component might be a better option.
    </p>
    <h3>Exports</h3>
    <p>Both styled and plain components can be found in exports of component module.</p>
    <p>
      Default export is always the most common variant of component, and it is styled in
      default theme.
    </p>
    <HSplit>
      <Highlight>{`<Button>Button</Button>`}</Highlight>
      <Button>Button</Button>
    </HSplit>
    <p>
      Other variations of component are accessible under specific names in the module
      namespace. Among those is also a plain component.
    </p>
    <HSplit>
      <Highlight>{`<PlainButton>PlainButton</PlainButton>`}</Highlight>
      <PlainButton>PlainButton</PlainButton>
    </HSplit>
    <h3>Exports example</h3>
    <Highlight language="javascript">{ButtonIndexSource}</Highlight>
    <h2>Theme scopes</h2>
    <p>
      Components can be themed on several levels. It is possible to adjust styling within
      a specific component, or in a given page. We use{' '}
      <a href="https://github.com/javivelasco/react-css-themr" target="_blank">
        react-css-themr
      </a>{' '}
      that provides a wrapper component to supply alternative theme.
    </p>
    <p>
      Typical use cases are mentioned below. For more details, checkout the docs of
      react-css-themr.
    </p>
    <h3>Style a single component</h3>
    <p>
      For rare instances of a component, where you don't want to wrap it and want to keep
      it simple.
    </p>
    <HSplit>
      <Highlight>{codeThemeProp}</Highlight>
      <ExampleThemeProp />
    </HSplit>
    <h3>Style more components (contextual styling)</h3>
    <p>
      This is useful if there is a section or page, where different styles need to be
      applied for a component, or even more components.
    </p>
    <p>
      <code>ThemeProvider</code> injects <code>theme</code> prop to all components,
      depending on the theme context mapping.
    </p>
    <p>
      <code>theme</code> is propagated using context, so that all components within the
      wrapper have access to theirs respective stylesheets. More details can be found in {' '}
      <a href="https://github.com/javivelasco/react-css-themr" target="_blank">
        react-css-themr
      </a>{' '}
      docs.
    </p>
    <HSplit>
      <Highlight>{codeThemeProviderJSX}</Highlight>
      <ExampleThemeProvider />
    </HSplit>
    <p>
      What is the <code>themeContext</code>? Just an object, where keys are names of
      components, and value for each key is the stylesheet to be used. You can find name
      of the component in its module's index.js file, as a first parameter to{' '}
      <code>themr()</code>.
    </p>
    <Highlight language="javascript">{codeThemeProviderJS}</Highlight>
    <p>
      This technique should also be used to provide default theme to whole application.
      Theme switching could then be achieved just by chaingin <code>themeContext</code>.
    </p>
    <h2>Stylesheets and style overrides</h2>
    <p>
      To override the default style of a component, it's best to check the theme.scss file
      within the component module. There you can see all the different selectors you can
      use.
    </p>
    <p>
      If you require changes to markup of the component, or adding a new selector, please,
      file an issue on{' '}
      <a
        href="https://wwwin-github.cisco.com/cliqrtech/nebula/issues/new"
        target="_blank"
      >
        nebula repository
      </a>.
    </p>
  </Page>
);
