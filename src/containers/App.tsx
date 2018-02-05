import { h, Component } from 'preact';
import { Template } from 'document-template/src/template/index'
import ComponentManager from '../utils/ComponentManager'
import { FieldType } from 'document-template/src/model/field';

interface AppProps {
  template?: Template, 
}

interface AppState {
  template: Template,
}

export default class App extends Component<AppProps, {}> {

  constructor(props : AppProps) {
    super(props);

    this.state = {
      template: this.props.template,
    };
  }

  generateForm = (template: Template | undefined) : JSX.Element => {

    let fregment1 = ComponentManager.getComponentByKey(FieldType.String);
    let fregment2 = ComponentManager.getComponentByKey(FieldType.Boolean);
    let fregment3 = ComponentManager.getComponentByKey(FieldType.Date);

    return (
      <div>
          {fregment1}
          <br />
          {fregment2}
          <br />
          {fregment3}
      </div>
    );
  }

  public render(): JSX.Element {
    return this.generateForm(this.props.template);
  }
}
