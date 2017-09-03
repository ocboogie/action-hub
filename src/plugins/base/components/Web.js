import styles from './Web.styl';

export default shareObject => {
    const React = shareObject.libraries.React;

    class Web extends React.Component {
        render() {
            return (
                <div styleName="Web">
                    <webview src={this.props.args.url} />
                </div>
            );
        }
    }

    return shareObject.libraries.cssModules(Web, styles);
};
