import React from "react";
import Timeline from "../timeline/timeline";
import MetricFormModal from "./metric_form_modal";
import api from "../../services/api";

const average = list => (list.reduce((prev, metric) => prev + parseFloat(metric.value), 0) / list.length).toFixed(2);
const dateByDay = (created_at) => new Date(created_at).toLocaleDateString();
const dateByHours = (created_at) => new Date(created_at).getHours();
const dateByMinutes = (created_at) => new Date(created_at).getMinutes();

function groupByDate(metrics) {
    const groupByMinutes = (recordsByKey) => groupByKey(recordsByKey, dateByMinutes, 'minute');
    const groupByHours = (recordsByKey) => groupByKey(recordsByKey, dateByHours, 'hour', 'groupByMinutes', groupByMinutes);
    const results = groupByKey(metrics, dateByDay, 'date', 'groupByHours', groupByHours);

    return results;
}

function groupByKey(records, dateBy, keyName, subGroupName = null, subGroup = null) {
    const recordsGrouped = records.reduce((groups, item) => {
        const key = dateBy(item.date);

        if (!groups[key]) {
            groups[key] = [];
        }

        groups[key].push(item);

        return groups;
    }, {});

    const results = Object.keys(recordsGrouped).map(key => {
        const recordsByKey = recordsGrouped[key];
        const result = {
            average: average(recordsByKey),
            metrics: recordsByKey
        };
        result[keyName] = key;

        if (subGroupName) {
            result[subGroupName] = subGroup(recordsByKey);
        }

        return result;
    });

    return results;
}

export default class MetricList extends React.Component {
    constructor() {
        super();
        this.state = {
            metrics: [],
            groupedMetrics: []
        }

        this.updateGroupMetrics = () => {
            const metricsArray = groupByDate(this.state.metrics);
            const groupedMetrics = [];

            metricsArray.forEach(record => {
                record.groupByHours.forEach(recordByHour => {
                    recordByHour.groupByMinutes.forEach(recordByMinute => {
                        recordByMinute.metrics.forEach(metric => {
                            groupedMetrics.push({
                                id: metric.id,
                                title: `Metric name: ${metric.name}`,
                                description: `Value: ${metric.value} | Avg minute: ${recordByMinute.average} | Avg Hour: ${recordByHour.average} | Avg Day: ${record.average}`,
                                milestone: new Date(metric.date).toLocaleDateString()
                            });
                        });
                    });
                })
            });

            this.setState({ groupedMetrics });
        }

        this.addMetric = (metric) => {
            const metrics = this.state.metrics.slice();
            metrics.push(metric)

            this.setState({ metrics });
            this.updateGroupMetrics();
        }

        this.setMetrics = (metrics) => {
            this.setState({ metrics });
            this.updateGroupMetrics();
        }
    }

    componentDidMount() {
        api.get("metrics").then(response => {
            this.setMetrics(response.data.data);
        });
    }

    render() {
        return (
            <div>
                <MetricFormModal buttonLabel="New Metric" addMetric={this.addMetric.bind(this)}/>
                <Timeline title="Metrics" items={this.state.groupedMetrics}/>
            </div>
        )
    }
}
