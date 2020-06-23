import { browser, by, element } from 'protractor';
import 'tslib';
import 'jasmine';

describe('Тесты NewsSharesAllComponent.', () => {

    beforeEach(async () => {
        await browser.get('/news-shares');
    });

    it('Должен быть заголовок.', async () => {
        let subject = await element(by.css('h1')).getText();
        let result  = 'Новости';
        expect(subject).toEqual(result);
    });

    it('Тест на содержание хедера <app-header>.', async () => {
        let subject = await element(by.css('app-header')).isPresent();
        expect(subject).toBe(true);
    });

    it('Тест на содержание футера <app-footer>.', async () => {
        let subject = await element(by.css('app-footer')).isPresent();
        expect(subject).toBe(true);
    });

    it('Тест на отсутствие элементов админки.', async () => {
        let subject = await element(by.css('.admin-controll')).isPresent();
        expect(subject).toBe(false);
    });
});
