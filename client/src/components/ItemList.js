import React, { Component } from 'react'
import Item from '../components/Item'
import Converter from 'ns2js'

class ItemList extends Component {

    render() {
        let { items, showModalPlusClicked, deleteItem } = this.props
       
        //sort items by Lft
        let _items = items.sort(function (a, b) {
            return a.Lft - b.Lft;
        });
        
        //convert flat array to nested array
        let result = Converter(_items, {
            leftAttribute: 'Lft',
            rightAttribute: 'Rgt'
        })

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
                key={item.Id}
            />
        )
        return (
            <ul>{nodes}</ul>
            
        )
    }
}

export default ItemList

