import React, { Component } from 'react'

class Item extends Component {

    // containerUl(param) {
    //     return <ul>{param}</ul>
    // }


    render() {
        let { item, showModalPlusClicked, deleteItem, node } = this.props

        let childnodes = null;
        if (this.props.children) {
            childnodes = this.props.children.map(childnode =>
                <Item
                    src={node.Src}
                    desc={node.description}
                    lft={node.lft}
                    rgt={node.rgt}
                    showModalPlusClicked={showModalPlusClicked}
                    deleteItem={deleteItem}
                    children={childnode.children}
                    node={childnode}
                />
            )
        }

        const singleItem =
            <div>
                <img src={node.Src} alt="" />
                {"Description: " + node.Description}
                <div className="buttons">
                    <button className="addBtn btn" onClick={(id) => showModalPlusClicked(node)}>+</button>
                    <button className="removeBtn btn" onClick={(id) => deleteItem(node.Id)}>-</button>
                </div>
                <p>lKey is {node.Lft} <span>|||| rKey is {node.Rgt}</span></p>
                <p>id is {node.Id}</p>
            </div>

 
        return (
            <li className="item" key={node.Id}>
                {singleItem}
                {childnodes ?
                   <ul>{childnodes}</ul>
                    : null}

            </li>
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