import React from 'react'
import { MdSend } from "react-icons/md";

 const ExpenseForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="expense">charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="e.g. rent"
            value={props.charge}
            onChange={props.handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="e.g. 100"
            value={props.amount}
            onChange={props.handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn">
              {props.edit ? "edit" : "submit"}
        <MdSend className="btn-icon" />
      </button>
    </form>
    )
}

export default ExpenseForm;