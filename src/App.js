import React, {useState, useEffect} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from "uuid";
import { MdLocalFlorist } from 'react-icons/md';

// const initialExpenses = [
//         {id : uuid(), charge:"rent", amount:1600 },
//         {id : uuid(), charge:"Car EMI", amount:500 },
//         {id : uuid(), charge:"Credit Card", amount:200 },
// ];
let local = localStorage.getItem('expenses');
const initialExpenses = local ? JSON.parse(local): [];
//useState
//[actual value of the state, function for control] = useState(default State)
function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({show:false, type:'', text:''});
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])
  const handleAmount = e => {
        setAmount(e.target.value);
  }
 
  const handleCharge = e => {
    setCharge(e.target.value);
  }
  
  const handleAlert = (type, text) => {
    setAlert({show:true, type, text});
    setTimeout(() => {
      setAlert({show:false})
    }, 3000);
  }
  
  const handleClear = e => {
    setExpenses([]);
  }

  const handleEdit = (id) => {
    setEdit(true);
    let tempExpense = expenses.find(item => item.id === id);
    if(tempExpense.id){
      setCharge(tempExpense.charge);
      setAmount(tempExpense.amount);
      setId(tempExpense.id)
    }
    
  }

  const handleDelete = (id) => {
    let tempExpense = expenses.filter(item => item.id !== id);
    setExpenses(tempExpense); 
    handleAlert('danger', 'Item deleted');
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(charge  !== '' && amount > 0){
      if(edit){
        const tempExpense = expenses.map(
          item => {
            return item.id === id ? {...item,charge, amount} : item;
          }); 
          setExpenses(tempExpense);
          setEdit(false);
          setId(0);
        }

      else{
        //charge has same propert and value so  we can us charge instead of charge:charge
          const singleExpense = {id:uuid(), charge, amount};
          setExpenses([...expenses, singleExpense]);
          //afer add empty the amount and charge 
          handleAlert('success', 'Item added');
        }
        setAmount('')
        setCharge('')
    }else{
        handleAlert('danger', 'Please fill them both');
    }
  }

  return (
    <>
    {alert.show && <Alert alert={alert} />}
     
     <h1>Budget Calculator</h1>
     <main className='App'>
     <ExpenseForm charge={charge} amount={amount} handleAmount={handleAmount} handleCharge={handleCharge}  handleSubmit={handleSubmit} edit={edit} />
     <ExpenseList expenses={expenses} handleClear={handleClear} handleEdit={handleEdit} handleDelete={handleDelete} />
     </main>
     <h1>
       Total  
       <span>
         $
         {
           //acc is total value
           //curr is current initial state
           //.reduce is like .each 
           //,0 for initial acc value
           expenses.reduce( (acc, curr) => {
             //curr.amount is string to add we need to parse it
              return acc += parseInt(curr.amount)
           },0)
         }
       </span>

     </h1>
    </>
  );
}

export default App;
