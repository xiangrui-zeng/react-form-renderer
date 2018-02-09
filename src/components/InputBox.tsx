import { h, Component } from 'preact';

interface InputBoxProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
}

interface InputBoxState {
  inputValue: string;
}

export default class InputBox extends Component<InputBoxProps, InputBoxState> {

  public constructor(props: InputBoxProps) {
    super(props);

    this.state = {
      inputValue: this.props.value,
    };
  }

  public static defaultProps = {
    inputValue: 'defaut value',
  };

  public handleOnChange(event: any): void {
    this.props.onChange(event);
    this.setState({ inputValue: event.target.value });
  }

  public render(): JSX.Element {
    return (
      <div>
        <span> {this.props.label} : </span>
        <input placeholder="input box" name={this.props.name} value={this.state.inputValue} onChange={e => this.handleOnChange(e)} />
        <div>
          Value Display {this.state.inputValue}!
            </div>
      </div>
    );
  }
}
