import { h, render } from 'preact';
import App from './containers/App';
import { Template, create } from 'document-template/src/template/index'
import { FieldType, FieldMap } from 'document-template/src/model/field';

let template = create({
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

let mountNode = document.getElementById('root') as Element;
mountNode = render(<App template={template}/>, mountNode, mountNode.lastElementChild || undefined);

if (process.env.NODE_ENV !== 'production') {
  require('preact/debug');
}
