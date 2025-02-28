import { describe, it, expect } from 'vitest';
import babel from '@babel/core';
import dedent from 'ts-dedent';
import plugin from './csf-playwright-plugin.ts';

describe('csf-playwright-plugin', () => {
  it('single story', () => {
    const input = dedent`
      import Button from './Button';
      export default { component: Button }
      export const Default = {};
    `;
    const result = babel.transform(input, { plugins: [plugin] });
    expect(result?.code).toMatchInlineSnapshot(`
      "import { test } from \\"@playwright/test\\";
      import { StoryPage } from \\"/Users/shilman/projects/storybookjs/test-runner-playwright/src/StoryPage\\";
      test.describe(\\"default\\", () => {
        test(\\"Default\\", async ({
          page
        }) => {
          const context = {
            id: \\"default--default\\",
            title: \\"default\\",
            name: \\"Default\\",
            hasPlayFunction: false
          };
          const storyPage = new StoryPage(page);
          await storyPage.test(context);
        });
      });"
    `);
  });

  it('multiple stories', () => {
    const input = dedent`
      import Button from './Button';
      export default { component: Button }
      export const Primary = {};
      export const Secondary = {};
    `;
    const result = babel.transform(input, { plugins: [plugin] });
    expect(result?.code).toMatchInlineSnapshot(`
      "import { test } from \\"@playwright/test\\";
      import { StoryPage } from \\"/Users/shilman/projects/storybookjs/test-runner-playwright/src/StoryPage\\";
      test.describe(\\"default\\", () => {
        test(\\"Primary\\", async ({
          page
        }) => {
          const context = {
            id: \\"default--primary\\",
            title: \\"default\\",
            name: \\"Primary\\",
            hasPlayFunction: false
          };
          const storyPage = new StoryPage(page);
          await storyPage.test(context);
        });
        test(\\"Secondary\\", async ({
          page
        }) => {
          const context = {
            id: \\"default--secondary\\",
            title: \\"default\\",
            name: \\"Secondary\\",
            hasPlayFunction: false
          };
          const storyPage = new StoryPage(page);
          await storyPage.test(context);
        });
      });"
    `);
  });

  it('play function', () => {
    const input = dedent`
      import Button from './Button';
      export default { component: Button }
      export const Default = {
        play: () => {},
      };
    `;
    const result = babel.transform(input, { plugins: [plugin] });
    expect(result?.code).toMatchInlineSnapshot(`
      "import { test } from \\"@playwright/test\\";
      import { StoryPage } from \\"/Users/shilman/projects/storybookjs/test-runner-playwright/src/StoryPage\\";
      test.describe(\\"default\\", () => {
        test(\\"Default\\", async ({
          page
        }) => {
          const context = {
            id: \\"default--default\\",
            title: \\"default\\",
            name: \\"Default\\",
            hasPlayFunction: true
          };
          const storyPage = new StoryPage(page);
          await storyPage.test(context);
        });
      });"
    `);
  });

  it('manual title', () => {
    const input = dedent`
      import Button from './Button';
      export default { component: Button, title: 'Example/Button' }
      export const Default = {};
    `;
    const result = babel.transform(input, { plugins: [plugin] });
    expect(result?.code).toMatchInlineSnapshot(`
      "import { test } from \\"@playwright/test\\";
      import { StoryPage } from \\"/Users/shilman/projects/storybookjs/test-runner-playwright/src/StoryPage\\";
      test.describe(\\"Example/Button\\", () => {
        test(\\"Default\\", async ({
          page
        }) => {
          const context = {
            id: \\"example-button--default\\",
            title: \\"Example/Button\\",
            name: \\"Default\\",
            hasPlayFunction: false
          };
          const storyPage = new StoryPage(page);
          await storyPage.test(context);
        });
      });"
    `);
  });
});
