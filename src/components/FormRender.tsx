import { h, Component } from 'preact';
import { Template, create } from 'document-template/src/template/index'
import { FieldType, FieldMap, Field } from 'document-template/src/model/field';
import { DataValue } from 'document-template/src/data';
import * as update from 'immutability-helper';

/**
 * An object containing error messages whose keys correspond to DataValue.
 * Should be always be and object of strings, but any is allowed to support i18n libraries.
 */
export type FormRenderErrors<Values> = { [field in keyof Values]?: any };

/**
 * An object containing touched state of the form whose keys correspond to DataValue.
 */
export type FormRenderTouched<Values> = { [field in keyof Values]: boolean };

/**
 * FormRnder state tree
 */
export interface FormRenderState<Values> {
    /** Form values */
    values: Values;
    /** map of field names to specific error for that field */
    errors: FormRenderErrors<Values>;
    /** map of field names to whether the field has been touched */
    touched: FormRenderTouched<Values>;
    /** whether the form is currently submitting */
    isSubmitting: boolean;
    /** Top level status state, in case you need it */
    status?: any;   
}

/**
 * FormRender computed properties. These are read-only.
 */
export interface FormRenderComputedProps<Values> {
    /** True if any input has been touched. False otherwise. */
    readonly dirty: boolean;
    /** Result of isInitiallyValid on mount, then whether true values pass validation. */
    readonly isValid: boolean;
    /** initialValues */
    readonly initialValues: Values;
}

/**
 * FormRender state helpers
 */
export interface FormRenderActions<Values> {
    /** Manually set top level status. */
    setStatus(status?: any): void;
    /** Manually set errors object */
    setErrors(errors: FormRenderErrors<Values>): void;
    /** Manually set isSubmitting */
    setSubmitting(isSubmitting: boolean): void;
    /** Manually set touched object */
    setTouched(touched: FormRenderTouched<Values>): void;
    /** Manually set values object  */
    setValues(values: Values): void;
    /** Set value of form field directly */
    setFieldValue(
        field: keyof Values,
        value: any,
        shouldValidate?: boolean
    ): void;
    setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
    /** Set value of form field directly */
    setFieldValue(field: string, value: any): void;
    /** Set error message of a form field directly */
    setFieldError(field: keyof Values, message: string): void;
    setFieldError(field: string, message: string): void;
    /** Set whether field has been touched directly */
    setFieldTouched(
        field: keyof Values,
        isTouched?: boolean,
        shouldValidate?: boolean
    ): void;
    setFieldTouched(
        field: string,
        isTouched?: boolean,
        shouldValidate?: boolean
    ): void;
    /** Set whether field has been touched directly */
    setFieldTouched(field: string, isTouched?: boolean): void;
    /** Validate form values */
    validateForm(values?: any): void;
    /** Reset form */
    resetForm(nextValues?: any): void;
    /** Submit the form imperatively */
    submitForm(): void;
    /** Set FormRender state, careful! */
    setFormRenderState<K extends keyof FormRenderState<Values>>(
        f: (
        prevState: Readonly<FormRenderState<Values>>,
        props: any
        ) => Pick<FormRenderState<Values>, K>,
        callback?: () => any
    ): void;
    /** Set FormRender state, careful! */
    setFormRenderState<K extends keyof FormRenderState<Values>>(
        state: Pick<FormRenderState<Values>, K>,
        callback?: () => any
    ): void;
}

/**
 * FormRender form event handlers
 */
export interface FormRenderHandlers {
    /** Form submit handler */
    handleSubmit: (
        e: any
    ) => void;
    /** Classic React change handler, keyed by input name */
    handleChange: (e: any) => void;
    /** Mark input as touched */
    handleBlur: (e: any) => void;
    /** Reset form event handler  */
    handleReset: () => void;
}

/**
 * Base formRender configuration/props shared between the HoC and Component.
 */
export interface FormRenderSharedConfig {
    /** Tells FormRender to validate the form on each input's onChange event */
    validateOnChange?: boolean;
    /** Tells FormRender to validate the form on each input's onBlur event */
    validateOnBlur?: boolean;
    /** Tell FormRender if initial form values are valid or not on first render */
    isInitialValid?: boolean | ((props: object) => boolean | undefined);
    /** Should FormRender reset the form when new initialValues change */
    enableReinitialize?: boolean;
}

/**
 * <FormRender /> props
 */
export interface FormRenderConfig<Values> extends FormRenderSharedConfig {
    /**
     * Initial values of the form
     */
    initialValues: Values;

    /**
     * Reset handler
     */
    onReset?: (values: Values, formRenderActions: FormRenderActions<Values>) => void;

    /**
     * Submission handler
     */
    onSubmit: (values: Values, formRenderActions: FormRenderActions<Values>) => void;

    /**
     * Form component to render
     */
    component?: Component<any, any>;

    /**
     * Render prop (works like React router's <Route render={props =>} />)
     */
    render?: ((props: FormRenderProps<Values>) => JSX.Element);

    /**
     * A Yup Schema or a function that returns a Yup schema
     */
    validationSchema?: any | (() => any);

