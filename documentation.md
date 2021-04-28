# Documentation
I have chosen Vue as the frontend framework with Quasar Framework on top of it.<br>
<https://next.quasar.dev/>
<br>
Quasar Framework is based on Vue and provides a CLI, utilities and component library for Vue.<br>
You can also generate web application, mobile application and desktop application with the same code base using Quasar CLI.
The motivation for using Quasar is that it is easy, fun and fast to build applications with.<br><br>
The application uses the latest version of Vue which is Vue 3 together with the Composition API.<br>
From the Vue eco-system I have also used Vue-Router for navigation and VueX for state management.<br>
For making API calls I use Axios package instead of the JavaScript Fetch API.
<br><br>
The application is in the folder called **truck-driver-job-matching**.<br>
Unfortunetly to run the app you need to install Quasar CLI first by running the command in terminal: <br>
`npm install -g @quasar/cli`
<br>
Once navigated in the project folder you start the app by running:
<br>
`quasar dev`
<br>
You also need the json-server backend running.

## Design
The design and workflow should be obvious and intuitive.
The app has two pages Job Search Page where you can select a driver and the jobs that the driver meets the criteria are listed on the right. If you click on a job, you will come to the Job Details Page which shows detailed information about the job and where the driver can make an application.

## Note
Too much emphasis hasen't been put to make the app completely responsive

