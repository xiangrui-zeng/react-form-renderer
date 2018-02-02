import { h, Component } from 'preact';

interface TagsInputProps {
    focusedClassName: string,
    addKeys: (string|number)[],
    addOnBlur: boolean,
    addOnPaste: boolean,
    currentValue: string,
    inputValue: string,
    inputProps: object,
    onChange: Function,
    onChangeInput: Function,
    removeKeys: (string|number)[],
    tagProps: object,
    onlyUnique: boolean,
    value: (string)[],
    maxTags: number,
    validationRegex: RegExp,
    disabled: boolean,
    tagDisplayProp: string,
    preventSubmit: boolean,
    className: string,
}

interface TagsInputState {
    tag: string,
    isFocused : boolean,
}

export default class TagsInput extends Component<TagsInputProps, TagsInputState> {

    constructor(props : TagsInputProps) {
        super(props);
  
        this.state = {
            tag: '', 
            isFocused: false,
        };
    }

    static defaultProps = {
        className: 'react-tagsinput',
        focusedClassName: 'react-tagsinput--focused',
        addKeys: [9, 13],
        addOnBlur: false,
        addOnPaste: false,
        inputProps: {},
        removeKeys: [8],
        tagProps: {className: 'react-tagsinput-tag', classNameRemove: 'react-tagsinput-remove'},
        onlyUnique: false,
        maxTags: -1,
        validationRegex: /.*/,
        disabled: false,
        tagDisplayProp: null,
        preventSubmit: true
    }

    public render(): JSX.Element {
        let {
            value,
            onChange,
            tagProps,
            addKeys,
            removeKeys,
            className,
            focusedClassName,
            addOnBlur,
            addOnPaste,
            inputProps,
            onlyUnique,
            maxTags,
            validationRegex,
            disabled,
            tagDisplayProp,
            inputValue,
            onChangeInput,
            ...other
        } = this.props

        let {isFocused} = this.state;

        return (
            <div>
            </div>
        );
    }
}