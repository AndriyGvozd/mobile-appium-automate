import { expect } from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';
import onboarding from '../pageobjects/onboarding.page.js';
import explore from '../pageobjects/explore.page.js';

describe('Wikipedia app onboarding', () => {
    before(() => {
        allureReporter.addFeature('Onboarding');
        allureReporter.addStory('First launch welcome flow');
    });

    it('should show the welcome screen and lead to the Explore feed after completing onboarding', async () => {
        allureReporter.startStep('Checking welcome title is displayed on first launch');
        await onboarding.waitUntilWelcomeTitleDisplayed();
        const isWelcomeDisplayed = await onboarding.isWelcomeTitleDisplayed();
        await expect(isWelcomeDisplayed).toBe(true);
        allureReporter.endStep();

        allureReporter.startStep('Completing onboarding (Forward -> Skip)');
        await onboarding.completeOnboarding();
        allureReporter.endStep();

        allureReporter.startStep('Verifying Explore feed (Home tab) is displayed');
        await explore.waitUntilHomeDisplayed();
        const isHomeDisplayed = await explore.isHomeTabDisplayed();
        await expect(isHomeDisplayed).toBe(true);
        allureReporter.endStep();
    });
});
