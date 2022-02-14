import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


//Reducers
import dataReducer from './reducers/dataReducer'
import channelReducer from './reducers/channelReducer'
import highlightReducer from './reducers/highlightReducer'
import assignReducer from './reducers/assignReducer'
import categoriesReducer from './reducers/categoriesReducer'

const reducer = combineReducers({
  data: dataReducer,
  channel: channelReducer,
  highlightWord: highlightReducer,
  assignedWords: assignReducer,
  categories: categoriesReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store