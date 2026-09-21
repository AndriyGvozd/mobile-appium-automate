import { expect } from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';
import onboarding from '../pageobjects/onboarding.page.js';
import explore from '../pageobjects/explore.page.js';
import search from '../pageobjects/search.page.js';
import article from '../pageobjects/article.page.js';

describe('Wikipedia app article view', () => {
    before(() => {
        allureReporter.addFeature('Article');
        allureReporter.addStory('Opening an article from search results');
    });

    it('should open an article after tapping a search result', async () => {
        allureReporter.startStep('Completing onboarding and searching for "London"');
        await onboarding.completeOnboarding();
        await explore.waitUntilHomeDisplayed();
        await explore.openSearchTab();
        await search.waitUntilSearchInputDisplayed();
        await search.typeSearchQuery('London');
        await search.waitUntilResultsDisplayed();
        allureReporter.endStep();

        allureReporter.startStep('Opening the first search result');
        await search.openFirstResult();
        allureReporter.endStep();

        allureReporter.startStep('Verifying the article page is loaded');
        await article.waitUntilArticleLoaded();
        const isArticleLoaded = await article.isArticleLoaded();
        await expect(isArticleLoaded).toBe(true);
        allureReporter.endStep();
    });
});
