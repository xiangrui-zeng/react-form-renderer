import { h, Component } from 'preact';
import { FormRender, FormRenderProps } from '../components/FormRender';
import { Field, FieldProps } from '../components/Field'
import { Form } from '../components/Form'
import * as update from 'immutability-helper';
import { Template, create } from 'document-template/src/template/index'
import { FieldType, FieldMap, Field as FieldM } from 'document-template/src/model/field';
import { DataValue } from 'document-template/src/data'


interface EditFromProps {
    template: Template,
  }
  
  interface EditFromState {
    values: DataValue,
  }
  
  export default class EditForm extends Component<EditFromProps, EditFromState> {
  
    constructor(props: EditFromProps) {
      super(props);

      this.state = {
          values: this.props.template.createObject(),
      }
  
    }
      
    public render(): JSX.Element {
        let componentList = this.getAllField(this.props.template, this.state.values, this.getMapedComponent);
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


    getAllField = (template: Template, values: DataValue, func:(field: FieldM, state: any) => JSX.Element) => {
        
        let fieldList: Array<JSX.Element> =  Object.keys(template.model).map(function(modelIndex){
            let model = template.model[modelIndex];
            return func(model, values);
        });

        return fieldList;
    }

    getMapedComponent =  (field: FieldM, values: any): JSX.Element => {
        switch(field.type){
            case FieldType.String:
                return (
                    <Field
                        name={field.name}
                        render={({ field, form }: FieldProps<DataValue>) => (
                            <div>
                                <input placeholder={field.name} {...field} />
                            </div>
                        )}
                    />
                );
            case FieldType.Number:
                return (
                    <Field
                        name={field.name}
                        render={({ field, form }: FieldProps<DataValue>) => (
                            <div>
                                <input placeholder={field.name} {...field} />
                            </div>
                        )}
                    />
                );
            case FieldType.Boolean:
                return (
                    <Field
                        name={field.name}
                        render={({ field, form }: FieldProps<DataValue>) => (
                            <div>
                                <input placeholder={field.name} {...field} />
                            </div>
                        )}
                    />
                );
            case FieldType.Date:
                return (
                    <Field
                        name={field.name}
                        render={({ field, form }: FieldProps<DataValue>) => (
                            <div>
                                <input placeholder={field.name} {...field} />
                            </div>
                        )}
                    />
                );
            case FieldType.Time:
                return (
                    <Field
                        name={field.name}
                        render={({ field, form }: FieldProps<DataValue>) => (
                            <div>
                                <input placeholder={field.name} {...field} />
                            </div>
                        )}
                    />
                );
            case FieldType.ZonedDateTime:
                return (
                    <Field
                        name={field.name}
                        render={({ field, form }: FieldProps<DataValue>) => (
                            <div>
                                <input placeholder={field.name} {...field} />
                            </div>
                        )}
                    />
                );
            case FieldType.File:
                return (
                    <Field
                        name={field.name}
                        render={({ field, form }: FieldProps<DataValue>) => (
                            <div>
                                <input placeholder={field.name} {...field} />
                            </div>
                        )}
                    />
                );
            case FieldType.List:
                return (
                    <Field
                        name={field.name}
                        render={({ field, form }: FieldProps<DataValue>) => (
                            <div>
                                <input placeholder={field.name} {...field} />
                            </div>
                        )}
                    />
                );
            case FieldType.Object:
                return (
                    <Field
                        name={field.name}
                        render={({ field, form }: FieldProps<DataValue>) => (
                            <div>
                                <input placeholder={field.name} {...field} />
                            </div>
                        )}
                    />
                );
        }
    }
  }