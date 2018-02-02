import { h, Component } from 'preact';
import InputBox from '../components/input-box'

interface ComponentProps {
  name: string
}

interface ComponentState {
  name: string
}

export default class App extends Component<ComponentProps, ComponentState> {

  constructor(props : ComponentProps) {
    super(props);

    this.state = {
        name: this.props.name,
    };
  }  

  public render(): JSX.Element {
    return (
      <div>
        <InputBox name = 'test' />
      </div>
    );
  }
}
