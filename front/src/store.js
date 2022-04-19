import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


//Reducers
import dataReducer from './reducers/dataReducer'
import highlightReducer from './reducers/highlightReducer'
import assignReducer from './reducers/assignReducer'
import sendReducer from './reducers/sendReducer'
import readyToSendReducer from './reducers/readyToSendReducer'
import hubspotReducer from './reducers/hubspotReducer'
import dealIdReducer from './reducers/dealIdReducer'
import responseTargetReducer from './reducers/responseTargetReducer'
import userMessageReducer from './reducers/userMessageReducer'
import oneMessageReducer from './reducers/oneMessageReducer'


const reducer = combineReducers({
  data: dataReducer,
  highlightWord: highlightReducer,
  assignedWords: assignReducer,
  sendStatus: sendReducer,
  readyToSend: readyToSendReducer,
  hubspotDeals: hubspotReducer,
  id: dealIdReducer,
  responseTarget: responseTargetReducer,
  userMessage: userMessageReducer,
  oneMessage: oneMessageReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store