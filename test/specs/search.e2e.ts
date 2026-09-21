import { expect } from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';
import onboarding from '../pageobjects/onboarding.page.js';
import explore from '../pageobjects/explore.page.js';
import search from '../pageobjects/search.page.js';

describe('Wikipedia app search', () => {
    before(() => {
        allureReporter.addFeature('Search');
        allureReporter.addStory('Searching for an article by keyword');
    });

    it('should return search results when searching for "London"', async () => {
        allureReporter.startStep('Completing onboarding and opening Search tab');
        await onboarding.completeOnboarding();
        await explore.waitUntilHomeDisplayed();
        await explore.openSearchTab();
        await search.waitUntilSearchInputDisplayed();
        allureReporter.endStep();

        allureReporter.startStep('Typing search query "London"');
        await search.typeSearchQuery('London');
        allureReporter.endStep();

        allureReporter.startStep('Verifying search results are displayed');
        await search.waitUntilResultsDisplayed();
        const isResultsDisplayed = await search.isResultsDisplayed();
        await expect(isResultsDisplayed).toBe(true);

        const resultsCount = await search.getResultsCount();
        console.log(`Found ${resultsCount} search result rows`);
        await expect(resultsCount).toBeGreaterThan(0);
        allureReporter.endStep();
    });
});
