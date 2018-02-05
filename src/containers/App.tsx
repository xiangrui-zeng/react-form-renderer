import { h, Component } from 'preact';
import { Template, create } from 'document-template/src/template/index'
import ComponentManager from '../utils/ComponentManager'
import { FieldType, FieldMap } from 'document-template/src/model/field';

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
    let componentList = this.getAllComponents(template);
    return (
      <div>
          {componentList}
      </div>
    );
  }

  getAllComponents = (template: Template): JSX.Element[] => {
    let template1 = create({
      version: '20180201',
      model: [
        {
          name: 'entry1',
          type: 'string' as FieldType,
          rules: []
        },
        {
          name: 'entry2',
          type: 'boolean' as FieldType,
          rules: []
        },
        {
          name: 'list',
          type: 'date' as FieldType,
          rules: [],
          items: {
            name: 'listelement',
            type: 'object' as FieldType,
            rules: [],
            fields: [
              {
                name: 'listentry1',
                type: 'string' as FieldType,
                rules: []
              }
            ]
          }
        },
        {
          name: 'object',
          type: 'object' as FieldType,
          rules: [],
          fields: [
            {
              name: 'objectfield1',
              type: 'string' as FieldType,
              rules: []
            },
            {
              name: 'objectfield2',
              type: 'string' as FieldType,
              rules: []
            }
          ]
        }
      ],
      views: []
    });

    let componentList: Array<JSX.Element> =  Object.keys(template1.model).map(function(modelIndex){
      let model = template1.model[modelIndex];
      return ComponentManager.getComponentByKey(model.type);
    });

    return componentList;
  }

  public render(): JSX.Element {
    return this.generateForm(this.template);
  }
}
