import { browser } from '@wdio/globals';

const prepare = () => {
	browser.pause(1000);
	browser.refresh();
	browser.pause(2000);
};

const itShouldSelectVirtualTarget = () => {
	it('should "select a virtual target"', async () => {
		const selectTargetButton = $('button[data-testid="select-target-button"]');
		await selectTargetButton.waitForClickable({ timeout: 30000 });
		await selectTargetButton.click();

		// target drive is set in the github custom test action
		// if you run the test locally, pass the varibale
		const targetVirtualDrive = $(`=${process.env.TARGET_DRIVE}`);
		await targetVirtualDrive.waitForClickable({ timeout: 10000 });
		await targetVirtualDrive.click();

		const validateTargetButton = $(
			'button[data-testid="validate-target-button"]',
		);
		await validateTargetButton.waitForClickable({ timeout: 10000 });
		await validateTargetButton.click();
	});
};

const itShouldStartFlashing = () => {
	it('should "start flashing"', async () => {
		const flashNowButton = $('button[data-testid="flash-now-button"]');
		await flashNowButton.waitForClickable({ timeout: 10000 });
		await flashNowButton.click();
	});
};

const itShouldGetTheFlashCompletedScreen = () => {
	it('should get the "Flash Completed" screen', async () => {
		const flashResults = $('[data-testid="flash-results"]');
		await flashResults.waitForDisplayed({ timeout: 180000 });

		const flashResultsText = await flashResults.getText();
		expect(flashResultsText).toBe('Flash Completed!');

		// we're good;
		// now we should check the content of the image but we can do that outside wdio
	});
};

export {
	prepare,
	itShouldSelectVirtualTarget,
	itShouldStartFlashing,
	itShouldGetTheFlashCompletedScreen,
};
