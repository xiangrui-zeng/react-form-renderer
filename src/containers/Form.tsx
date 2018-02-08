import { h, Component } from 'preact';  

export class Form extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    static contextTypes = {
        formRender: Object,
    };

    render () {
        return (
            <div>
                <form onSubmit={this.context.formRender.handleSubmit} {...this.props} />
            </div>
        );
    }
}