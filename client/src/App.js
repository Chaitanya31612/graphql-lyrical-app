import './App.css'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";

import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

// fixed rerendering issue
// import { createBrowserHistory } from "history";
// export const history = createBrowserHistory({forceRefresh:true});

// ApolloClient will be interacting with the graphql backend and store locally data and it is framework
// independent whereas ApolloProvider provides integration bw react and graphql backend
// it is assumed by the ApolloClient that the endpoint for graphql is at /graphql endpoint
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  // dataIdFromObject: o => o.id
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
        <Switch>
          <Route exact path="/" component={SongList} />
          <Route exact path="/songs/new" component={SongCreate} />
          <Route exact path={'/songs/:id'} component={SongDetail} />
        </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
