import { CodeOurWorkAuthPage } from './app.po';

describe('code-our-work-auth App', () => {
  let page: CodeOurWorkAuthPage;

  beforeEach(() => {
    page = new CodeOurWorkAuthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
