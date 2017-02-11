import { UploadsPage } from './app.po';

describe('uploads App', function() {
  let page: UploadsPage;

  beforeEach(() => {
    page = new UploadsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
