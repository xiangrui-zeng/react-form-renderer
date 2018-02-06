import { h, Component } from 'preact';

interface TagsInputProps {
    label: string, 
    name: string,
    value: string,
}

interface TagsInputState {
    inputValue: string,
}

export default class TagsInput extends Component<TagsInputProps, TagsInputState> {

    constructor(props : TagsInputProps) {
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
            <input placeholder="Tags Input" value={this.state.inputValue} onChange={ e => this.handleOnChange(e)} />
            <div>
                Value Display { this.state.inputValue }!
            </div>
          </div>
        );
    }
}