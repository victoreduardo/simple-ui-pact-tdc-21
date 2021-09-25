import React  from 'react';

const TimelineItem = props => {
    const { item } = props;
    return (
        <div key={item.id} className="vertical-timeline-item vertical-timeline-element" data-testid="timeline-item">
            <div>
                <span className="vertical-timeline-element-icon bounce-in">
                    <i className="badge badge-dot badge-dot-xl badge-warning"> </i>
                </span>
                <div className="vertical-timeline-element-content bounce-in">
                    <h4 className="timeline-title" data-testid="timeline-item-title">{item.title}</h4>
                    <p data-testid="timeline-item-description">{item.description}</p>
                    <span className="vertical-timeline-element-date" data-testid="timeline-item-milestone">{item.milestone}</span>
                </div>
            </div>
        </div>
    )
}

export default TimelineItem
