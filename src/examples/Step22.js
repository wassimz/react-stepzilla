'use strict';

import React, { Component, PropTypes } from "react";
import validation from "react-validation-mixin";
import strategy from "joi-validation-strategy";
import Joi from "joi";

class Step22 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };

        this.validatorTypes = {
            email: Joi.string().email(),
        };
    }

    getValidatorData = () => ({
        email: this.refs.email.value,
    });

    isValidated = () => {
        const isDataValid = this.props.isValid();

        return isDataValid;
    };

    onChange = (e) => {
        const state = {};

        state[e.target.id] = { value: e.target.value };
        this.setState(state);
    };

    renderHelpText = (message, id) => (<div key={id}><span>{message}</span></div>);

    render() {
        // explicit class assigning based on validation
        let notValidClasses = {};
        notValidClasses.emailCls = this.props.isValid('email') ?
            'no-error col-md-8' : 'has-error col-md-8';

        return (
            <div className="step step2-2">
                <div className="row">
                    <form id="Form" className="form-horizontal">
                        <div className="form-group">
                            <label className="col-md-12 control-label">
                                <h1>Step 2: Enter your Details</h1>
                            </label>
                        </div>
                        <div className="form-group col-md-12">
                            <label className="control-label col-md-4">
                                Email
                            </label>
                            <div className={notValidClasses.emailCls}>
                                <input
                                    ref="email"
                                    autoComplete="off"
                                    type="email"
                                    placeholder="john.smith@example.com"
                                    className="form-control"
                                    defaultValue={this.state.email}
                                    required
                                    onBlur={this.props.handleValidation('email')}
                                    onChange={this.onChange}
                                />
                            </div>
                            {this.props.getValidationMessages('email').map(this.renderHelpText)}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

Step22.propTypes = {
    errors: PropTypes.object,
    validate: PropTypes.func,
    isValid: PropTypes.func,
    handleValidation: PropTypes.func,
    getValidationMessages: PropTypes.func,
    clearValidations: PropTypes.func,
    getStore: PropTypes.func,
    updateStore: PropTypes.func,
};

export default validation(strategy)(Step22);

