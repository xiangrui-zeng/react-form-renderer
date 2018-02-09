import { h, Component } from 'preact';
import { Field, FieldConfig } from './FieldInterface';
import { dlv } from '../utils/FucntionProvider';

export interface FieldInputProps extends FieldConfig {

}

export default class FieldInput extends Field<FieldInputProps> {

	public constructor(props: FieldInputProps) {
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

		const bag = { field, form: formRender };

		return (
			<div>
				<input {...field}/>
			</div>
		);
	}
}
