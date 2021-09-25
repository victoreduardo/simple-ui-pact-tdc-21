import api from "../../services/api";

describe('Services | api', () => {
    test('should have baseURL', async () => {
        expect(api.defaults.baseURL).toEqual("http://127.0.0.1:3003/");
    });
});
