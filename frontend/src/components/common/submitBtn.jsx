import React from 'react'

function SubmitButton({ classes, isSubmitting, onclick, children }) {
    const noop = () => null

    return (
        <button
        className={classes || 'submit'}
        disabled={isSubmitting}
        onClick={onclick || noop}
        type="submit">
            {isSubmitting ? "Loading..." : children }
        </button>
    )
}

export default SubmitButton
