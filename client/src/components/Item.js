import React, { Component } from 'react'

class Item extends Component {

    render() {
        let { item, showModalPlusClicked, deleteItem } = this.props

        return (
            <div className="item">
                <img src={item.Src} alt="" />
                {"Description: " + item.Description}
                <div className="buttons">
                    <button className="addBtn btn" onClick={(id) => showModalPlusClicked(item)}>+</button>
                    <button className="removeBtn btn" onClick={(id) => deleteItem(item.Id)}>-</button>
                </div>
                <p>lKey is {item.Lft} <span>|||| rKey is {item.Rgt}</span></p>
                <p>______________________</p>
                <p>id is {item.Id}</p>
            </div>

        )


        // return (
        //     <li >
        //         {item.Description &&
        //             <div className="item">
        //                 <img src={item.Src} alt="" />
        //                 {"Description: " + item.Description}
        //                 <div className="buttons">
        //                     <button className="addBtn btn" onClick={(id) => showModalPlusClicked(item)}>+</button>
        //                     <button className="removeBtn btn" onClick={(id) => deleteItem(item.Id)}>-</button>
        //                 </div>
        //                 <p>lKey is {item.Lft} <span>|||| rKey is {item.Rgt}</span></p>
        //                 <p>______________________</p>
        //                 <p>id is {item.Id}</p>
        //             </div>
        //         }
        //     </li>

        // )
    }
}

export default Item