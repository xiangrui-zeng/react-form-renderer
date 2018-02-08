import { h, Component } from 'preact';

interface SubmitButtonProps {
    name?: string,
}

export default class SubmitButton extends Component<SubmitButtonProps, {}> {

    constructor(props : SubmitButtonProps) {
        super(props);

    }

    public static defaultProps = {
        inputValue : "defaut value",
    }

    public handleSubmit(event: any) : void {

    }

    public render(): JSX.Element {
        return (
          <div>
            <input type="submit" placeholder="submit" onClick={this.handleSubmit.bind(this)} />
          </div>
        );
    }
}