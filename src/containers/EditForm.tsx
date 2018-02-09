import { h, Component } from 'preact';
import { FormRender, FormRenderProps } from '../components/FormRender';
import { Field, FieldProps } from '../components/Field';
import { Form } from '../components/Form';
import * as update from 'immutability-helper';
import { Template, create } from 'document-template/src/template/index';
import { FieldType, FieldMap, Field as FieldM } from 'document-template/src/model/field';
import { DataValue } from 'document-template/src/data';
import FieldInput from '../components/FieldInput'
import InputBox from '../components/InputBox';
import TextArea from '../components/Textarea';
import TagsInput from '../components/TagsInput';

interface EditFromProps {
  template: Template;
}

interface EditFromState {
  values: DataValue;
}

export default class EditForm extends Component<EditFromProps, EditFromState> {

  public constructor(props: EditFromProps) {
    super(props);

    this.state = {
      values: this.props.template.createObject(),
    };

  }

  public render(): JSX.Element {
    const componentList = this.getAllField(this.props.template, this.state.values, this.getMapedComponent);
    return (
      <div>
        <h1>Form Example</h1>
        <FormRender
          initialValues={{ values: this.state.values }}
          onSubmit={(values: DataValue) => alert(JSON.stringify(values))}
          render={(formRenderBag: FormRenderProps<DataValue>) => (
            <Form>
              {componentList}
              <button type="submit">Submit</button>
            </Form>
          )}
        />
      </div>
    );
  }

  public getAllField = (template: Template, values: DataValue, func: (field: FieldM, state: DataValue) => JSX.Element) => {

    const fieldList: JSX.Element[] = Object.keys(template.model).map((modelIndex: string): JSX.Element => {
      const model = template.model[modelIndex];
      return func(model, values);
    });

    return fieldList;
  }

  public getMapedComponent = (field: FieldM, values: DataValue): JSX.Element => {
    switch (field.type) {
      case FieldType.String:
        return (
          <InputBox
            name={field.name} type={FieldType.String}
          />
        );
      case FieldType.Number:
        return (
          <InputBox
            name={field.name} type={FieldType.Number}
          />
        );
      case FieldType.Boolean:
        return (
          <InputBox
            name={field.name} type={FieldType.Boolean}
          />
        );
      case FieldType.Date:
        return (
          <TextArea
            name={field.name} type={FieldType.Date}
          />
        );
      case FieldType.Time:
        return (
          <InputBox
            name={field.name} type={FieldType.Time}
          />
        );
      case FieldType.ZonedDateTime:
        return (
          <InputBox
            name={field.name} type={FieldType.ZonedDateTime}
          />
        );
      case FieldType.File:
        return (
          <InputBox
            name={field.name} type={FieldType.File}
          />
        );
      case FieldType.List:
        return (
          <InputBox
            name={field.name} type={FieldType.List}
          />
        );
      case FieldType.Object:
        return (
          <FieldInput
            name={field.name} type={FieldType.Object}
            />
        );
    }
  }
}
