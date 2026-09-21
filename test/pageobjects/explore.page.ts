import Page, { byResourceId } from './page.js';

const navTabHome = byResourceId('org.wikipedia:id/nav_tab_home');
const navTabSearch = byResourceId('org.wikipedia:id/nav_tab_search');
const navTabSaved = byResourceId('org.wikipedia:id/nav_tab_reading_lists');
const feedCard = 'android=new UiSelector().textContains("Featured article")';

class ExplorePage extends Page {
  public async isHomeTabDisplayed(): Promise<boolean> {
    return this.isElementDisplayed(navTabHome);
  }

  public async waitUntilHomeDisplayed(): Promise<void> {
    await this.waitUntilElementDisplayed(navTabHome, 15000);
  }

  public async openSearchTab(): Promise<void> {
    await this.clickElement(navTabSearch);
  }

  public async openSavedTab(): Promise<void> {
    await this.clickElement(navTabSaved);
  }

  public async isFeedCardDisplayed(): Promise<boolean> {
    return this.isElementDisplayed(feedCard);
  }
}

export default new ExplorePage();
