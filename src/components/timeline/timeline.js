import React  from 'react';
import TimelineItem from "./timeline_item";

const Timeline = props => {
    const { title, items } = props;

    return (
        <div className="row d-flex justify-content-center mt-30 mb-70">
            <div className="col-md-6">
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <h5 className="card-title" data-testid="timeline-title">{title}</h5>
                        <div className="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                            {items.map(item => {
                                return (<TimelineItem key={item.id} item={item}/>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timeline
