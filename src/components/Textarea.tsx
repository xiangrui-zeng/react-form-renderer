import { h, Component } from 'preact';
import { Field, FieldConfig } from './FieldInterface';
import { dlv } from '../utils/FucntionProvider';

export interface TextareaProps extends FieldConfig {
	// add you own props
}

export default class Textarea extends Field<TextareaProps> {

	public constructor(props: TextareaProps) {
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
				<textarea {...field} placeholder={this.props.type} />
			</div>
		);
	}
}

