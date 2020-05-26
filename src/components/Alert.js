import React from 'react'

 const Alert = ({alert}) => {
    return (
        <div>
            <div className={`alert alert-${alert.type}`}>{alert.text}</div>;
        </div>
    )
}
export default Alert;
