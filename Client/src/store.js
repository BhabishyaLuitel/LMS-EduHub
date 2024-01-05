// Importing necessary dependencies and libraries
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import axios from 'axios'

// Importing individual reducer functions
import authReducer, { logout } from './reducers/authReducer'
import courseReducer from './reducers/courseReducer'
import moduleReducer from './reducers/moduleReducer'
import articlesReducer from './reducers/articlesReducer'
import articlePage from './reducers/articlePageReducer'
import notificationsReducer from './reducers/notificationsReducer'
import lectureReducer from './reducers/lectureReducer'
import lectureCommentsReducer from './reducers/lectureCommentsReducer'
import discussionReducer from './reducers/discussionReducer'
import announcementsReducer from './reducers/announcementsReducer'
import examReducer from './reducers/examReducer'
import assessmentCreationReducer from './reducers/assessmentCreationReducer'
import assessmentTakingReducer from './reducers/assessmentTakingReducer'
import submissionsReducer from './reducers/submissionsReducer'
import gradebookReducer from './reducers/gradebookReducer'
import summaryGradebookReducer from './reducers/summaryGradebookReducer'
import participantsReducer from './reducers/participantsReducer'
import assignmentReducer from './reducers/assignmentReducer'
import calendarReducer from './reducers/calendarReducer'
import deadlinesReducer from './reducers/deadlinesReducer'
import courseSettingsReducer from './reducers/courseSettingsReducer'
import achievementsReducer from './reducers/achievementsReducer'

// Configuration for persisting the state
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'auth',
    'assessmentCreation',
    'assessmentTaking',
    'submissions',
    'courseParticipants',
    'summaryGradebook',
    'courseGradebook',
    'modules'
  ]
}

// Combining the individual reducers into a single reducer using combineReducers
const reducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  modules: moduleReducer,
  articles: articlesReducer,
  articlePage: articlePage,
  notifications: notificationsReducer,
  lectures: lectureReducer,
  lectureComments: lectureCommentsReducer,
  discussions: discussionReducer,
  announcements: announcementsReducer,
  exams: examReducer,
  assessmentCreation: assessmentCreationReducer,
  assessmentTaking: assessmentTakingReducer,
  submissions: submissionsReducer,
  courseGradebook: gradebookReducer,
  summaryGradebook: summaryGradebookReducer,
  courseParticipants: participantsReducer,
  assignments: assignmentReducer,
  calendar: calendarReducer,
  deadlines: deadlinesReducer,
  courseSettings: courseSettingsReducer,
  achievements: achievementsReducer
});

// Creating the persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer)

// Creating the Redux store with the persisted reducer and necessary middleware
let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
)

// Creating the persistor for persisting the Redux store
let persistor = persistStore(store)

// Intercepting Axios responses to handle unauthorized errors
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      store.dispatch(logout())
    } else {
      return Promise.reject(error)
    }
  }
)

// Exporting the Redux store and persistor
export { store, persistor }
