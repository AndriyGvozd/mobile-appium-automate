import { expect, browser } from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';
import onboarding from '../pageobjects/onboarding.page.js';
import explore from '../pageobjects/explore.page.js';
import search from '../pageobjects/search.page.js';
import article from '../pageobjects/article.page.js';

describe('Wikipedia app save article', () => {
    before(() => {
        allureReporter.addFeature('Reading lists');
        allureReporter.addStory('Saving an article to a reading list');
    });

    it('should show the "save to collections" dialog when saving an article', async () => {
        allureReporter.startStep('Completing onboarding, searching and opening an article');
        await onboarding.completeOnboarding();
        await explore.waitUntilHomeDisplayed();
        await explore.openSearchTab();
        await search.waitUntilSearchInputDisplayed();
        await search.typeSearchQuery('London');
        await search.waitUntilResultsDisplayed();
        await search.openFirstResult();
        await article.waitUntilArticleLoaded();
        allureReporter.endStep();

        allureReporter.startStep('Tapping the Save button');
        try {
            await article.clickSave();
        } catch (error) {
            console.log('Failed to click save button:', (error as Error).message);
            const screenshot = await browser.takeScreenshot();
            allureReporter.addAttachment('Error Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
            throw error;
        }
        allureReporter.endStep();

        allureReporter.startStep('Verifying the "save to collections" dialog is displayed');
        await article.waitUntilSaveDialogDisplayed();
        const isSaveDialogDisplayed = await article.isSaveDialogDisplayed();
        await expect(isSaveDialogDisplayed).toBe(true);
        allureReporter.endStep();
    });
});
