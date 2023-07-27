import React, { useState } from 'react';
import Data from "../Template.json";
import { useNavigate } from 'react-router-dom';
function Template() {

  let navigate = useNavigate();
  const [data, setData] = useState(Data);
  const [selectedTemp, setSelectedTemp] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const handleSelect = (e) => {
    setSelectedTemp(e.target.value);
    setErrorMessages({});
  };

  const handlePlaceholderChange = (outerIndex, innerIndex, mainIndex, e) => {
    let newData = [...data];
    newData[outerIndex].components[innerIndex].parameters[mainIndex].text = e.target.value;
    setData(newData);
  };

  const handleFileUpload = (outerIndex, innerIndex, mainIndex, e) => {
    let newData = [...data];
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    newData[outerIndex].components[innerIndex].parameters[mainIndex].link = url;
    setData(newData);
  };

  return (
    <div className='template'>
      <div className='dt-top'>
        <select onChange={handleSelect} value={selectedTemp} className={selectedTemp === "" && "select-error"}>
          <option value="">Select Template</option>
          {data.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
        </select>
        {selectedTemp === "" && <span className='error'>Please Select a template</span>}
      </div>
      {selectedTemp !== "" && data.map((item, outerIndex) =>
        item.name === selectedTemp ?
          item.components.map((innerItem, key) => (
            <div key={key}>
              {innerItem.type === "header" ? (
                <div className="dt-section">
                  <h4>Template Header</h4>
                  {innerItem.parameters.map((paraItem, index) => {
                    if (["document", "image", "video"].includes(paraItem.type)) {
                      return (
                        <div key={index}>
                          <label className='upload-button'>
                            <input type="file" onChange={(e) => handleFileUpload(outerIndex, key, index, e)} accept={`${paraItem.type}/*`} />
                            Upload {paraItem.type}
                          </label>
                          <div className='img-list'>
                          {paraItem.link && 
                          <React.Fragment>
                            {paraItem.type == "video" ? 
                            <video width="320" height="240" controls>
                              <source src={paraItem.link} type="video/mp4" />
                              <source src={paraItem.link} type="video/ogg" />
                            </video> : paraItem.type == "image" ?
                            <img src={paraItem.link} /> : 
                            <a href={paraItem.link} target="_blank" rel="noopener noreferrer">View Document</a>}
                          </React.Fragment>}
                          </div>
                          
                          {paraItem.link == "" && <span className='error'>Please upload a {paraItem.type}</span>}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ) : innerItem.type === "body" ? (
                <div className="dt-section">
                  <h4>Template Body</h4>
                  {innerItem.parameters.map((paraItem, index) => (
                    <div key={index} className='dts-row'>
                      <p>Placeholer {`{{${paraItem.text}}}`}</p>
                      <div>
                      <input
                        type="text"
                        value={paraItem.text}
                        onChange={(e) => handlePlaceholderChange(outerIndex, key, index, e)}
                        placeholder="Placeholder Name*"
                        required
                      />
                      {paraItem.text == "" && <span className='error'>Please fill placeholer</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : innerItem.type == "footer" ?
              <div className="dt-section">
                  <h4>Template Footer</h4>
                  <span className='dth-inner'>{innerItem.text}</span>
              </div> : null}
            </div>
          )) : null
      )}
    </div>
  );
}

export default Template;
