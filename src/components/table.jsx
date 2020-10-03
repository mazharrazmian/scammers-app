import React, { Component } from 'react'


import TableContainer from '../containers/table_container'
import Search from './search'


const Table = () => {

    return(
            <div className="container">       
            <Search/>
            <TableContainer/>
            </div>
    )
}


export default Table