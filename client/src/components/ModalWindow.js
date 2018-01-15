import React, { Component } from 'react'
import Dropzone from 'react-dropzone'


class ModalWindow extends Component {

    handleDrop([{ preview }]) {
        this.props.setPreview(preview)
    }
    getItem(e) {
        let itemClicked = this.props.itemClicked
        let itemRgt = () => {
            if (Object.keys(itemClicked).length === 0 ) {
                return 1
            }
            else if (Object.keys(itemClicked).length !== 0){
                return  itemClicked.Rgt + 1
            }
        }
        let itemLft = () => {
            if (Object.keys(itemClicked).length === 0) {
                return 0
            }
            else if (Object.keys(itemClicked).length !== 0){
                return  itemClicked.Rgt
            }
        }
        
        let item = {
            desc: this.getDesc.value,
            src: this.props.preview,
            // lft: itemClicked.Rgt,
            // rgt: itemClicked.Rgt + 1
            lft: itemLft(),
            rgt: itemRgt()
          
        }
        // let desc = this.getDesc.value
        // // let src = this.getImgSrc.currentSrc
        // let src = this.props.preview
        this.props.onOkClicked(item)
    }

    render() {
        let { onCancel, isShowing, preview } = this.props
        return (
            <div className="confirm-modal">
                {isShowing &&
                    <div>
                        <div className="modal-backdrop"></div>
                        <div className="confirm-modal-content">
                            <Dropzone onDrop={this.handleDrop.bind(this)} accept="image/jpeg,image/jpg,image/tiff,image/gif" multiple={false} acceptStyle={{ border: "15px solid green" }}>
                                Click to upload.
                             </Dropzone>
                            <img src={preview} alt='' ref={(_ref) => this.getImgSrc = _ref} />
                            <input className="confirm-modal-input" type="text" ref={(_ref) => this.getDesc = _ref} />
                            <button className='btn' onClick={(e) => this.getItem(e)}>OK</button>
                            <button className="btn" onClick={() => onCancel()}>Cancel</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default ModalWindow