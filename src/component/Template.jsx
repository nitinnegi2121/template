import React, { useState } from 'react'

import Data from "../Template2.json";

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
                                {innerItem.parameters.map((paraIten) =>
                                    paraIten.type === "image" ? <img src={paraIten.image.link} /> :

                                        paraIten.type === "document" ? <iframe src={paraIten.document.link}></iframe>:
                                            paraIten.type === "image" ? <img src={paraIten.image.link} /> :
                                               paraIten.type === "video" ? <iframe src={paraIten.video.link}></iframe> :
                                               paraIten.type === "text" ? <p>{paraIten.text}</p> :

                                                    null)} 
                            </div> :
                                innerItem.type === "body" ?
                                    <div className="dt-section">
                                        <h4>Template Body</h4>
                                        {innerItem.parameters.map((paraIten) =>
                                            paraIten.type === "text" ? <p>{paraIten.text}</p> :
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