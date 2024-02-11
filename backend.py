from flask import Flask, request, send_file #need to import these moduels 
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Endpoint for uploading a file
@app.route('/getFileFromFront', methods=['POST'])
def getFileFromFront():
    if 'file' not in request.files:
        return 'No file part'
    print("fuckshitbitch")

    file = request.files['file']

    if file.filename == '':
        return 'No selected file'

    file.save(os.path.join('uploads', file.filename))
    return 'File uploaded successfully'

# Endpoint for downloading a file
@app.route('/get_file_from_backend', methods=['GET'])
# get
def returnFile():
    filename = 'outputfile.csv'  # Replace with the actual file name
    file_path = os.path.join('uploads', filename)
    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)


#The GET method is recieveing data from server
#POST method is sending data to server