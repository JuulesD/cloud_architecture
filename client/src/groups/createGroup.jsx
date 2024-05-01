import React from 'react';

function CreateGroup(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            "name":name
        };

        try {
            const response = await axios.post('http://localhost:3000/creation', formData);
            setName("");
            if (response.data === "New Group added to your profile."){
                window.location.href = '/';
            }
            else{
                
            }

        } catch (error) {
            console.error('Error sending data :', error);
        }
    };

    return (<>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)}/>

            <button type="submit">Connect</button>
        </form>
    </>)
}

export default CreateGroup;