import { h, Component } from 'preact';
import { dlv } from '../utils/FucntionProvider';
import { FormRenderProps } from './FormRender';

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
  form: FormRenderProps<V>;
}

export interface FieldConfig {
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

/**
 * Custom Field component for quickly hooking into FormRender
 * context and wiring up forms.
 */

export class Field<T extends FieldConfig = any> extends Component<T, {}> {

  public static contextTypes = {
    formRender: Object,
  };

  public constructor(props: T) {
    super(props);
  }

  public handleChange = (e: any) => {
      console.log('changed');
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

    return (<div />);
  }
}
