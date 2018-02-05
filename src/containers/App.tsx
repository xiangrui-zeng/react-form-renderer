import { h, Component } from 'preact';
import { Template } from 'document-template/src/template/index'
import ComponentManager from '../utils/ComponentManager'
import { FieldType } from 'document-template/src/model/field';

interface AppProps {
  name?: string, 
}

interface AppState {
  template: Template,
}

export default class App extends Component<AppProps, {}> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      template: Template,
    };
  }
  template: Template;

  generateForm = (template: Template) : JSX.Element => {
    return (
      <div>
          {ComponentManager.getComponentByKey(FieldType.String)}
          <br />
          {ComponentManager.getComponentByKey(FieldType.Boolean)}
          <br />
          {ComponentManager.getComponentByKey(FieldType.Date)}
      </div>
    );
  }

  public render(): JSX.Element {
    return this.generateForm(this.template);
  }
}
