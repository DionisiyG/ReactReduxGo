import React, { Component } from 'react'
import Item from '../components/Item'
const converter = require('ns2js');

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
       
        //sort items by Lft
        let _items = items.sort(function (a, b) {
            return a.Lft - b.Lft;
        });

        
        
        let result = converter(_items, {
            leftAttribute: 'Lft',
            rightAttribute: 'Rgt'
        })
        console.log(result)

        function showItems() {
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

        let nodes = result.map((item) =>
            <Item
                // item={item}
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
            //showItems(items)
            <ul>{nodes}</ul>
            
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

// let arr = [
//     {
//        Src: "https://goo.gl/owfXuz",
//        Description: "initial description",
//        Id:1,
//        lft:0,
//        rgt:9
//    },
//    {
//        Src: "https://goo.gl/owfXuz",
//        Description: "initial description2",
//        Id: 2,
//        lft:1,
//        rgt:2
//    },
//    {
//        Src: "https://goo.gl/owfXuz",
//        Description: "initial description2",
//        Id: 3,
//        lft:3,
//        rgt:8
//    },
//    {
//        Src: "https://goo.gl/owfXuz",
//        Description: "initial description2",
//        Id: 4,
//        lft:4,
//        rgt:5
//    }
//    , {
//        Src: "https://goo.gl/owfXuz",
//        Description: "initial description2",
//        Id: 5,
//        lft:6,
//        rgt:7
//    }
//    ]



    export default ItemList

