import styles from './Text.styl';

export default shareObject => {
    const React = shareObject.libraries.React;

    class Text extends React.Component {
        constructor(props) {
            super(props);

            this.isTextObj = typeof this.props.args.text === 'function';

            if (this.isTextObj) {
                this.state = { text: '' };
            } else {
                this.state = { text: this.props.args.text };
            }
        }

        componentWillMount() {
            if (this.isTextObj) {
                this.unmountFunc = this.props.args.text(this.changeText.bind(this));
            }
        }

        componentWillUnmount() {
            if (this.isTextObj && this.unmountFunc) {
                this.unmountFunc();
            }
        }

        changeText(text) {
            this.setState({ text });
        }

        render() {
            return (
                /* eslint-disable react/no-array-index-key */
                <div styleName="Text">
                    <div>
                        {this.state.text.split('\n').map((item, key) => {
                            return (
                                <span key={key}>
                                    {item}
                                    <br />
                                </span>
                            );
                        })}
                    </div>
                </div>
                /* eslint-enable react/no-array-index-key */
            );
        }
    }

    return shareObject.libraries.cssModules(Text, styles);
};
