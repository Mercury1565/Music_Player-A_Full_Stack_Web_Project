import {useSelector, useDispatch} from 'react-redux'
import { increment, decrement, incrementByAmount, incrementByMultipleAmounts } from './redux/counter'

function App() {
  const { count } = useSelector(state => state.counter)
  const dispatch = useDispatch();

  return (
    <>
    <p>Counter {count}</p>
    <button onClick={() => dispatch(incrementByAmount(5))}>Inc by 5</button>
    <button onClick={() => dispatch(incrementByMultipleAmounts({ amounts: [1, 2, 3] }))}>Increment by multipe Amounts</button>
    <button onClick={() => dispatch(increment())}>+</button>
    <button onClick={() => dispatch(decrement())}>-</button>
    </>
  )
}

export default App
