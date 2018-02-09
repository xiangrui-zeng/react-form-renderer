import { h, Component, PreactHTMLAttributes } from 'preact';

export class Form extends Component<PreactHTMLAttributes, {}> {

  public static contextTypes = {
    formRender: Object,
  };

  public constructor(props: PreactHTMLAttributes) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        <form onSubmit={this.context.formRender.handleSubmit} {...this.props} />
      </div>
    );
  }
}
