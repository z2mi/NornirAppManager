import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import makeAnimated from "react-select/animated";
import * as Icon from "react-bootstrap-icons";
import "./grouplist.css";
import { UpdateGroup } from "./updategroup";
import { TablePagation } from "./pagation";
import { useQuery } from "react-query";

// Define the Login function.
export const HostList = (props) => {

 const options = [
        { value: "hostname", label: "Hostname" },
        { value: "host", label: "Host" },
        { value: "port", label: "Port" },
        { value: "platform", label: "Platform" },
        { value: "transport", label: "Transport" },
        { value: "site", label: "Site" },
        { value: "type", label: "Type" },
        { value: "groups", label: "Groups"}

      ];
  const numOfItemsPerPageOptions = [
        { value: "1", label: "1 per page"},
        { value: "2", label: "2 per page"},
        { value: "3", label: "3 per page"},
        { value: "4", label: "4 per page"},
        { value: "5", label: "5 per page" },
        { value: "10", label: "10 per page" },
        { value: "20", label: "20 per page" },
        { value: "50", label: "50 per page" },
        { value: "100", label: "100 per page" },
      ];
  const [searchText, setSearchText] = useState('');
  const [searchFields, setSearchFields] = useState([options[0]]);
  //const [groups, setHosts] = useState([]);
  const [resultHosts, setResultHosts] = useState([]) ;
  const [showHostModal, setShowHostModal] = useState(false) ;
  const [groupModalTitle, setHostModalTitle] = useState('Edit Host');
  const [numOfItemsPerPage, setNumOfItemsPerPage] = useState(5) ;
  const [activePage, setActivePage] = useState(1) ;


  const animatedComponents = makeAnimated();


  const fetchHosts = async () => {
      const access = localStorage.getItem("access_token");
      return await axios.get(
        "http://localhost:8000/inventory/hosts",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
    }

    const { data: hostsData, status: hostsStatus} = useQuery("hosts", fetchHosts);
    useEffect(() => {
        if (hostsStatus === "success") {
            //setHosts(hostsData.data.slice());
            doSearch(searchText);
        }
    }, [hostsStatus,searchText,searchFields]);
    /*
    useEffect(() => {
        if (localStorage.getItem("access_token") === null) {
          window.location.href = "/login";
        } else {
            console.log(hostsStatus);
            if ( hostsStatus === "success" ) {
                setHosts(hostsData.data);
                //doSearch(searchText);
            } 
        }
    });*/
/*
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const access = localStorage.getItem("access_token");
          const { data } = await axios.get(
            "http://localhost:8000/inventory/hosts",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access}`,
              },
            }
          );
          console.log(data);
          setHosts(data);
          doSearch(searchText);
          //setMessage(data.message);
        } catch (e) {
          console.log("not auth");
        }
      })();
    }
  }, []);
*/
  const handleFirstPageClick = () => {
    setActivePage(1) ; 
  }
  const handleLastPageClick = () => {
    setActivePage(Math.ceil((resultHosts.length * 1.0)/numOfItemsPerPage));
  }
  const handlePrevPageClick = () => {
    setActivePage(activePage-1);
  }
  const handleNextPageClick = () => {
    setActivePage(activePage+1);
  }

  const handleSearchFieldsChange = (selectedOptions) => {
    console.log(selectedOptions);
    setSearchFields(selectedOptions);
    //doSearch(searchText);
  }

  const doSearch = (text) => {
    let result = []
    //console.log('doSearch1 ' + hostsData.data.length);
    
    for ( let i=0 ; i < hostsData.data.length ; i++ )
    {
        blockj: {
        for ( let j=0 ; j < searchFields.length ; j++)
        {
            let f1 = hostsData.data[i][searchFields[j].value] ;
            if ( (typeof(f1) == 'string' || typeof(f1) == 'number') && f1.toString().includes(text))
            {
                result.push(hostsData.data[i]);
                break blockj ;
            } else {
                for ( let k=0 ; k < f1.length ; k++ )
                {
                    if ( typeof(f1[k]) == 'string' && f1[k].includes(text)) {
                        result.push(hostsData.data[i]);
                        break blockj;
                    }
                }
            }
            
        }
    }
    }
    setResultHosts(result);
  }
  const handleSearchChange = (event) => {
    const text = event.target.value ;
    //console.log(searchFields);

    //console.log("Before " + resultHosts)
    //doSearch(text);
    //console.log("After " + resultHosts)
    setSearchText(text);
  }
  const handlePageClick = (event) => {

    if ( event.target.getAttribute('data-arg1')) {
        setActivePage( parseInt(event.target.getAttribute('data-arg1')))
        return ;
    } 
    let page = event.target.id.replace('page_','');
    const numOfPages = Math.ceil((resultHosts.length * 1.0)/numOfItemsPerPage)
    switch ( page ) {
        case "first" :
            setActivePage(1) ;
            break ;
        case "prev" :
            setActivePage(activePage-1);
            break ;
        case "next" :
            setActivePage(activePage+1);
            break ;
        case "last" :
            setActivePage(numOfPages);
            break ;
        default : 
            setActivePage(parseInt(page)) ;
    }

  }
  const handleNumOfItemsPerPageChanged = (selectedOption) => {
    const newNumOfItemsPerPage = parseInt(selectedOption.value) ;
    const newNumOfPages = Math.ceil((resultHosts.length * 1.0)/newNumOfItemsPerPage);
    let newActivePage = Math.ceil((numOfItemsPerPage * activePage * 1.0) / newNumOfItemsPerPage);
    if (newActivePage > newNumOfPages ) {
        newActivePage = newNumOfPages ;
    }

    setNumOfItemsPerPage(newNumOfItemsPerPage);
    setActivePage(newActivePage)
  }

  const handleHostModelHide = () => {
    setShowHostModal(false)
  }

  const handleEditHostButton = () => {
    setHostModalTitle("Edit");
    setShowHostModal(true);
  }

  const handleAddHostButton = () => {
    setHostModalTitle("Add");
    setShowHostModal(true);   
  }
  const renderHosts = () => {
 
    let items = [] ;
    if ( resultHosts == null || resultHosts.length === 0 ) {
        return ;
    }
    //console.log(numOfItemsPerPage + " " + activePage);
    for ( let i=numOfItemsPerPage * (activePage-1) ;
     i < numOfItemsPerPage * activePage && i < resultHosts.length ;
      i++)
    {
        let item = resultHosts[i];
        items.push(
            <tr key={item.id}>
            <th scope="row">
              <input className="form-check-input" type="checkbox" />
            </th>
            <td key={'td1_'+item.id}>{item.hostname}</td>
            <td key={'td2_'+item.id}>{item.host}</td>
            <td key={'td3_'+item.id}>{item.platform}</td>
            <td key={'td4_'+item.id}>{item.transport}({item.port})</td>
            <td key={'td5_'+item.id}>{item.groups.join(" ")}</td>
            <td key={'td6_'+item.id}>
              <a
                href="#"
                className="edit"
                title="Edit"
                data-toggle="tooltip"
                id={"edit_group_" + item.id}
                onClick={handleEditHostButton}
              >
                <Icon.PencilFill color="gold" />
              </a>
              <a
                href="#"
                className="delete"
                title="Delete"
                data-toggle="tooltip"
                id={"delete_group_" + item.id}
              >
                <Icon.TrashFill color="tomato" />
              </a>
            </td>
          </tr>);
    }

    return items;
  };

  return (
    <>
    <div className='container'>
        <UpdateGroup fullscreen={true} title={groupModalTitle} show={showHostModal} onHide={handleHostModelHide} />
    </div>
    <div className="container bg-green">
      <div className="row">
        <div className="col-2 py-2">
          <h5>{props.title}</h5>
        </div>

        <div className="col-6 d-flex">
          <span className="py-2 px-2">Search Fields </span>
          <Select
            components={animatedComponents}
            placeholder="Search Fields"
            options={options}
            isMulti="true"
            onChange={handleSearchFieldsChange}
          />
        </div>

        <div className="col-2">
              <input type="text" 
              onChange={handleSearchChange}
              className="form-control"
              id="search"
              placeholder="Search ..." />
        </div>
        <div className="col px-1">
          <button className='btn btn-primary' onClick={handleAddHostButton}>Add</button>
        </div>
        <div className="col px-1">
          <button className='btn btn-danger px-1'>Delete</button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-responsive table-borderless">
          <thead>
            <tr className="bg-light" key="headerrow">
              <th scope="col" width="5%" key="th1">
                <input className="form-check-input" type="checkbox" />
              </th>
              <th scope="col" width="20%" key="th2">
                <span>Hostname</span>
              </th>
              <th scope="col" width="20%" key="th3">
                <span>Host</span>
              </th>
              <th scope="col" width="15%" key="th4">
                <span>Platform</span>
              </th>
              <th scope="col" width="15%" key="th5">
                <span>Transport</span>
              </th>
              <th scope="col" width="15%" key="th6">
                <span>Groups</span>
              </th>             
              <th scope="col" width="10%" key="th7">
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>{renderHosts()}</tbody>
        </table>
      </div>
      <TablePagation
      activePage={activePage}
      numOfItemsPerPage={numOfItemsPerPage}
      numOfItems={resultHosts.length}
      onPageClick={() => handlePageClick}
      onLastPageClick={() => handleLastPageClick}
      onNextPageClick={() => handleNextPageClick}
      onPrevPageClick={() => handlePrevPageClick}
      onFirstPageClick={() => handleFirstPageClick} 
      onNumOfItemsPerPageChanged={handleNumOfItemsPerPageChanged} 
      numOfItemsPerPageOptions={numOfItemsPerPageOptions}
      
      />
    </div>

    </>
  );
};




