import { render, screen, fireEvent } from '@testing-library/react'
import MetricFormModal from "../../../components/metric/metric_form_modal";
import { ToastContainer } from "react-toastify";
import api from "../../../services/api";
import MockAdapter from 'axios-mock-adapter';
import { act } from "react-dom/test-utils";

describe('Components | MetricFormModal', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    test('renders only the button', () => {
        const buttonLabel = 'Open Modal';

        const { getByTestId } = render(<MetricFormModal buttonLabel={buttonLabel} />);
        const modalButton = getByTestId('metric-form-modal-button');

        expect(modalButton).toHaveTextContent(buttonLabel);
        expect(() => getByTestId('metric-form-modal')).toThrow('Unable to find an element');
    });

    test('should open and close the modal', () => {
        const buttonLabel = 'Open Modal';

        const { getByTestId } = render(<MetricFormModal buttonLabel={buttonLabel} />);
        const modalOpenButton = getByTestId('metric-form-modal-button');

        expect(modalOpenButton).toHaveTextContent(buttonLabel);
        expect(() => getByTestId('metric-form-modal')).toThrow('Unable to find an element');

        act(() => {
            modalOpenButton.click();
        });
        expect(getByTestId('metric-form-modal')).toBeInTheDocument();

        const modalCloseButton = getByTestId('metric-form-modal-btn-cancel');

        act(() => {
            modalCloseButton.click();
        });
    });

    test('renders the form', async () => {
        const { getByTestId, findByText } = render(
            <div>
                <ToastContainer />
                <MetricFormModal />
            </div>
        );
        const modalButton = getByTestId('metric-form-modal-button');

        modalButton.click();

        const modalTitle = getByTestId('metric-form-modal-title');
        const modalSaveButton = getByTestId('metric-form-modal-btn-save');
        const modalCancelButton = getByTestId('metric-form-modal-btn-cancel');
        const formLabelName = getByTestId('metric-form-modal-label-name');
        const formLabelValue = getByTestId('metric-form-modal-label-value');
        const formLabelDate = getByTestId('metric-form-modal-label-date');
        const formLabelTime = getByTestId('metric-form-modal-label-time');

        expect(modalTitle).toHaveTextContent('New Metric');
        expect(modalSaveButton).toHaveTextContent('Save');
        expect(modalCancelButton).toHaveTextContent('Cancel');
        expect(formLabelName).toHaveTextContent('Name');
        expect(formLabelValue).toHaveTextContent('Value');
        expect(formLabelDate).toHaveTextContent('Date');
        expect(formLabelTime).toHaveTextContent('Time');

        act(() => {
            modalSaveButton.click();
        });

        expect(await findByText('Fill in all fields!')).toBeInTheDocument()
    });

    test('renders the form and fills out the form', () => {
        const { getByTestId } = render(<MetricFormModal />);
        const modalButton = getByTestId('metric-form-modal-button');

        modalButton.click();

        const formInputName = getByTestId('metric-form-modal-input-name');
        const formInputValue = getByTestId('metric-form-modal-input-value');
        const formInputDate = getByTestId('metric-form-modal-input-date');
        const formInputTime = getByTestId('metric-form-modal-input-time');

        fireEvent.change(formInputName, { target: { value: 'Foo Baa' } });
        fireEvent.change(formInputValue, { target: { value: '12.33' } });
        fireEvent.change(formInputDate, { target: { value: '2021-01-02' } });
        fireEvent.change(formInputTime, { target: { value: '11:12' } });

        expect(formInputName.value).toBe('Foo Baa');
        expect(formInputValue.value).toBe('12.33');
        expect(formInputDate.value).toBe('2021-01-02');
        expect(formInputTime.value).toBe('11:12');
    });

    describe('mocking api request', () => {
        const mock = new MockAdapter(api);
        const metric = { name: 'Foo Baa', value: '12.33', date: '2021-01-02 11:12' };

        test('should submit the form', () => {
            mock.onPost('metrics', { metric: metric }).reply(201, { data: metric });

            const { getByTestId } = render(
                <div>
                    <ToastContainer />
                    <MetricFormModal buttonLabel='add' />
                </div>
            );
            const modalButton = getByTestId('metric-form-modal-button');
            modalButton.click();

            const formInputName = getByTestId('metric-form-modal-input-name');
            const formInputValue = getByTestId('metric-form-modal-input-value');
            const formInputDate = getByTestId('metric-form-modal-input-date');
            const formInputTime = getByTestId('metric-form-modal-input-time');
            const modalSaveButton = getByTestId('metric-form-modal-btn-save');

            fireEvent.change(formInputName, { target: { value: metric.name } });
            fireEvent.change(formInputValue, { target: { value: metric.value } });
            fireEvent.change(formInputDate, { target: { value: '2021-01-02' } });
            fireEvent.change(formInputTime, { target: { value: '11:12' } });

            expect(formInputName.value).toBe(metric.name);
            expect(formInputValue.value).toBe(metric.value);
            expect(formInputDate.value).toBe('2021-01-02');
            expect(formInputTime.value).toBe('11:12');

            act(() => {
                modalSaveButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
            });
        });

        test('should return an error', () => {
            mock.onPost('metrics', { metric: metric }).reply(500, { error: 'An Error' });

            const { getByTestId } = render(
                <div>
                    <ToastContainer />
                    <MetricFormModal buttonLabel='add' />
                </div>
            );
            const modalButton = getByTestId('metric-form-modal-button');
            modalButton.click();

            const formInputName = getByTestId('metric-form-modal-input-name');
            const formInputValue = getByTestId('metric-form-modal-input-value');
            const formInputDate = getByTestId('metric-form-modal-input-date');
            const formInputTime = getByTestId('metric-form-modal-input-time');
            const modalSaveButton = getByTestId('metric-form-modal-btn-save');

            fireEvent.change(formInputName, { target: { value: metric.name } });
            fireEvent.change(formInputValue, { target: { value: metric.value } });
            fireEvent.change(formInputDate, { target: { value: '2021-01-02' } });
            fireEvent.change(formInputTime, { target: { value: '11:12' } });

            expect(formInputName.value).toBe(metric.name);
            expect(formInputValue.value).toBe(metric.value);
            expect(formInputDate.value).toBe('2021-01-02');
            expect(formInputTime.value).toBe('11:12');

            act(() => {
                modalSaveButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
            });
        });
    });
});
