import { browser, by, element } from 'protractor';
import 'tslib';
import 'jasmine';

describe('Тесты PurchaseCreditComponent.', () => {

    beforeEach(async () => {
        await browser.get('/purchase/credit');
    });

    it('Тест заголовка', async () => {
        let title = await element(by.css('h1')).isPresent();
        expect(title).toBeTruthy();
    });

    describe('Тесты отсутствия элементов админки.', () => {
        it('Тест на отсутствия кнопки загрузки изображения.', async () => {
            let subject = await element(by.css('.admin-credit_load-img')).isPresent();
            expect(subject).toBeFalsy();
        });
        it('Тест на отсутствия кнопки добавления банка.', async () => {
            let subject = await element(by.css('.admin-credit_set-snippet')).isPresent();
            expect(subject).toBeFalsy();
        });
        it('Тест на отсутствия чекбоксов.', async () => {
            let subject = await element(by.css('.admin-credit_checkbox')).isPresent();
            expect(subject).toBeFalsy();
        });
        it('Тест на отсутствия кнопки удаления банка.', async () => {
            let subject = await element(by.css('.admin-credit_delete-bank')).isPresent();
            expect(subject).toBeFalsy();
        });
    })
});
