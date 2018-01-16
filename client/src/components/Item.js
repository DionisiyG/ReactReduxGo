import React, { Component } from 'react'

class Item extends Component {

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
    }
}

export default Item