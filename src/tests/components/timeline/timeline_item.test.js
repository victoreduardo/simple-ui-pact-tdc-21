import { render } from '@testing-library/react';
import TimelineItem from "../../../components/timeline/timeline_item";

describe('Components | TimelineItem', () => {
    test('renders a item', () => {
        const item = { id: 1, title: 't1', description: 'desc1', milestone: 'm1' };

        const { getByTestId } = render(<TimelineItem item={item}/>);
        const itemTitle = getByTestId('timeline-item-title');
        const itemDescription = getByTestId('timeline-item-description');
        const itemMilestone = getByTestId('timeline-item-milestone');

        expect(itemTitle).toHaveTextContent(item.title);
        expect(itemDescription).toHaveTextContent(item.description);
        expect(itemMilestone).toHaveTextContent(item.milestone);
    });
});
