import { h, Component } from 'preact';

interface InputBoxProps {
    name: string
}

interface InputBoxState {
    name: string
}

export default class InputBox extends Component<InputBoxProps, InputBoxState> {

    constructor(props : InputBoxProps) {
        super(props);
  
        this.state = {
            name: this.props.name,
        };
    }

    public static defaultProps = {
        name : "defaut value",
    }

    public handleOnChange(event: any) : void {
        this.setState({ name: event.target.value });
    }

    public render(): JSX.Element {
        return (
          <div>
            <span> Input Box Label : </span>
            <input placeholder="input box" value={this.state.name} onChange={ e => this.handleOnChange(e)} />
            <div>
                Value Display { this.state.name }!
            </div>
          </div>
        );
    }
}