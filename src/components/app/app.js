import "./app.css";

import { Component } from "react";

import { AppInfo } from "./../app-info/app-info";
import { SearchPanel } from "../search-panel/search-panel";
import { AppFilter } from "../app-filter/app-filter";
import { EmployeesList } from "../employees-list/employees-list";
import { EmployeesAddForm } from "../employees-add-form/employees-add-form";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'Victor', salary: 700, increase: false, like: false, id: "ssqw12" },
        { name: 'Alex', salary: 950, increase: false, like: false, id: "ssqw3232" },
        { name: 'Sasha', salary: 500, increase: true, like: true, id: "ssqw123" },
        { name: 'Michael', salary: 1400, increase: false, like: false, id: "ssqw321" },
        { name: 'Robert', salary: 2200, increase: false, like: false, id: "ssqw4321" },
        { name: 'Max', salary: 400, increase: false, like: false, id: "ssqw321321" },
      ],
      term: "",
      filter: "all"
    }
    this.maxId = 6;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      // const index = data.findIndex(elem => elem.id === id);
      // const before = data.slice(0, index);
      // const after = data.slice(index + 1);
      // const newArr = [...before, ...after];
      return {
        data: data.filter(item => item.id != id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = { name, salary, increase: false, like: false, id: this.maxId++ }
    this.setState(({ data }) => {
      return {
        data: [...data, newItem]
      }
    })
  }

  onToggleProp = (id, prop) => {
    // this.setState(({data}) => {
    //   const index = data.findIndex(elem => elem.id === id);
    //   const old = data[index];
    //   const newItem = {...old, increase: !old.increase};
    //   const newData = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
    //   return {
    //     data: newData
    //   }
    // })
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item
      })
    }))
  }

  bonus = () => {
    let value = this.state.data.filter(item => item.increase);
    return value.length
  }

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items
    }
    return items.filter(item => { 
      return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case "like": 
        return items.filter(item => item.like);
      case "more1000":
        return  items.filter(item => item.salary > 1000);
      default: 
        return items
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter})
  }

  setSalary = (salary) => {
    this.setState({salary})
  }

  render() {
    const { data, term, filter } = this.state;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);
    return (<div className="app">
      <AppInfo staff={data.length} 
        bonus={this.bonus} />
      <div className="search-panel">
        <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
        <AppFilter  filterState={filter} onFilterSelect={this.onFilterSelect}/>
      </div>  
      <EmployeesList
        data={visibleData}
        onDelete={this.deleteItem}
        onToggleProp={this.onToggleProp}/>
      <EmployeesAddForm
        onAdd={this.addItem} />
    </div>
    )
  }
}



