import React, { useState } from 'react'

import Data from "../Template.json";

function Template() {
    const [data, setData] = useState(Data)
    const [selectedTemp, setSelectedTemp] = useState("")
    console.log(data)

    const handleSelect = (e) => {
        setSelectedTemp(e.target.value)
    }

    return (
        <div className='demo-template'>
            <div className='dt-top'>
                <select onChange={handleSelect} value={selectedTemp} className={selectedTemp === "" && "select-error"}>
                    <option value="">Select Template</option>
                    {data.map((item) => <option value={item.name}>{item.name}</option>)}
                </select>
                {selectedTemp === "" && <span className='error'>Please Select a template</span>}
            </div>
            {data.map((item) =>
                item.name === selectedTemp ?
                    item.components.map((innerItem, key) =>
                        <div key={key}>
                            {innerItem.type === "header" ? <div className="dt-section">
                                <h4>Template Header</h4>
                                {innerItem.parameters.map((paraItem) =>
                                    paraItem.type === "image" ? <img src={paraItem.image.link} /> :

                                        paraItem.type === "document" ? <iframe src={paraItem.document.link}></iframe>:
                                            paraItem.type === "image" ? <img src={paraItem.image.link} /> :
                                               paraItem.type === "video" ? <iframe src={paraItem.video.link}></iframe> :
                                               paraItem.type === "text" ? <p>{paraItem.text}</p> :

                                                    null)} 
                            </div> :
                                innerItem.type === "body" ?
                                    <div className="dt-section">
                                        <h4>Template Body</h4>
                                        {innerItem.parameters.map((paraItem) =>
                                            paraItem.type === "text" ? <p>{paraItem.text}</p> :
                                                null)}

                                    </div>
                     : null
            }
                        </div>
                    ): null) }
                </div>
    )
        }

            export default Template