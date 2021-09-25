import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import MetricList from "../../../components/metric/metric_list";
import MockAdapter from "axios-mock-adapter";
import api from "../../../services/api";

describe('Components | MetricList', () => {
    const mock = new MockAdapter(api);
    let container = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('renders metric list', async () => {
        const metrics = [
            { id: 1, name: "Score", value: 12.25, date: "2021-09-22T18:04:54.868Z", created_at: "2021-09-25T13:44:12.755Z", updated_at: "2021-09-25T13:44:12.755Z" },
            { id: 2, name: "Score", value: 76.31, date: "2021-09-22T22:40:23.439Z", created_at: "2021-09-25T13:44:12.767Z", updated_at: "2021-09-25T13:44:12.767Z" }
        ];
        mock.onGet('metrics').reply(200, { data: metrics });

        await act(async () => {
            render(<MetricList />, container);
        });

        expect(container.querySelectorAll("div[data-testid='timeline-item']").length).toEqual(2);
        expect(container.querySelector('button').textContent).toBe('New Metric');
    });
});
