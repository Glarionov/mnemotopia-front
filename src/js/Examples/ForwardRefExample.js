// EmailInput wraps an HTML `input` and adds some app-specific styling.
import React, {Component} from "react";

const EmailInput = React.forwardRef((props, ref) => (
    <input ref={ref} {...props} type="email" className="AppEmailInput" />
));

class ForwardRefExample extends Component {
    emailRef = React.createRef();

    render() {
        return (
            <div>
                <EmailInput ref={this.emailRef} />
                <button onClick={() => this.onClickButton()}>
                    Click me to focus email
                </button>
            </div>
        );
    }

    // `this.emailRef.current` points to the `input` component inside of EmailInput,
    // because EmailInput is forwarding its ref via the `React.forwardRef` callback.
    onClickButton() {
        this.emailRef.current.focus();
    }
}

export default ForwardRefExample;
