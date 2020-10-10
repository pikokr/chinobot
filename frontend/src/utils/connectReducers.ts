import {ComponentType} from "react";
import {connect} from "react-redux";
import {updateSession} from "../actions/session";

const mapStateToProps = (state: any) => ({
    session: state.session,
    user: state.session.user,
    loggedIn: state.session.loggedIn,
})

const mapDispatchToProps = (dispatch: any) => ({
    updateSession: (data: any) => dispatch(updateSession(data)),
    setUser: (data: any) => dispatch(updateSession({user: data})),
})

export default (component: ComponentType) => connect(mapStateToProps, mapDispatchToProps)(component)
