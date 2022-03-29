import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


//Reducers
import dataReducer from './reducers/dataReducer'
import highlightReducer from './reducers/highlightReducer'
import assignReducer from './reducers/assignReducer'
import parameterReducer from './reducers/parameterReducer'
import sendReducer from './reducers/sendReducer'
import readyToSendReducer from './reducers/readyToSendReducer'

const reducer = combineReducers({
  data: dataReducer,
  highlightWord: highlightReducer,
  assignedWords: assignReducer,
  parameters: parameterReducer,
  sendStatus: sendReducer,
  readyToSend: readyToSendReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store