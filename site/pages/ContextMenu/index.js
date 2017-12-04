import React from 'react';
import {
  Page,
  Props,
  Type,
  States,
  State,
  Variations,
  Variation,
  Example
} from 'controls';

import { ContextMenu } from 'components/ContextMenu';
import { ContextMenuItem } from 'components/ContextMenu';
import ContextMenuSource from 'components/ContextMenu/ContextMenu.js?raw'; // eslint-disable-line
import ContextMenuItemSource from 'components/ContextMenu/ContextMenuItem.js?raw'; // eslint-disable-line

export default () => (
  <Page name="ContextMenu">
    <Props for={ContextMenuSource} />

    <Type name="Simple Items">
      <p>
        Primary button is used when there is a must-take action. For example, to confirm
        change in a modal, to proceed to next step or initiate a new task.
      </p>
      <States>
        <State name="Open" props={{ isOpen: true }} />
        <State name="Closed" props={{ isOpen: false }} />
      </States>
      <Example>
        {({ action, state }) => (
          <ContextMenu onClick={action('clicked menu item')} {...state}>
            <ContextMenuItem>Item One</ContextMenuItem>
            <ContextMenuItem>Item Two</ContextMenuItem>
            <ContextMenuItem>Item Three</ContextMenuItem>
          </ContextMenu>
        )}
      </Example>
    </Type>

    <Type name="With Submenu Items">
      <p>
        Primary button is used when there is a must-take action. For example, to confirm
        change in a modal, to proceed to next step or initiate a new task.
      </p>
      <States>
        <State name="Open" props={{ isOpen: true }} />
        <State name="Closed" props={{ isOpen: false }} />
      </States>
      <Variations exclusive>
        <Variation name="Top Right" props={{ absolute: true, positioning: 'top-right' }} />
        <Variation name="Top Left" props={{ absolute: true, positioning: 'top-left' }} />
        <Variation name="Bottom Right" props={{ absolute: true, positioning: 'bottom-right' }} />
        <Variation name="Bottom Left" props={{ absolute: true, positioning: 'bottom-left' }} />
      </Variations>
      <Example>
        {({ action, state, variation }) => {
          console.log('state', state);
          return (<ContextMenu onClick={action('clicked menu item')} {...state}>
            <ContextMenuItem>Item One</ContextMenuItem>
            <ContextMenuItem submenu>
                {({isOpen}) => (
                    <div>
                        Item Two<i className={isOpen ? "glyphicons glyphicons-chevron-down" : "glyphicons glyphicons-chevron-right" } />
                        <ContextMenu absolute isOpen={isOpen} onClick={action('clicked submenu item')} {...variation}>
                            <ContextMenuItem>Item One</ContextMenuItem>
                            <ContextMenuItem submenu>
                                {({isOpen}) => (
                                    <div>
                                        Item Two<i className={isOpen ? "glyphicons glyphicons-chevron-down" : "glyphicons glyphicons-chevron-right" } />
                                        <ContextMenu absolute isOpen={isOpen} onClick={action('clicked submenu item')} {...variation}>
                                            <ContextMenuItem>Item One</ContextMenuItem>
                                            <ContextMenuItem>Item Two</ContextMenuItem>
                                            <ContextMenuItem>Item Three</ContextMenuItem>
                                        </ContextMenu>
                                    </div>    
                                )}
                            </ContextMenuItem>
                            <ContextMenuItem>Item Three</ContextMenuItem>
                        </ContextMenu>
                    </div>    
                )}
            </ContextMenuItem>
            <ContextMenuItem>Item Three</ContextMenuItem>
          </ContextMenu>);
        }}
      </Example>
    </Type>

  </Page>
);
