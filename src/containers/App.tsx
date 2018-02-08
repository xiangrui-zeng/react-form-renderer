import { h, Component } from 'preact';
import { Template, create } from 'document-template/src/template/index';
import { FieldType, FieldMap, Field } from 'document-template/src/model/field';
import SubmitButton from '../components/SubmitButton';
import { DataValue } from 'document-template/src/data';
import InputBox from '../components/InputBox';
import TextArea from '../components/Textarea';
import TagsInput from '../components/TagsInput';
import * as update from 'immutability-helper';

interface AppProps {
  template: Template;
}

interface AppState {
  modelData: DataValue;
}

export default class App extends Component<AppProps, AppState> {

  public constructor(props: AppProps) {
    super(props);

    this.state = {
      modelData: this.props.template.createObject(),
    };

  }

  public handleChange = (event: any) => {
    const newModelData = update(this.state.modelData, {
      [event.target.name]: { $set: event.target.value }
    });

    this.setState({ modelData: newModelData });
  }

  public handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(this.state);
    alert(JSON.stringify(this.state.modelData));
  }

  public generateForm = (template: Template, dateValue: DataValue): JSX.Element => {
    const componentList = this.getAllComponents(template, dateValue, this.getMapedComponent);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {componentList}
          <SubmitButton />
        </form>
      </div>
    );
  }

  public getMapedComponent = (field: Field, state: any): JSX.Element => {
    switch (field.type) {
      case FieldType.String:
        return (
          <InputBox
            name={field.name}
            value={state[field.name]}
            onChange={this.handleChange}
            label="Input Box Label"
          />
        );
      case FieldType.Number:
        return (
          <InputBox
            name={field.name}
            value={state[field.name]}
            onChange={this.handleChange}
            label="Input Box Label"
          />
        );
      case FieldType.Boolean:
        return (
          <TextArea
            name={field.name}
            value={state[field.name]}
            onChange={this.handleChange}
            label="TextArea Box Label"
          />
        );
      case FieldType.Date:
        return (
          <TagsInput
            name={field.name}
            value={state[field.name]}
            onChange={this.handleChange}
            label="TagsInput Box Label"
          />
        );
      case FieldType.Time:
        return (
          <InputBox
            name={field.name}
            value={state[field.name]}
            onChange={this.handleChange}
            label="Input Box Label"
          />
        );
      case FieldType.ZonedDateTime:
        return (
          <InputBox
            name={field.name}
            value={state[field.name]}
            onChange={this.handleChange}
            label="Input Box Label"
          />
        );
      case FieldType.File:
        return (
          <InputBox
            name={field.name}
            value={state[field.name]}
            onChange={this.handleChange}
            label="Input Box Label"
          />
        );
      case FieldType.List:
        return (
          <InputBox
            name={field.name}
            value={state[field.name]}
            onChange={this.handleChange}
            label="Input Box Label"
          />
        );
      case FieldType.Object:
        return (
          <InputBox
            name={field.name}
            value={state[field.name]}
            onChange={this.handleChange}
            label="Input Box Label"
          />
        );
    }
  }

  public getAllComponents = (
    template: Template,
    dateValue: DataValue,
    func: (field: Field, state: any) => JSX.Element
  ) => {
    const componentList: JSX.Element[] = Object.keys(template.model).map(function (modelIndex) {
      const model = template.model[modelIndex];
      return func(model, dateValue);
    });

    return componentList;
  }

  public render(): JSX.Element {
    return this.generateForm(this.props.template, this.state.modelData);
  }
}
