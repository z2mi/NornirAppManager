import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import makeAnimated from "react-select/animated";
//import {Search, Trash, Pencil} from 'react-bootstrap-icons' ;
import * as Icon from "react-bootstrap-icons";
import "./grouplist.css";
import { UpdateGroup } from "./updategroup";
import { TablePagation } from "./pagation";
import { useQuery } from "react-query";

// Define the Login function.
export const GroupList = (props) => {

 const options = [
        { value: "name", label: "Group Name" },
        { value: "parent_groups", label: "Parent Group" },
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
  //const [groups, setGroups] = useState([]);
  const [resultGroups, setResultGroups] = useState([]) ;
  const [showGroupModal, setShowGroupModal] = useState(false) ;
  const [groupModalTitle, setGroupModalTitle] = useState('Edit Group');
  const [numOfItemsPerPage, setNumOfItemsPerPage] = useState(5) ;
  const [activePage, setActivePage] = useState(1) ;


  const animatedComponents = makeAnimated();


  const fetchGroups = async () => {
      const access = localStorage.getItem("access_token");
      return await axios.get(
        "http://localhost:8000/inventory/groups",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
    }

    const { data: groupsData, status: groupsStatus} = useQuery("groups", fetchGroups);
    useEffect(() => {
        if (groupsStatus === "success") {
            //setGroups(groupsData.data.slice());
            doSearch(searchText);
        }
    }, [groupsStatus,searchText,searchFields]);
    /*
    useEffect(() => {
        if (localStorage.getItem("access_token") === null) {
          window.location.href = "/login";
        } else {
            console.log(groupsStatus);
            if ( groupsStatus === "success" ) {
                setGroups(groupsData.data);
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
            "http://localhost:8000/inventory/groups",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access}`,
              },
            }
          );
          console.log(data);
          setGroups(data);
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
    setActivePage(Math.ceil((resultGroups.length * 1.0)/numOfItemsPerPage));
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
    //console.log('doSearch1 ' + groupsData.data.length);
    
    for ( let i=0 ; i < groupsData.data.length ; i++ )
    {
        blockj: {
        for ( let j=0 ; j < searchFields.length ; j++)
        {
            let f1 = groupsData.data[i][searchFields[j].value] ;
            if ( typeof(f1) == 'string' && f1.includes(text))
            {
                result.push(groupsData.data[i]);
                break blockj ;
            } else {
                for ( let k=0 ; k < f1.length ; k++ )
                {
                    if ( typeof(f1[k]) == 'string' && f1[k].includes(text)) {
                        result.push(groupsData.data[i]);
                        break blockj;
                    }
                }
            }
            
        }
    }
    }
    setResultGroups(result);
  }
  const handleSearchChange = (event) => {
    const text = event.target.value ;
    //console.log(searchFields);

    //console.log("Before " + resultGroups)
    //doSearch(text);
    //console.log("After " + resultGroups)
    setSearchText(text);
  }
  const handlePageClick = (event) => {

    if ( event.target.getAttribute('data-arg1')) {
        setActivePage( parseInt(event.target.getAttribute('data-arg1')))
        return ;
    } 
    let page = event.target.id.replace('page_','');
    const numOfPages = Math.ceil((resultGroups.length * 1.0)/numOfItemsPerPage)
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
    const newNumOfPages = Math.ceil((resultGroups.length * 1.0)/newNumOfItemsPerPage);
    let newActivePage = Math.ceil((numOfItemsPerPage * activePage * 1.0) / newNumOfItemsPerPage);
    if (newActivePage > newNumOfPages ) {
        newActivePage = newNumOfPages ;
    }

    setNumOfItemsPerPage(newNumOfItemsPerPage);
    setActivePage(newActivePage)
  }

  const handleGroupModelHide = () => {
    setShowGroupModal(false)
  }

  const handleEditGroupButton = () => {
    setGroupModalTitle("Edit");
    setShowGroupModal(true);
  }

  const handleAddGroupButton = () => {
    setGroupModalTitle("Add");
    setShowGroupModal(true);   
  }
  const renderGroups = () => {
 
    let items = [] ;
    if ( resultGroups == null || resultGroups.length === 0 ) {
        return ;
    }
    //console.log(numOfItemsPerPage + " " + activePage);
    for ( let i=numOfItemsPerPage * (activePage-1) ;
     i < numOfItemsPerPage * activePage && i < resultGroups.length ;
      i++)
    {
        let item = resultGroups[i];
        items.push(
            <tr key={item.id}>
            <th scope="row">
              <input className="form-check-input" type="checkbox" />
            </th>
            <td>{item.name}</td>
            <td>{item.parent_groups.join(" ")}</td>
            <td>
              <a
                href="#"
                className="edit"
                title="Edit"
                data-toggle="tooltip"
                id={"edit_group_" + item.id}
                onClick={handleEditGroupButton}
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
  const renderSearchFields = () => {};
  return (
    <>
    <div className='container'>
        <UpdateGroup fullscreen={true} title={groupModalTitle} show={showGroupModal} onHide={handleGroupModelHide} />
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
          <button className='btn btn-primary' onClick={handleAddGroupButton}>Add</button>
        </div>
        <div className="col px-1">
          <button className='btn btn-danger px-1'>Delete</button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-responsive table-borderless">
          <thead>
            <tr className="bg-light">
              <th scope="col" width="5%">
                <input className="form-check-input" type="checkbox" />
              </th>
              <th scope="col" width="25%">
                <span>Group Name</span>
              </th>
              <th scope="col" width="50%">
                <span>Parent Groups</span>
              </th>
              <th scope="col" width="20%">
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>{renderGroups()}</tbody>
        </table>
      </div>
      <TablePagation
      activePage={activePage}
      numOfItemsPerPage={numOfItemsPerPage}
      numOfItems={resultGroups.length}
      onPageClick={() => handlePageClick}
      onLastPageClick={() => handleLastPageClick}
      onNextPageClick={() => handleNextPageClick}
      onPrevPageClick={() => handlePrevPageClick}
      onFirstPageClick={() => handleFirstPageClick} 
      onNumOfItemsPerPageChanged={handleNumOfItemsPerPageChanged} 
      numOfItemsPerPageOptions={numOfItemsPerPageOptions}
      value={numOfItemsPerPage}
      />
    </div>

    </>
  );
};




