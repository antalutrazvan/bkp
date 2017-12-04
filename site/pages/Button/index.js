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

import { Button } from 'components/Button';
import ButtonSource from 'components/Button/Button.js?raw'; // eslint-disable-line
import { SegmentedButton } from '../../../components/Button/index';

import { ContextMenu } from 'components/ContextMenu';
import { ContextMenuItem } from 'components/ContextMenu';

export default () => (
  <Page name="Button">
    <Props for={ButtonSource} />

    <Type name="Primary">
      <p>
        Primary button is used when there is a must-take action. For example, to confirm
        change in a modal, to proceed to next step or initiate a new task.
      </p>
      <States>
        <State name="Normal" props={{}} />
        <State name="Missing" props={{ missing: true }} />
        <State name="Disabled" props={{ disabled: true }} />
      </States>
      <Example>
        {({ action, state }) => (
          <Button {...state} onClick={action('clicked')}>
            Something with longer text
          </Button>
        )}
      </Example>
    </Type>

    <Type name="Secondary">
      <p>
        Use Secondary Buttons when there is a an action accompanying the primary
        call-to-action.
      </p>

      <Type subtype name="Outline Secondary">
        <States>
          <State name="Normal" props={{}} />
          <State name="Missing" props={{ missing: true }} />
          <State name="Disabled" props={{ disabled: true }} />
        </States>
        <Variations>
          <Variation name="Large" props={{ style: 'large', xooz: 'bar' }} />
          <Variation name="Small" props={{ style: 'small', foo: 'moo', small: 42 }} />
          <Variation name="Tiny" default props={{ style: 'tiny' }} />
          <Variation name="Micro" default props={{ micro: 'yes' }} />
        </Variations>
        <Example>
          {({ action, state, variation }) => (
            <Button secondary {...state} {...variation} onClick={action('clicked')}>
              Something with longer text
            </Button>
          )}
        </Example>
      </Type>

      <Type subtype name="White Fill Secondary">
        <States>
          <State name="Normal" props={{ variant: 'white' }} />
          <State name="Missing" props={{ variant: 'white', missing: true }} />
          <State name="Disabled" props={{ variant: 'white', disabled: true }} />
        </States>
        <Variations exclusive>
          <Variation name="Large" props={{ style: 'large', xooz: 'bar' }} />
          <Variation name="Small" default props={{ style: 'small', small: 42 }} />
        </Variations>
        <Example>
          {({ action, state, variation }) => (
            <Button secondary {...state} {...variation} onClick={action('clicked')}>
              Something with longer text
            </Button>
          )}
        </Example>
      </Type>
    </Type>
    <Type name="Segmented Button">
        <States>
          <State name="Normal" props={{}} />
          <State name="Disabled" props={{ disabled: true }} />
        </States>
        <Example>
          {({ action, state, variation }) => (
            <SegmentedButton {...state} {...variation} onClick={action('clicked')} onClickSecondary={action('clicked secondary')}>
              Deploy
            </SegmentedButton>
          )}
        </Example>
      </Type>
      <Type name="Segmented Button With Context Menu">
        <States>
          <State name="Normal" props={{}} />
          <State name="Disabled" props={{ disabled: true }} />
        </States>
        <Example>
          {({ action, state, variation }) => (
            <SegmentedButton {...state} {...variation} onClick={action('clicked')} withMenu={({ isOpen }) => (
              <ContextMenu isOpen={isOpen} absolute onClick={action('clicked menu item')}>
                <ContextMenuItem>Item One</ContextMenuItem>
                <ContextMenuItem>Item Two</ContextMenuItem>
                <ContextMenuItem>Item Three</ContextMenuItem>
              </ContextMenu>
          )}>
              Deploy
            </SegmentedButton>
          )}
        </Example>
      </Type>
  </Page>
);
