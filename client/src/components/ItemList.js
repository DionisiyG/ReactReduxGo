import React, { Component } from 'react'
import Item from '../components/Item'
const converter = require('ns2js');

class ItemList extends Component {

    render() {
        let { items, showModalPlusClicked, deleteItem } = this.props
       
        //sort items by Lft
        let _items = items.sort(function (a, b) {
            return a.Lft - b.Lft;
        });
        
        //convert flat array to nested array
        let result = converter(_items, {
            leftAttribute: 'Lft',
            rightAttribute: 'Rgt'
        })
        console.log(result)


        let nodes = result.map((item) =>
            <Item
                src={item.Src}
                desc={item.description}
                lft={item.lft}
                rgt={item.rgt}
                showModalPlusClicked={showModalPlusClicked}
                deleteItem={deleteItem}
                children={item.children}
                node = {item}
            />
        )
        return (
            <ul>{nodes}</ul>
            
        )
    }
}

export default ItemList

