import * as Pact from '@pact-foundation/pact';
import api from "../../services/api";
const { integer } = Pact.Matchers;

describe('Metric Service API', () => {
    describe('all metrics', () => {
        const metricsExpectation = [
            { id: integer(1), name: "Score", value: "12.25", date: "2021-09-22T18:04:54.868Z", created_at: "2021-09-25T13:44:12.755Z", updated_at: "2021-09-25T13:44:12.755Z" },
            { id: integer(2), name: "Score 2", value: "76.31", date: "2021-09-22T22:40:23.439Z", created_at: "2021-09-25T13:44:12.767Z", updated_at: "2021-09-25T13:44:12.767Z" }
        ];

        beforeEach((done) => {
            global.provider.addInteraction({
                state: 'provider allows return all metric',
                uponReceiving: 'a GET request to return all metric',
                withRequest: {
                    method: 'GET',
                    path: '/metrics',
                    headers: {
                        "Accept": "application/json"
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: { data: metricsExpectation }
                }
            }).then(() => done());
        });

        it('sends a request according to contract', (done) => {
            api.get('metrics')
                .then(response => {
                    expect(response.status).toEqual(200);
                    expect(response.data.data.length).toEqual(2);
                })
                .then(() => {
                    global.provider.verify()
                        .then(() => done(), error => {
                            done.fail(error)
                        })
                });
        });
    });

    describe('create a metric', () => {
        const requestData = {
            metric: { name: 'Foo Baa', value: "12.33", date: '2021-01-02 11:12' }
        };
        beforeEach((done) => {
            global.provider.addInteraction({
                state: 'provider allows metric creation',
                uponReceiving: 'a POST request to create a metric',
                withRequest: {
                    method: 'POST',
                    path: '/metrics',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: requestData
                },
                willRespondWith: {
                    status: 201,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: {
                        data: {
                            id: integer(1),
                            name: 'Foo Baa',
                            value: "12.33",
                            date: '2021-01-02T11:12:00.000Z'
                        }
                    }
                }
            }).then(() => done());
        });

        it('sends a request according to contract', (done) => {
            api.post('metrics', requestData)
                .then(response => {
                    expect(response.status).toEqual(201);
                })
                .then(() => {
                    global.provider.verify()
                        .then(() => done(), error => {
                            done.fail(error)
                        })
                });
        });
    });
});
