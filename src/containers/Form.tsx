import { h, Component } from 'preact';

export const Form = (props, context) => (
    <form onSubmit={context.formRender.handleSubmit} {...props} />
  );
  
Form.contextTypes = {
    formRender: Object,
};