import { FakturaPage } from './app.po';

describe('faktura App', function() {
  let page: FakturaPage;

  beforeEach(() => {
    page = new FakturaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
