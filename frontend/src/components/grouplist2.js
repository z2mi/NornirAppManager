
import  React  from "react";
import  Select from "react-select";
import axios from "axios";
import makeAnimated from "react-select/animated";
//import {Search, Trash, Pencil} from 'react-bootstrap-icons' ;
import * as Icon from "react-bootstrap-icons";
import "./grouplist.css";
import { UpdateGroup } from "./updategroup";
import { TablePagation } from "./pagation";
// Define the Login function.



  class GroupList extends React.Component {
  options = [
    { value: "name", label: "Group Name" },
    { value: "parent_groups", label: "Parent Group" },
  ];
  animatedComponents = makeAnimated();
  constructor (props) {
    super(props);
    this.state = {
      searchText: '',
      searchFields: [this.options[0]] ,
      groups: [],
      resultGroups: [],
      showGroupModal: false,
      groupModalTitle: 'Edit Group',
      numOfItemsPerPage: 1,
      activePage: 1
    }
  }

  componentDidMount() {
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
          //this.setState({groups: data.slice()});
          //this.doSearch(this.searchText);
          //setMessage(data.message);
        } catch (e) {
          console.log("not auth" + e);
        }
      })();
    }   
  }

  handleFirstPageClick = () => {
    this.setSetate({activePage: 1}) ; 
  }
  handleLastPageClick = () => {
    this.setState({activePage: Math.ceil((this.state.resultGroups.length * 1.0)/this.state.numOfItemsPerPage)});
  }
  handlePrevPageClick = () => {
    this.setState({activePage: this.state.activePage-1});
  }
  handleNextPageClick = () => {
    this.setState({activePage: this.state.activePage+1});
  }



  doSearch = (text) => {
    let result = []
    console.log('doSearch ' + this.state.groups.length);
    for ( let i=0 ; i < this.state.groups.length ; i++ )
    {
        blockj: {
        for ( let j=0 ; j < this.state.searchFields.length ; j++)
        {
            let f1 = this.state.groups[i][this.state.searchFields[j].value] ;
            if ( typeof(f1) == 'string' && f1.includes(text))
            {
                result.push(this.state.groups[i]);
                break blockj ;
            } else {
                for ( let k=0 ; k < f1.length ; k++ )
                {
                    if ( typeof(f1[k]) == 'string' && f1[k].includes(text)) {
                        result.push(this.state.groups[i]);
                        break blockj;
                    }
                }
            }
            
        }
    }
    }
    this.setState({resultGroups: result});
    
  }

  handleSearchFieldsChange = (selectedOptions) => {
    this.setState({serachFields: selectedOptions});
    //console.log(searchFields);
    this.doSearch(this.state.searchText);
  }

  handleSearchChange = (event) => {
    const text = event.target.value ;
    this.doSearch(text);
    this.setState({searchText: text});
  }
  handlePageClick = (event) => {

    if ( event.target.getAttribute('data-arg1')) {
        this.setState({activePage: parseInt(event.target.getAttribute('data-arg1'))}) ;
        return ;
    } 
    let page = event.target.id.replace('page_','');
    const numOfPages = Math.ceil((this.state.resultGroups.length * 1.0)/this.state.numOfItemsPerPage)
    switch ( page ) {
        case "first" :
            this.setState({
              activePage: 1
            }) ;
            break ;
        case "prev" :
            this.setState({activePage: this.state.activePage-1});
            break ;
        case "next" :
            this.setState({activePage: this.state.activePage+1});
            break ;
        case "last" :
            this.setState({activePage: numOfPages});
            break ;
        default : 
            this.setState({activePage:parseInt(page)}) ;
    }

  }
  handleNumOfItemsPerPageChanged = (selectedOption) => {
    const newNumOfItemsPerPage = parseInt(selectedOption.value) ;
    const newNumOfPages = Math.ceil((this.state.resultGroups.length * 1.0)/newNumOfItemsPerPage);
    let newActivePage = Math.ceil((this.state.numOfItemsPerPage * this.state.activePage * 1.0) / newNumOfItemsPerPage);
    if (newActivePage > newNumOfPages ) {
        newActivePage = newNumOfPages ;
    }

    this.setState({numOfItemsPerPage: newNumOfItemsPerPage});
    this.setState({activePage: newActivePage});
  }

  handleGroupModelHide = () => {
    this.setState({showGroupModal: false});
  }

  handleEditGroupButton = () => {
    this.setState({groupModalTile: "Edit", showGroupModal: true});
  }

  handleAddGroupButton = () => {
    this.setState({groupModalTitle: "Add", showGroupModal: true}); 
  }
  renderGroups = () => {
  
    if ( this.state.resultGroups == null || this.state.resultGroups.length === 0 ) {
        return ;
    }

    return this.state.resultGroups.map( (item,index) => {
      if ( index >= this.state.numOfItemsPerPage * (this.state.activePage-1) &&
           index < this.state.numOfItemsPerPage * this.state.activePage  ) {
            return (
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
                  onClick={this.handleEditGroupButton}
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
            </tr> 
            ) ;
           }
    })
    //console.log(numOfItemsPerPage + " " + activePage);
    /*
    for ( let i=this.state.numOfItemsPerPage * (this.state.activePage-1) ;
     i < this.state.numOfItemsPerPage * this.state.activePage && i < this.state.resultGroups.length ;
      i++)
    {
        let item = this.state.resultGroups[i];
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
                onClick={this.handleEditGroupButton}
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
*/
  
  }; 
  render() {
    return (
    <>
    <div className='container'>
        <UpdateGroup fullscreen={true} title={this.state.groupModalTitle} show={this.state.showGroupModal} onHide={this.handleGroupModelHide} />
    </div>
    <div className="container bg-green">
      <div className="row">
        <div className="col-2 py-2">
          <h5>{this.props.title}</h5>
        </div>

        <div className="col-6 d-flex">
          <span className="py-2 px-2">Search Fields </span>
          <Select
            components={this.animatedComponents}
            placeholder="Search Fields"
            value={this.state.searchFields}
            options={this.options}
            isMulti="true"
            onChange={this.handleSearchFieldsChange}
          />
        </div>

        <div className="col-2">
              <input type="text" 
              onChange={this.handleSearchChange}
              className="form-control"
              id="search"
              placeholder="Search ..." />
        </div>
        <div className="col px-1">
          <button className='btn btn-primary' onClick={this.handleAddGroupButton}>Add</button>
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
          <tbody>{this.renderGroups()}</tbody>
        </table>
      </div>
      <TablePagation
      activePage={this.state.activePage}
      numOfItemsPerPage={this.state.numOfItemsPerPage}
      numOfItems={this.state.resultGroups.length}
      onPageClick={() => this.handlePageClick}
      onLastPageClick={() => this.handleLastPageClick}
      onNextPageClick={() => this.handleNextPageClick}
      onPrevPageClick={() => this.handlePrevPageClick}
      onFirstPageClick={() => this.handleFirstPageClick} 
      onNumOfItemsPerPageChanged={this.handleNumOfItemsPerPageChanged} />
    </div>

    </>
    );  
  }
}


export default GroupList ;  


