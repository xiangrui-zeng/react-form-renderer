import { h, Component } from 'preact';
import { Field, FieldConfig } from './FieldInterface';
import { dlv } from '../utils/FucntionProvider';

export interface InputBoxProps extends FieldConfig {
	// add you own props
}

export default class InputBox extends Field<InputBoxProps> {

	public constructor(props: InputBoxProps) {
		super(props);

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
			name: this.props.name,
			onChange: validate ? this.handleChange : formRender.handleChange,
			onBlur: validate ? this.handleBlur : formRender.handleBlur,
		};

		return (
			<div>
				<input {...field} placeholder={this.props.type} />
			</div>
		);
	}
}
