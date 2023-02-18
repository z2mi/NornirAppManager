import Pagination from 'react-bootstrap/Pagination';
import Select from 'react-select';

export const TablePagation = (props) => {


    const renderPagationItems = () => {
        let numOfPages = Math.ceil((props.numOfItems * 1.0)/ props.numOfItemsPerPage)  ;
        let prevCount = 2 ;
        let nextCount = 2 ;
        let items = [] ;
        const enablePrevPage = props.activePage === 1 ? false : true;
        const enableNextPage = props.activePage === numOfPages ? false : true ;
        const enableLastPage = props.activePage === numOfPages ? false : true;
        const enableFirstPage = props.activePage === 1 ? false : true;
        if ( numOfPages > 5) {

            let pageIndex = 1 ;
            if ( enableFirstPage ) {
                items.push(<Pagination.First key={'page_first'} id={'page_first'} onClick={props.onFirstPageClick()} data-arg1={1}/>);
            }
            if ( enablePrevPage ) {
                items.push(<Pagination.Prev key={'page_prev'} id={'page_prev'} onClick={props.onPrevPageClick()} data-arg1={props.activePage-1}/>);
            }
            if ( props.activePage - prevCount > 1 ){
                items.push(<Pagination.Ellipsis key={'page_prev_ellipsis'} disabled/>) 
             }
             pageIndex = props.activePage - prevCount ;
             if ( pageIndex < 1 ) {
                pageIndex = 1 ; 
             }

              
            for ( let i = 1  ; 
                 i <= prevCount && pageIndex < props.activePage ; i++, pageIndex++) {
                    items.push(<Pagination.Item onClick={props.onPageClick()} key={'page_'+pageIndex} id={'page_'+pageIndex} data-arg1={pageIndex}>{pageIndex}</Pagination.Item>);
            }

            items.push(<Pagination.Item active onClick={props.handlePage} key={'page_'+props.activePage} id={'page_'+props.activePage} data-arg1={props.activePage}>{props.activePage}</Pagination.Item>);
            for ( let i = 1 , pageIndex = props.activePage + 1 ; 
                i <= nextCount && pageIndex <= numOfPages; i++, pageIndex++) {
                   items.push(<Pagination.Item onClick={props.onPageClick()} key={'page_'+pageIndex} id={'page_'+pageIndex} data-arg1={pageIndex}>{pageIndex}</Pagination.Item>);
           }
           if ( (props.activePage + nextCount + 1 )< numOfPages ){
              items.push(<Pagination.Ellipsis key={'page_next_ellipsis'} disabled/>) 
           } 

           if ( enableNextPage ) {
            items.push(<Pagination.Next key={'page_next'} id={'page_next'} onClick={props.onNextPageClick()} data-arg1={props.activePage+1} />);
           }
           if ( enableLastPage ) {
             items.push(<Pagination.Last key={'page_last'} id={'page_last'} onClick={props.onLastPageClick()} data-arg1={numOfPages}/>);
           }
        } else if ( numOfPages > 1 ) {
            for(let i=1 ; i <= numOfPages ; i++) {
                items.push(<Pagination.Item  active={i === props.activePage} onClick={props.onPageClick()} key={'page_'+i} id={'page_'+i} data-arg1={i} >{i}</Pagination.Item>);
            }
        }
        return (
            items
        );
}

        
    return (

            <div className='row'>
                <div className='col-8'>
                <Pagination>
                {renderPagationItems()}
               </Pagination>
                </div>
            <div className='col-4'>
            <Select
            placeholder="Items per page"
            defaultValue={props.numOfItemsPerPageOptions[4]}
            options={props.numOfItemsPerPageOptions}
            isMulti={false}
            onChange={props.onNumOfItemsPerPageChanged}
            
            />                
            </div>
            </div>

    ) ;
}