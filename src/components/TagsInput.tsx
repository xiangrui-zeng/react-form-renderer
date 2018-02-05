import { h, Component } from 'preact';

interface TagsInputProps {
    label: string, 
    name: string,
}

interface TagsInputState {
    name: string,
}

export default class TagsInput extends Component<TagsInputProps, TagsInputState> {

    constructor(props : TagsInputProps) {
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
            <input placeholder="Tags Input" value={this.state.name} onChange={ e => this.handleOnChange(e)} />
            <div>
                Value Display { this.state.name }!
            </div>
          </div>
        );
    }
}