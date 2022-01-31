export function validateLogin(values) {
    let errors = {};
    if (!/\S+@\S+\.\S+/.test(values.emailLogin)) {
        errors.email = 'Email address is invalid';
    }
    console.log(values)
    if (values.passwordLogin && values.passwordLogin.length < 6) {
        errors.password = 'Password must be 6 or more characters';
    }
    return errors;
};

export function validateLoginSubmit(values) {
    let errors = {};
    if (!values.emailLogin) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.emailLogin)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.passwordLogin) {
        errors.password = 'Password is required';
    } else if (values.passwordLogin.length < 6) {
        errors.password = 'Password must be 6 or more characters';
    }
    return errors;
};

export function validateRegister(values) {
    let errors = {};
    if (!values.emailRegister) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.emailRegister)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.passwordRegister) {
        errors.password = 'Password is required';
    } else if (values.passwordRegister.length < 6) {
        errors.password = 'Password must be 6 or more characters';
    }
    if (!values.username) {
        errors.username = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.username)) {
        errors.username = 'Email address is invalid';
    }
    return errors;
};