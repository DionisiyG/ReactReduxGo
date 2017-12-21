import React, { Component } from 'react'
import axios from 'axios'

class ItemItem extends React.Component {
    render() {
        return (
            <tr>
                <td> {this.props.id}    </td>
                <td> {this.props.desc} </td>
                <td> <img src={this.props.src} alt="" style={{width:100}}/>  </td>
                <td> {this.props.lft}  </td>
                <td> {this.props.rgt}  </td>
            </tr>
        );
    }
}

class ItemItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
    }

    componentDidMount() {
        this.serverRequest =
            axios
                .get("/getAll")
                .then((result) => {
                    this.setState({ items: result.data.ItemList });
                });
    }

    render() {
        const itemss = this.state.items
        return (
            <div>
                <table><tbody>
                    <tr><th>Id</th><th>Desc</th><th>Src</th></tr>
                    {itemss.map(item =>
                        <ItemItem
                            key={item.Id}
                            id={item.Id}
                            desc={item.Description}
                            src={item.Src}
                        />
                    )}
                </tbody></table>

            </div>
        );
    }
}

export default ItemItemList