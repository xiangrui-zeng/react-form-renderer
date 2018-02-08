import { h, Component } from 'preact';
import { dlv } from '../utils/FucntionProvider';
import { FormRenderProps } from './FormRender';

export type GenericFieldHTMLAttributes =
| HTMLInputElement
| HTMLSelectElement
| HTMLTextAreaElement;

export interface FieldProps<V = any> {
field: {
    /** Classic React change handler, keyed by input name */
    onChange: (e: any) => void;
    /** Mark component as touched */
    onBlur: (e: any) => void;
    /** Value of the input */
    value: any;
    /* name of the input */
    name: string;
};
    form: FormRenderProps<V>; // if ppl want to restrict this for a given form, let them.
}

export interface FieldConfig {
    /**
     * Field component to render. Can either be a string like 'select' or a component.
     */
    component?: string | Component<FieldProps<any> | void, {}>;

    /**
     * Render prop (works like React router's <Route render={props =>} />)
     */
    render?: ((props: FieldProps<any>) => JSX.Element);

    /**
     * Children render function <Field name>{props => ...}</Field>)
     */
    children?: ((props: FieldProps<any>) => JSX.Element);

    /**
     * Validate a single field value independently
     */
    validate?: ((value: any) => string | Promise<void> | undefined);

    /**
     * Field name
     */
    name: string;

    /** HTML input type */
    type?: string;

    /** Field value */
    value?: any;

}

export type FieldAttributes = GenericFieldHTMLAttributes & FieldConfig;

/**
 * Custom Field component for quickly hooking into FormRender
 * context and wiring up forms.
 */

export class Field<FieldProps extends FieldAttributes = any> extends Component<FieldProps, {}> {

    public static contextTypes = {
        formRender: Object,
    };

    public constructor(props: FieldProps) {
        super(props);
    }

    public handleChange = (e: any) => {
        const { handleChange, validateOnChange } = this.context.formRender;
        handleChange(e); // Call FormRender's handleChange no matter what
        if (!!validateOnChange && !!this.props.validate) {
            this.runFieldValidations(e.target.value);
        }
    }

    public handleBlur = (e: any) => {
        const { handleBlur, validateOnBlur } = this.context.formRender;
        handleBlur(e); // Call FormRender's handleBlur no matter what
        if (validateOnBlur && this.props.validate) {
            this.runFieldValidations(e.target.value);
        }
    }

    public runFieldValidations = (value: any) => {
        const { setFieldError } = this.context.formRender;
        const { name, validate } = this.props;
        // Call validate fn
        setFieldError(name, 'Error Message');
    }

    public render(): JSX.Element {
        const {
            validate,
            name,
            render,
            children,
            component = 'input',
            ...props
        } = this.props as FieldConfig;

        const { formRender } = this.context;

        const field = {
            value: dlv(formRender.values, name),
            name,
            onChange: validate ? this.handleChange : formRender.handleChange,
            onBlur: validate ? this.handleBlur : formRender.handleBlur,
        };

        const bag = { field, form: formRender };

        if (render) {
            return (render)(bag);
        }

        return (<div />);
    }
}
