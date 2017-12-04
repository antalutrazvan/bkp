import { expect } from 'chai';

import { utils } from './Highlight';

describe('Highlight utilities:', () => {
  context('trimExport', () => {
    context('single line export', () => {
      const code = `import React from 'react';

export default () => <Button>BAM</Button>;`;
      const trimmed = utils.trimExport(code);

      it('removes export prefix and trailing ;', () => {
        expect(trimmed).to.eql(`import React from 'react';

<Button>BAM</Button>`);
      });
    });

    context('multi line export', () => {
      const code = `import React from 'react';

export default () => (
  <div>
    <Button>Moar pizza!</Button>
  </div>
);`;
      const trimmed = utils.trimExport(code);

      it('removes export prefix and trailing ;', () => {
        expect(trimmed).to.eql(`import React from 'react';

<div>
  <Button>Moar pizza!</Button>
</div>`);
      });

      it('removes trailing ;', () => {
        const lastChar = trimmed[trimmed.length - 1];
        expect(lastChar).not.to.eql(';');
      });
    });
  });
});
