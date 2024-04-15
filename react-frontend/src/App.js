import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import StudentListComponent from './components/StudentListComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateStudentComponent from './components/CreateStudentComponent';
import CreateGroupComponent from './components/CreateGroupComponent';
import GroupListComponent from './components/GroupListComponent';
import LogInComponent from './components/LogInComponent';
import LogoutComponent from './components/LogoutComponent';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import MenuComponent from './components/MenuComponent';
import JournalListComponent from './components/JournalListComponent';
import JournalDetailsComponent from './components/JournalDetailsComponent';
import CreateJournalComponent from './components/CreateJournalComponent';
import CreateUserComponent from './components/CreateUserComponent';
import UsersListComponent from './components/UsersListComponent';
import LessonLibraryListComponent from './components/LessonLibraryListComponent';
import StatisticComponent from './components/StatisticComponent';

function App() {
  return (
    <div>
        <Router>
          <HeaderComponent/>
          <div className="container">
            <Switch>
              <Route path = "/" exact component={MenuComponent}></Route>
              <AuthenticatedRoute path = "/students" exact component={StudentListComponent}/>
              <AuthenticatedRoute path = "/groups" exact component={GroupListComponent}/>
              <AuthenticatedRoute path = "/journals/:id" exact component={JournalDetailsComponent}/>
              <AuthenticatedRoute path = "/journals" exact component={JournalListComponent}/>
              <AuthenticatedRoute path = "/add-student/:id" component={CreateStudentComponent}/>
              <AuthenticatedRoute path = "/add-group/:id" component={CreateGroupComponent}/>
              <AuthenticatedRoute path = "/journals/add-journal/:id" component={CreateJournalComponent}/>
              <AuthenticatedRoute path = "/user-list/" component={UsersListComponent}/>
              <AuthenticatedRoute path = "/add-user/:id" component={CreateUserComponent}/>
              <AuthenticatedRoute path = "/lessonLibrary" component={LessonLibraryListComponent}/>
              <AuthenticatedRoute path = "/statistic" component={StatisticComponent}/>
              <Route path = "/login" exact component={LogInComponent}/>
              <AuthenticatedRoute path = "/logout" exact component={LogoutComponent} />
            </Switch>
          </div>
          <FooterComponent/>
        </Router>
    </div>
  );
}

export default App;
