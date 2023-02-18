import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./components/login";
import {Home} from "./components/home";
import {Navigation} from './components/navigations';
import {Logout} from './components/logout';
import { GroupList} from './components/grouplist';
import { HostList} from './components/hostlist';
import { Sample } from './components/sample' ;
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

function App() {
    return (
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/groups" element={<GroupList title="Groups List"/>}/>
          <Route path="/hosts" element={<HostList title="Hosts List"/>}/>
          <Route path="/sample" element={<Sample />} />
        </Routes>
      </BrowserRouter>
      </QueryClientProvider> ) ;
}
export default App;
