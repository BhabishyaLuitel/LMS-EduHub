// Importing required modules
const express = require('express')
const db = require('./config/database')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')

// Creating an instance of Express app
const app = express()

// Importing route handlers
const user = require('./routes/user')
const assignment = require('./routes/Assignment')
const article = require('./routes/article')
const course = require('./routes/course')
const courseModule = require('./routes/courseModule')
const courseModuleItem = require('./routes/courseModuleItem')
const discussionsRouter = require('./routes/Discussions')
const cheatingDetection = require('./routes/cheatingDetection')
const notification = require('./routes/notification')
const lectureRouter = require('./routes/lecture')
const AnnouncementsRouter = require('./routes/announcement')
const assessmentRouter = require('./routes/assessment')
const SubmissionRouter = require('./routes/submissions')
const gradeBookRouter = require('./routes/gradeBook')
const enrollmentRouter = require('./routes/enrollment')
const deadlineRouter = require('./routes/deadlines')
const achievementsRouter = require('./routes/achievementsRouter')

// Importing middleware
const auth = require('./middleware/auth')

// Importing file upload module
const fileUpload = require('express-fileupload')

// Configuring file upload options
app.use(
  fileUpload({
    debug: true,
    createParentPath: true,
    safeFileNames: true,
    preserveExtension: 4
  })
)

// Connecting to MongoDB
mongoose
  .connect(process.env.MONGODB_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// Setting up the public directory path
const publicDirectoryPath = path.join(__dirname, './view')

// Serving static files from the public directory
app.use(express.static(publicDirectoryPath))

// Serving course files
app.use('/course-file', express.static('course-file'))

// Enabling CORS
app.use(cors())

// Parsing JSON request bodies
app.use(express.json())

// Routing requests to appropriate route handlers
app.use('/users', user)
app.use('/discussions', discussionsRouter)
app.use('/announcements', AnnouncementsRouter)
app.use('/courses', course)
app.use('/assignment', assignment)
app.use('/cheatingDetection', cheatingDetection)
app.use('/article', article)
app.use('/notification', notification)
app.use('/deadlines', deadlineRouter)
app.use('/:courseId/', gradeBookRouter)
app.use('/:courseId/assessments', assessmentRouter)
app.use('/:courseId/enrollments', enrollmentRouter)
app.use('/:courseId/assessments/:assessmentId/submissions', SubmissionRouter)
app.use('/courses/:courseId/modules', courseModule)
app.use('/courses/:courseId/modules/:moduleId/module-item', courseModuleItem)
app.use('/courses/:courseId/lectures', lectureRouter)
app.use('/achievements', achievementsRouter)

// Starting the server
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('app is on Port ' + port)
})
