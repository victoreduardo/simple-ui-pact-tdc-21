import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import metricService from "../../services/metricService";
import { toast } from 'react-toastify';

const MetricFormModal = (props) => {
    const {
        buttonLabel,
        className,
        addMetric
    } = props;

    const [modal, setModal] = useState(false);
    const [metricName, setMetricName] = useState('');
    const [metricValue, setMetricValue] = useState('');
    const [metricDate, setMetricDate] = useState('');
    const [metricTime, setMetricTime] = useState('');

    const metricCreate = async () => {
        if (!metricName || !metricValue || !metricDate || !metricTime) {
            setTimeout(() => {
                toast.error("Fill in all fields!");
            }, 200);
        } else {
            const [status, response, error] = await metricService.create({
                metric: { name: metricName, value: metricValue, date: `${metricDate} ${metricTime}` }
            });

            if (status === 201) {
                addMetric(response.data);
                setTimeout(() => { toast.success("Metric created!") }, 2000);
                toggle();
            } else {
                setTimeout(() => { toast.error(error); }, 2000);
            }
        }
    }

    const toggle = () => setModal(!modal);

    return (
        <div>
            <div className="col-md-3 offset-md-6 mt-50 text-right">
                <Button color="primary" onClick={toggle} data-testid="metric-form-modal-button">{buttonLabel}</Button>
            </div>
            <Modal isOpen={modal} toggle={toggle} className={className} data-testid="metric-form-modal">
                <Form>
                    <ModalHeader toggle={toggle} data-testid="metric-form-modal-title">New Metric</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name" data-testid="metric-form-modal-label-name">Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Metric name"
                                   data-testid="metric-form-modal-input-name"
                                   value={metricName}
                                   onChange={e => setMetricName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="metricValue" data-testid="metric-form-modal-label-value">Value</Label>
                            <Input type="number" name="metricValue" id="metricValue" placeholder="Metric value"
                                   data-testid="metric-form-modal-input-value"
                                   value={metricValue}
                                   onChange={e => setMetricValue(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="metricDate" data-testid="metric-form-modal-label-date">Date</Label>
                            <Input type="date" name="metricDate" id="metricDate" placeholder="Metric date"
                                   data-testid="metric-form-modal-input-date"
                                   value={metricDate}
                                   onChange={e => setMetricDate(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="time" data-testid="metric-form-modal-label-time">Time</Label>
                            <Input type="time" name="time" id="time" placeholder="Metric time"
                                   data-testid="metric-form-modal-input-time"
                                   value={metricTime}
                                   onChange={e => setMetricTime(e.target.value)} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" data-testid="metric-form-modal-btn-save" onClick={() => metricCreate()}>Save</Button>{' '}
                        <Button color="secondary" data-testid="metric-form-modal-btn-cancel" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
}

export default MetricFormModal;
