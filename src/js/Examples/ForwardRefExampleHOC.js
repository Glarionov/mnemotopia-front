import React from "react";

function logProps(Component) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps) {
            console.log('old props:', prevProps);
            console.log('new props:', this.props);
        }

        render() {
            const {forwardedRef, ...rest} = this.props;


            // Передадим пользовательское свойство "forwardedRef" как ссылку ref
            return <Component ref={forwardedRef} {...rest} />;
        }
    }

    // Обратите внимание: второй параметр "ref" предоставлен React.forwardRef.
    // Мы можем передать его дальше в LogProps как обычное свойство, например "forwardedRef"
    // Затем ссылка может быть присоединена к Component.
    return React.forwardRef((props, ref) => {
        return <LogProps {...props} forwardedRef={ref} />;
    });
}

export default logProps;