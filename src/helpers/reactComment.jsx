import React, {Component} from 'react';
import PropTypes from "prop-types";

class ReactComment extends Component {
    static propTypes = {
        text: PropTypes.string
    };

    render() {
        const {text} = this.props;

        return <div style={{display: "none"}} className="react-comment" dangerouslySetInnerHTML={{__html: `<!-- ${text} -->`}}/>;
    }
}

export default ReactComment;