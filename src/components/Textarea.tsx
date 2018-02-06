import { h, Component } from 'preact';

interface TextareaProps {
    label: string, 
    name: string,
    value: string,
}

interface TextareState {
    inputValue: string,
}

export default class Textarea extends Component<TextareaProps, TextareState> {

    constructor(props : TextareaProps) {
        super(props);
  
        this.state = {
            inputValue: this.props.value,
        };
    }

    public static defaultProps = {
        name : "defaut value",
    }

    public handleOnChange(event: any) : void {
        this.setState({ inputValue: event.target.value });
    }

    public render(): JSX.Element {
        return (
          <div>
            <span> { this.props.label } : </span>
            <textarea placeholder="textarea" value={this.state.inputValue} onChange={ e => this.handleOnChange(e)} />
            <div>
                Value Display { this.state.inputValue }!
            </div>
          </div>
        );
    }
}