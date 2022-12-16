import { useState } from 'react';
import './App.css'

const MAX_COUNT = 2;
function App() {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileLimit, setFileLimit] = useState(false);
  const handleFileEvent =  (e) => {
   
}
  return (
    <div className="App">
      <input id='fileUpload' type='file' multiple
        accept='image/png'
        onChange={handleFileEvent}
        disabled={fileLimit}/> 
        {/* a label with the attribute htmlFor set to the id of the input. With this, 
        the label is bound to the input and is able to replicate its functionality. */}
        <label htmlFor='fileUpload'>
        {/* using a instead of button and applied bootstrap classes to it. */}
				<a  className={`btn btn-primary ${!fileLimit ? '' : 'disabled' } `}>Upload Files</a>
			</label>
    </div>
  );
}

export default App;
