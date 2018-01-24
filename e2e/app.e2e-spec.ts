import { TrailerHealerPage } from './app.po';

describe('trailer-healer App', () => {
  let page: TrailerHealerPage;

  beforeEach(() => {
    page = new TrailerHealerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
