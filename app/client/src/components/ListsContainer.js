import React, { Component } from 'react'
import axios from 'axios'
import List from './List'
import NewListForm from './NewListForm'
import EditListForm from './EditListForm'

class ListsContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      editingListId: null
    }
  }

  addNewList = (title, excerpt) => {
    axios.post('/api/v1/lists', { list: { title, excerpt } })
      .then(response => {
        console.log(response)
        const lists = [...this.state.lists, response.data]
        this.setState({ lists })
      })
      .catch(error => {
        console.log(error)
      })
  }

  removeList = (id) => {
    axios.delete('/api/v1/lists/' + id)
      .then(response => {
        const lists = this.state.lists.filter(
          list => list.id !== id
        )
        this.setState({ lists })
      })
      .catch(error => console.log(error))
  }

  editingList = (id) => {
    this.setState({
      editingListId: id
    })
  }

  editList = (id, title, excerpt) => {
    axios.put('/api/v1/lists/' + id, {
      list: {
        title,
        excerpt
      }
    })
      .then(response => {
        console.log(response)
        const lists = this.state.lists
        lists[id - 1] = { id, title, excerpt }
        this.setState(() => ({
          lists,
          editingListId: null
        }))
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/lists')
      .then(response => {
        console.log(response)
        this.setState({
          lists: response.data
        })
      })
      .catch(error => console.log(error))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.editingListId !== this.state.editingListId) {
      axios.get('http://localhost:3001/api/v1/lists')
        .then(response => {
          console.log(response)
          this.setState({
            lists: response.data
          })
        })
        .catch(error => console.log(error))
    }
  }

  render() {
    return (
      <div className="Lists-container">
        <NewListForm onNewList={this.addNewList} />
        {
          this.state.lists.map(list => {
            if (this.state.editingListId === list.id) {
              return (
                <EditListForm list={list} key={list.id} editList={this.editList} />
              )
            } else {
              return (
                <List list={list} key={list.id} onRemoveList={this.removeList} editingList={this.editingList} />
              )
            }
          })
        }
      </div>
    )
  }

}

export default ListsContainer