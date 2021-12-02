import '@testing-library/jest-dom';

jest.setTimeout(30000);

beforeAll((done) => {
    global.provider
    .setup()
    .then(() => done());
});

afterAll((done) => {
    global.provider
    .finalize()
    .then(() => done());
});