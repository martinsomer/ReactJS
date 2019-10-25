import React, {Component} from 'react'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            items: [],
        }
        
        this.input = React.createRef()
    }
    
    _createNewItem = () => {
        if (this.input.current.value === '') return
        
        const items = this.state.items
        
        items.push({
            id: items.length === 0 ? 0 : items[items.length - 1].id + 1,
            value: this.input.current.value,
            done: false,
        })
        
        this.setState({
            items: items,
        })
        
        this.input.current.value = ''
    }
    
    _checkItem = (id) => {
        const items = this.state.items
        
        items.forEach((item, index) => {
            if (item.id === id)
                item.done = !item.done
        })
        
        this.setState({
            items: items,
        })
    }
    
    _removeItem = (id) => {
        const items = this.state.items
        
        items.forEach((item, index) => {
            if (item.id === id)
                items.splice(index, 1)
        })
        
        this.setState({
            items: items,
        })
    }
    
    _getItems = () => {
        const items = []
        
        for (let item of this.state.items) {
            items.push(
                <div
                    className = 'item'
                    key = {item.id}>
                        <div
                            className = {item.done ? 'itemValueCrossed': 'itemValue'}
                            onClick = {() => this._checkItem(item.id)}>
                                {item.value}
                        </div>

                        <button
                            className = 'removeItemButton'
                            onClick = {() => this._removeItem(item.id)}>
                                -
                        </button>
                </div>
            )
        }
        
        return items
    }
    
    render() {
        return (
            <div className = 'container'>
                <div className = 'header'>
                    To do list
                </div>
                
                <div className = 'items'>
                    {this.state.items.length > 0 ? (
                        this._getItems()
                    ) : (
                        <div className = 'noItems'>
                            No items to display
                        </div>
                    )}
                </div>

                <input
                    className = 'inputField'
                    type = 'text'
                    placeholder = 'Write new item and hit Enter'
                    ref = {this.input}
                    onKeyUp = {e => {
                        if (e.which === 13)
                            this._createNewItem()
                    }}
                />
            </div>
        )
    }
    
}

export default App
