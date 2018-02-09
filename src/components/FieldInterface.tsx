import { h, Component } from 'preact';
import { dlv } from '../utils/FucntionProvider';
import { FormRenderProps } from './FormRender';

export interface FieldConfig {
  /**
   * Validate a single field value independently
   */
	validate?: ((value: any) => string | Promise<void> | undefined);

  /**
   * Field name
   */
	name: string;

	/**
	 * Field type
	 */
	type: string;

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
		const { handleChange, validateOnChange } = this.context.formRender;
		handleChange(e); // Call FormRender's handleChange no matter what
		if (validateOnChange && this.props.validate) {
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

	public prepareRender = () => {
		const {
      validate,
			name,
			type,
			...props
    } = this.props as FieldConfig;

		const { formRender } = this.context;

		const field = {
			value: dlv(formRender.values, name),
			name,
			onChange: validate ? this.handleChange : formRender.handleChange,
			onBlur: validate ? this.handleBlur : formRender.handleBlur,
		};

		return field;

	}

	public render(): JSX.Element {
		return (
			<div>
				<input {...this.prepareRender} />
			</div>
		);
	}
}
