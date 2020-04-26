import React from "react";
import Header from "./Header";

class HeaderContainerAPI extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <Header {...this.props}/>
        );
    }
}
