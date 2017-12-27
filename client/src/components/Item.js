import React, { Component } from 'react'

class Item extends Component {

  

    render() {
        let {  item, showModalPlusClicked, deleteItem } = this.props
        return (
            <div className="item">
                {item.Description &&
                    <div>
                        <img src={item.Src} alt="" />
                        {"Description: " + item.Description}
                        <div className="buttons">
                            <button className="addBtn btn" onClick={(id) => showModalPlusClicked(item)}>+</button>
                            <button className="removeBtn btn" onClick={(id) => deleteItem(item.Id)}>-</button>
                        </div>
                        <p>lKey is {item.Lft}</p>
                        <p>rKey is {item.Rgt}</p>
                        <p>______________________</p>
                        <p>id is {item.Id}</p>
                    </div>
                }
            </div>
        )
    }
}

export default Item