class InfrastructureError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, InfrastructureError)
    }
}

export default InfrastructureError;
