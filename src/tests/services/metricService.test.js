import metricService from "../../services/metricService";
import api from "../../services/api";
import MockAdapter from 'axios-mock-adapter';

describe('Services | MetricService', () => {
    const mock = new MockAdapter(api);
    const requestData = {
        metric: { name: 'Foo Baa', value: 12.33, date: `2021-01-02 11:12` }
    };

    describe('create', () => {
        test('should create a metric', async () => {
            mock.onPost('metrics', requestData).reply(201, {});

            const [status, responseData, error] = await metricService.create(requestData);

            expect(status).toEqual(201);
            expect(responseData).toEqual({});
            expect(error).toBeNull();
        });

        test('should receive an error', async () => {
            mock.onPost('metrics', requestData).reply(500, {
                error: 'Unprocessed request'
            });

            const [status, responseData, error] = await metricService.create(requestData);

            expect(status).toEqual(500);
            expect(responseData).toEqual({});
            expect(error).toEqual('Unprocessed request');
        });
    });
});
