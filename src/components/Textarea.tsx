import { h, Component } from 'preact';

interface TextareaProps {
    label: string, 
    name: string,
}

interface TextareState {
    name: string,
}

export default class Textarea extends Component<TextareaProps, TextareState> {

    constructor(props : TextareaProps) {
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
            <span> { this.props.label } : </span>
            <textarea placeholder="textarea" value={this.state.name} onChange={ e => this.handleOnChange(e)} />
            <div>
                Value Display { this.state.name }!
            </div>
          </div>
        );
    }
}