//SNEDING THE FILE TO THE BACKEND
function sendfileUpload(event) {
    const file = event.target.files[0]; //retrieves file selected by the user & stores it in a variable named file
    const formData = new FormData(); //let's me use send a CSV file
    formData.append('file', file);

    // Send the file to backend
    fetch('/getFileFromFront', { // HTTP request to the URL . REPLACE URL WITH URL IN THE BACKEND PYTHON CODE!!!!!!
        method: 'POST', //sENDing data :>
        body: formData //this represents the data that is being sent
    })
    .then(response => {
        if (response.ok==false) {
            throw new Error('there was a problem myb');
        }
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
}


//THIS WILL BE FOR RECIEVING THE FILE: 
function receiveFile() 
{
    fetch('/get_file_from_backend', 
    {
        method: 'GET'
    })
    .then(response => response.blob()) //Blobs used to handle file-like objects in JavaScript
    .then(blob => {
        // Create a URL representing the file data
       // const url = URL.createObjectURL(blob);
        
        // Open the file in a new tab for the user to download
       / // window.open(url);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}




// Add event listener for file input change
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', sendfileUpload); 
