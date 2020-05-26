import React from 'react'
import ExpenseItem from './ExpenseItem'
import {MdDelete} from 'react-icons';

const ExpenseList = ({expenses, handleClear, handleEdit, handleDelete}) => {
    return (
        <>
            <ul className="list">
                {expenses.map((expense) => {
                        return <ExpenseItem key={expense.id} expense={expense} handleEdit={handleEdit} handleDelete={handleDelete}  />
                    })}
            </ul>
            {expenses.length > 0 && <button className="btn" onClick={handleClear}>Clear</button>}
        </>
    )
}

export default ExpenseList;
