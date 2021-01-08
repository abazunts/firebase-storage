import firebase from 'firebase';
import React, {useState} from 'react';
import './App.css';


const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();


function App() {
    const [url, setUrl] = useState('')
    const getImageUrl = async (firebaseUrl: string) => {
        const storageRef = storage.ref(firebaseUrl);
        return storageRef.getDownloadURL()
    }

    const saveFileHandler = async (file: any) => {
        const storagePath = `/path/filename`
        const mountainImagesRef = storage.ref().child(storagePath);
        await mountainImagesRef.put(file)
        const url = await getImageUrl(storagePath)
        setUrl(url)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.files && saveFileHandler(event.target.files[0])
    }
    return (
        <div className="App">
            <input type={'file'} onChange={handleChange}/>
            <img src={url} width={250} height={250} />
        </div>
    );
}

export default App;
