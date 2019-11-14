
/*

    Обертка для обработки ответа/ошибки в асинхронных функциях
    для сокращения написания роута в контроллерах

    Пример:

    this.app.get('/api/credit', responseHandler(async(req) => {
        return await this.controller.getSnippet();
    }));

*/

// принимает асинхронную функцию fn
export const responseHandler = (fn) => {
    // middleware expressJS@
    return (req, res) => {
        // передав request аргументом
        fn(req).then((response) => res.json(response))
        // ловит ошибку
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error });
        });
    };
};
