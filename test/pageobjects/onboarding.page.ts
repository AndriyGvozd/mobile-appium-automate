import { browser } from '@wdio/globals';
import Page from './page.js';

const skipButton = 'android=new UiSelector().text("Skip")';
const nextButton = '~Forward';
const welcomeTitle = 'android=new UiSelector().textContains("world\'s knowledge")';

class OnboardingPage extends Page {
  public async isWelcomeTitleDisplayed(): Promise<boolean> {
    return this.isElementDisplayed(welcomeTitle);
  }

  public async waitUntilWelcomeTitleDisplayed(): Promise<void> {
    await this.waitUntilElementDisplayed(welcomeTitle, 15000);
  }

  public async isSkipButtonDisplayed(): Promise<boolean> {
    return this.isElementDisplayed(skipButton);
  }

  public async clickNext(): Promise<void> {
    await this.waitUntilElementDisplayed(nextButton, 10000);
    await this.clickElement(nextButton);
  }

  public async skipOnboarding(): Promise<void> {
    await this.waitUntilElementDisplayed(skipButton, 10000);
    await this.clickElement(skipButton);
  }

  /**
   * Wikipedia shows a multi-step onboarding on first launch (welcome ->
   * data & privacy -> interests). Number of intermediate screens can vary,
   * so keep tapping Forward until the final Skip button appears.
   */
  public async completeOnboarding(): Promise<void> {
    await this.waitUntilWelcomeTitleDisplayed();

    const maxSteps = 5;
    for (let step = 0; step < maxSteps; step++) {
      if (await this.isSkipButtonDisplayed()) {
        break;
      }
      await this.clickNext();
      await browser.pause(500);
    }

    await this.skipOnboarding();
  }
}

export default new OnboardingPage();