    /**
     * Validation function. Must return an error object or promise that
     * throws an error object where that object keys map to corresponding value.
     */
    validate?: ((
        values: Values
    ) => void | object | Promise<FormRenderErrors<Values>>);

    /**
     * React children or child render callback
     */
    children?:
        | ((props: FormRenderProps<Values>) => JSX.Element)
        | JSX.Element;
}

/**
 * State, handlers, and helpers made available to form component or render prop
 * of <FormRender/>.
 */
export type FormRenderProps<Values> = FormRenderState<Values> &
    FormRenderActions<Values> &
    FormRenderHandlers &
    FormRenderComputedProps<Values>;

export class FormRender<ExtraProps = {}, Values = any> extends Component<FormRenderConfig<Values> & ExtraProps, FormRenderState<any>> {

    static defaultProps = {
        validateOnChange: true,
        validateOnBlur: true,
        isInitialValid: false,
        enableReinitialize: false,
    };

    static childContextTypes = {
        formRender: Object,
    };

    initialValues: Values;

    getChildContext() {
        return {
            formRender: this.getFormRenderBag(),
        };
    }


    constructor(props: FormRenderConfig<Values> & ExtraProps) {
        super(props);
        this.state = {
            values: props.initialValues || ({} as any),
            errors: {},
            touched: {},
            isSubmitting: false,
        };
        this.initialValues = props.initialValues || ({} as any);
    }

    getFormRenderBag = () => {
        return {
            ...this.state,
            ...this.getFormRenderActions(),
            ...this.getFormRenderComputedProps(),
            handleBlur: this.handleBlur,
            handleChange: this.handleChange,
            handleReset: this.handleReset,
            handleSubmit: this.handleSubmit,
            validateOnChange: this.props.validateOnChange,
            validateOnBlur: this.props.validateOnBlur,
        };
    };

    componentWillMount() {
        // validation and check here
    }

    setErrors = (errors: FormRenderErrors<Values>) => {
        this.setState({ errors });
    };

    setTouched = (touched: FormRenderTouched<Values>) => {
        this.setState({ touched }, () => {
            if (this.props.validateOnBlur) {
            this.runValidations(this.state.values);
            }
        });
    };
    
    setValues = (values: DataValue) => {
        this.setState({ values: values }, () => {
            if (this.props.validateOnChange) {
            this.runValidations(values);
            }
        });
    };

    setStatus = (status?: any) => {
        this.setState({ status });
    };

    setSubmitting = (isSubmitting: boolean) => {
        this.setState({ isSubmitting });
    };

    /**
     * Run validation Formula 
     */
    runValidationSchema = (values: DataValue, onSuccess?: Function) => {
        // Do something
    };

    /**
     * Run validations and update state accordingly
     */
    runValidations = (values: DataValue = this.state.values) => {
        if (this.props.validationSchema) {
            this.runValidationSchema(values);
        }
    };

    handleChange = (e: any) => {

        // Set form fields by name
        const { type, name, id, value, checked } = e.target;

        const newValues = update(this.state.values, {
            [name]: {$set: value}
          });

        this.setState({
            values: newValues,
        });

        // Check Validation changed or not
    };

    setFieldValue = (
        field: string,
        value: any,
        shouldValidate: boolean = true
        ) => {
        // Set form field by name
    };

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.submitForm();
    };

    submitForm = () => {
        // Recursively set all values to `true`.
        this.setState({
        });

        // do validate

        // execute submit
        this.executeSubmit();

    };

    executeSubmit = () => {
        // call props submit
        console.log(this.state)
        this.props.onSubmit(this.state.values, this.getFormRenderActions());
    };

    handleBlur = (e: any) => {
        // update state fo touched

        if (this.props.validateOnBlur) {
            this.runValidations(this.state.values);
        }
    };
    
    setFieldTouched = (
        field: string,
        touched: boolean = true,
        shouldValidate: boolean = true
        ) => {
        // Set touched field by name
        // run validate
    };
    
    setFieldError = (field: string, message: string) => {
    // Set form field by name
    
    };
    
    resetForm = (nextValues?: Values) => {
        // set initialValues
        
    };
    
    handleReset = () => {
        // Do something
    };

    setFormRenderState = (s: any, callback?: (() => void)) => this.setState(s, callback);

    getFormRenderActions = (): FormRenderActions<any> => {
        return {
            resetForm: this.resetForm,
            submitForm: this.submitForm,
            validateForm: this.runValidations,
            setErrors: this.setErrors,
            setFieldError: this.setFieldError,
            setFieldTouched: this.setFieldTouched,
            setFieldValue: this.setFieldValue,
            setStatus: this.setStatus,
            setSubmitting: this.setSubmitting,
            setTouched: this.setTouched,
            setValues: this.setValues,
            setFormRenderState: this.setFormRenderState,
        };
    };

    getFormRenderComputedProps = () => {
        
        //return props
        return {};
    };


    public render(): JSX.Element {
        const { component, render, children } = this.props;
        const props = this.getFormRenderBag();
        return component? (component as any, props) : render? ((render as any)(props)) : null;
    }
}
