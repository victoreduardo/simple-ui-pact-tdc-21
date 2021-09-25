import { render } from '@testing-library/react';
import Timeline from "../../../components/timeline/timeline";

describe('Components | Timeline', () => {
    test('renders a Timeline with items', () => {
        const items = [
            { id: 1, title: 't1', description: 'desc1', milestone: 'm1' },
            { id: 2, title: 't2', description: 'desc3', milestone: 'm2' },
            { id: 3, title: 't3', description: 'desc3', milestone: 'm3' }
        ];
        const title = 'MyTitle';

        const { getByTestId, getAllByTestId } = render(<Timeline title={title} items={items}/>);
        const timelineTitle = getByTestId('timeline-title');
        const timelineItems = getAllByTestId('timeline-item');

        expect(timelineTitle).toHaveTextContent(title);
        expect(timelineItems.length).toEqual(items.length);
    });

    test('renders a Timeline without items', () => {
        const title = 'MyTitle';

        const { getByTestId } = render(<Timeline title={title} items={[]}/>);
        const timelineTitle = getByTestId('timeline-title');

        expect(timelineTitle).toHaveTextContent(title);
        expect(() => getByTestId('timeline-item')).toThrow('Unable to find an element');
    });
});
