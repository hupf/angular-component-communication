import { Example1Page } from './app.po';

describe('example1 App', function() {
  let page: Example1Page;

  beforeEach(() => {
    page = new Example1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
