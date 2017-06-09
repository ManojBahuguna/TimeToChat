import { TimeToChatPage } from './app.po';

describe('time-to-chat App', () => {
  let page: TimeToChatPage;

  beforeEach(() => {
    page = new TimeToChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
