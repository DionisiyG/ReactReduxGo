import React, { Component } from 'react'
import Item from '../components/Item'

class ItemList extends Component {




    renderItemsBackup(items) {
        // find where to render
        let node = document.getElementById('root');
        node.innerHTML = '';
        if (items.length) {
            var ul = document.createElement('ul');
            // var ul = React.createElement('ul', null, ????)
            var tree = fetchChildElement(ul);
            node.appendChild(tree);
        }
        function fetchChildElement(container, lft, rgt) {
            items.filter(filterItems); //go through data array 
            return container;

            function filterItems(item) {
                //check if item exists in array 
                if (item.Lft === (lft || 0)) {
                    var element = document.createElement('li');
                    element.innerHTML = (item.Lft + " | " + item.Rgt);

                    //check if item got nested items
                    if (item.Lft + 1 < item.Rgt) {
                        //if true call recursive function
                        var childContainer = document.createElement('ul');
                        var child = fetchChildElement(childContainer, item.Lft + 1, item.Rgt - 1);
                        element.appendChild(child);
                    }

                    //add item to array
                    container.appendChild(element);

                    //check if next element exists and call function for them
                    if (rgt && item.Rgt < rgt) {
                        //if true call recursive function
                        fetchChildElement(container, item.Rgt + 1, rgt);
                    }
                }
            }
        }
    }

    renderItems(items) {
        // find where to render
        let node = document.getElementById('root');
        node.innerHTML = '';
        if (items.length) {
            var ul = document.createElement('ul');
            // var ul = React.createElement('ul', null, ????)
            var tree = fetchChildElement(ul);
            node.appendChild(tree);
        }
        function fetchChildElement(container, lft, rgt) {
            items.filter(filterItems); //go through data array 
            return container;

            function filterItems(item) {
                //check if item exists in array 
                if (item.Lft === (lft || 0)) {
                    var element = document.createElement('li');
                    element.innerHTML = (item.Lft + " | " + item.Rgt);

                    //check if item got nested items
                    if (item.Lft + 1 < item.Rgt) {
                        //if true call recursive function
                        var childContainer = document.createElement('ul');
                        var child = fetchChildElement(childContainer, item.Lft + 1, item.Rgt - 1);
                        element.appendChild(child);
                    }

                    //add item to array
                    container.appendChild(element);

                    //check if next element exists and call function for them
                    if (rgt && item.Rgt < rgt) {
                        //if true call recursive function
                        fetchChildElement(container, item.Rgt + 1, rgt);
                    }
                }
            }
        }
    }

    render() {
        let { items, showModalPlusClicked, deleteItem } = this.props
        //  let _items = items
        // console.log("Items",_items)

        let arr = []

        //sort items by Lft
        let _items = items.sort(function (a, b) {
            return a.Lft - b.Lft;
        });

        function showItems() {
            _items.filter(filterChildren)
            function filterChildren(item){

            }
            const iitems = _items.map(item => {
                const itemToDisplay =
                    <Item
                        // key={item.Id}
                        item={item}
                        src={item.Src}
                        desc={item.description}
                        lft={item.lft}
                        rgt={item.rgt}
                        showModalPlusClicked={showModalPlusClicked}
                        deleteItem={deleteItem}
                    />

                return (
                    <li key={item.Id} className="itemLi">
                        {itemToDisplay}
                    </li>
                )
            })
            return (
                <ul className="itemsUl">
                    {iitems}
                </ul>
            )

        }

        return (
            showItems(items)
        )
    }
}

// return (
//     _items.map((item) =>
//         <Item
//             key={item.Id}
//             item={item}
//             src={item.Src}
//             desc={item.description}
//             lft={item.lft}
//             rgt={item.rgt}
//             showModalPlusClicked={showModalPlusClicked}
//             deleteItem={deleteItem}
//         />
//     )
// )

// function showItems() {
//     return (
//         items.map((item) =>
//             <Item
//                 key={item.Id}
//                 item={item}
//                 src={item.Src}
//                 desc={item.description}
//                 lft={item.lft}
//                 rgt={item.rgt}
//                 showModalPlusClicked={showModalPlusClicked}
//                 deleteItem={deleteItem}
//             />
//         )
//     )
// }




// return (
//     <div className='items'>
//         <ul>
//             {items.map((item) =>
//                 <Item
//                     key={item.Id}
//                     item={item}
//                     src={item.Src}
//                     desc={item.description}
//                     lft={item.lft}
//                     rgt={item.rgt}
//                     showModalPlusClicked={showModalPlusClicked}
//                     deleteItem={deleteItem}
//                 />
//             )}
//         </ul>
//     </div>
// )




export default ItemList

