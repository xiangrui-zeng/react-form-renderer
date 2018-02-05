import { h, Component } from 'preact';
import InputBox from '../components/InputBox'
import TextArea from '../components/Textarea'
import TagsInput from '../components/TagsInput'

export default class App extends Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <InputBox name = 'test' label="Input Box Label"/>
        <TextArea name = 'test' label="TextArea Box Label"/>
        <TagsInput name = 'test' label="TagsInput Box Label"/>
      </div>
    );
  }
}
