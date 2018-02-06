import { h, Component } from 'preact';

interface InputBoxProps {
    label: string, 
    name: string,
    value: string,
}

interface InputBoxState {
    inputValue: string,
}

export default class InputBox extends Component<InputBoxProps, InputBoxState> {

    constructor(props : InputBoxProps) {
        super(props);
  
        this.state = {
            inputValue: this.props.value,
        };
    }

    static contextTypes = {
        app: Object,
      };

    public static defaultProps = {
        inputValue : "defaut value",
    }

    public handleOnChange(event: any) : void {
        const { handleChange } = this.context.app;
        handleChange(event);
        this.setState({ inputValue: event.target.value });
    }

    public render(): JSX.Element {
        return (
          <div>
            <span> { this.props.label } : </span>
            <input placeholder="input box" value={this.state.inputValue} onChange={ e => this.handleOnChange(e)} />
            <div>
                Value Display { this.state.inputValue }!
            </div>
          </div>
        );
    }
}