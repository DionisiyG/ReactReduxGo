import React, { Component } from 'react'
import Item from '../components/Item'

class ItemList extends Component {


    render() {
        let { items, showModalPlusClicked, deleteItem } = this.props
        let _items = items
        // console.log("Items",_items)
        return (
            <div className='items'>
                {_items.map((item) =>
                    <Item
                        key={item.Id}
                        item={item}
                        src={item.Src}
                        desc={item.description}
                        lft={item.lft}
                        rgt={item.rgt}
                        showModalPlusClicked={showModalPlusClicked}
                        deleteItem={deleteItem}
                    />
                )}
            </div>
        )
    }
}


export default ItemList