import { browser } from '@wdio/globals';
import Page, { byResourceId } from './page.js';

const searchInput = byResourceId('org.wikipedia:id/search_src_text');
const searchCard = byResourceId('org.wikipedia:id/search_card');
const searchResultsContainer = byResourceId('org.wikipedia:id/fragment_search_results');
const resultTitles = '//*[@resource-id="org.wikipedia:id/fragment_search_results"]//android.widget.TextView';
const firstResultTitle = `(${resultTitles})[1]`;
const searchWidgetPromoTitle = 'android=new UiSelector().textContains("Faster way to Search")';

class SearchPage extends Page {
  /**
   * Wikipedia occasionally shows a "A Faster way to Search" widget promo
   * bottom sheet the first time the Search tab is opened. Dismiss it so it
   * doesn't block interaction with the search input.
   */
  public async dismissSearchWidgetPromoIfPresent(): Promise<void> {
    if (await this.isElementDisplayed(searchWidgetPromoTitle)) {
      await this.clickAndroidBackBtn();
    }
  }

  public async isSearchInputDisplayed(): Promise<boolean> {
    return this.isElementDisplayed(searchInput);
  }

  public async waitUntilSearchInputDisplayed(): Promise<void> {
    await this.dismissSearchWidgetPromoIfPresent();

    // The Search tab first shows a placeholder "search card"; tap it to
    // reveal the actual editable search input.
    if (await this.isElementDisplayed(searchCard)) {
      await this.clickElement(searchCard);
    }

    await this.dismissSearchWidgetPromoIfPresent();
    await this.waitUntilElementDisplayed(searchInput, 10000);
  }

  public async typeSearchQuery(query: string): Promise<void> {
    await this.setElementInputValue(searchInput, query);
  }

  public async isResultsDisplayed(): Promise<boolean> {
    return this.isElementDisplayed(searchResultsContainer);
  }

  public async waitUntilResultsDisplayed(): Promise<void> {
    await this.waitUntilElementDisplayed(searchResultsContainer, 10000);
  }

  public async getResultsCount(): Promise<number> {
    return this.getListSize(resultTitles);
  }

  public async getFirstResultTitle(): Promise<string> {
    return this.getElementText(firstResultTitle);
  }

  public async openFirstResult(): Promise<void> {
    // Search results stream in incrementally; let the list settle before
    // tapping the first row so we don't click an item that's about to be
    // replaced (causing a stale element error).
    await browser.pause(1500);
    await this.clickElement(firstResultTitle);
  }
}

export default new SearchPage();
