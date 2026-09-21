import Page, { byResourceId } from './page.js';

const pageToolbar = byResourceId('org.wikipedia:id/page_toolbar');
const saveButton = byResourceId('org.wikipedia:id/page_save');
const saveToCollectionsDialogTitle = 'android=new UiSelector().textContains("Save articles in collections")';

class ArticlePage extends Page {
  // The article body renders inside a WebView whose resource-id is not
  // always exposed in the accessibility tree, so treat the toolbar +
  // save action (native UI wrapping the article) as the load signal.
  public async isArticleLoaded(): Promise<boolean> {
    const toolbarDisplayed = await this.isElementDisplayed(pageToolbar);
    const saveDisplayed = await this.isElementDisplayed(saveButton);
    return toolbarDisplayed && saveDisplayed;
  }

  public async waitUntilArticleLoaded(): Promise<void> {
    await this.waitUntilElementDisplayed(pageToolbar, 25000);
    await this.waitUntilElementDisplayed(saveButton, 25000);
  }

  public async clickSave(): Promise<void> {
    await this.clickElement(saveButton);
  }

  public async isSaveDialogDisplayed(): Promise<boolean> {
    return this.isElementDisplayed(saveToCollectionsDialogTitle);
  }

  public async waitUntilSaveDialogDisplayed(): Promise<void> {
    await this.waitUntilElementDisplayed(saveToCollectionsDialogTitle, 10000);
  }
}

export default new ArticlePage();
