import { h, Component } from 'preact';
import { Template, create } from 'document-template/src/template/index'
import ComponentManager from '../utils/ComponentManager'
import { FieldType, FieldMap } from 'document-template/src/model/field';
import SubmitButton from '../components/SubmitButton';
import { DataValue } from 'document-template/src/data'

interface AppProps {
  template: Template,
}

interface AppState {
  model: DataValue,
}

export default class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    
    this.state = {
      model : this.props.template.createObject(),
    };
  }

  static childContextTypes = {
    app: Object,
  };

  public handleChange(event: any) : void {
    console.log(event.target.value);
  }
  
  handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(event.target);
  }

  generateForm = (template: Template, dateValue: DataValue) : JSX.Element => {
    let componentList = this.getAllComponents(template, dateValue);
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            {componentList}
            <SubmitButton />
          </form>
      </div>
    );
  }

  getAllComponents = (template: Template, dateValue: DataValue): JSX.Element[] => {

    let componentList: Array<JSX.Element> =  Object.keys(template.model).map(function(modelIndex){
      let model = template.model[modelIndex];
      return ComponentManager.getMapedComponent(model, dateValue);
    });

    return componentList;
  }

  public render(): JSX.Element {
    return this.generateForm(this.props.template, this.state.model);
  }
}
