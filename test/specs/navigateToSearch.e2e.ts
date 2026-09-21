import { expect } from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';
import onboarding from '../pageobjects/onboarding.page.js';
import explore from '../pageobjects/explore.page.js';
import search from '../pageobjects/search.page.js';

describe('Wikipedia app navigation', () => {
    before(() => {
        allureReporter.addFeature('Navigation');
        allureReporter.addStory('Bottom navigation - Search tab');
    });

    it('should open the Search tab from the bottom navigation', async () => {
        allureReporter.startStep('Completing onboarding');
        await onboarding.completeOnboarding();
        await explore.waitUntilHomeDisplayed();
        allureReporter.endStep();

        allureReporter.startStep('Opening Search tab');
        await explore.openSearchTab();
        allureReporter.endStep();

        allureReporter.startStep('Verifying search input is displayed');
        await search.waitUntilSearchInputDisplayed();
        const isSearchInputDisplayed = await search.isSearchInputDisplayed();
        await expect(isSearchInputDisplayed).toBe(true);
        allureReporter.endStep();
    });
});
