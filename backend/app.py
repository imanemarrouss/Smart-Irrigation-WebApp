from flask import Flask, request, jsonify
import numpy as np
import os
from transformers import pipeline
from flask_cors import CORS
from io import BytesIO
from tensorflow import keras
from keras.models import load_model
from keras.utils import load_img, img_to_array
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_ollama import ChatOllama
from langchain.schema import HumanMessage
from rag import setup_rag_logic, search

app = Flask(__name__)
CORS(app)
# Load the trained model
model = load_model('models/trained_plant_disease_model.h5')  

# Load the class labels dynamically from the training data directory
train_data_dir = 'data/train'  
class_labels = os.listdir(train_data_dir)

# Optional: Sort class labels if needed
class_labels.sort()


# Load a generative model from Hugging Face for providing advice
# model="EleutherAI/gpt-neo-1.3B",use_auth_token="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"
generator = pipeline("text-generation", model="gpt2")

# Function to get advice from Hugging Face based on the detected disease
def get_huggingface_advice(disease_name):
    question = f"What advice can you provide for treating {disease_name}?"
    try:
        response = generator(question, max_length=250, num_return_sequences=1)
        advice = response[0]["generated_text"]
        return advice
    except Exception as e:
        print(f"Error generating advice: {str(e)}")
        return "Unable to provide advice at this time."


# Base route
@app.route('/')
def home():
    return "Welcome to the Plant Disease Detection API! Use the `/detect` endpoint to analyze images."


# Route to detect the disease from the uploaded image
@app.route("/detect", methods=["POST"])
def detect():
    print("Request received")
    print("Files in request:", request.files.keys())  # Add this line

    if "image" not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files["image"]

    # Convert the FileStorage object to a file-like object
    img = load_img(BytesIO(file.read()), target_size=(128, 128))

    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    predictions = model.predict(img_array)
    predicted_index = np.argmax(predictions)
    predicted_class = class_labels[predicted_index]
    confidence_score = predictions[0][predicted_index]

    # Generate advice using the refined prompt
    prompt = (
        f"What advice can you provide for treating {predicted_class.replace('_', ' ')}? "
        "Give specific steps for managing or curing this plant disease in simple terms."
    )
    generated_response = generator(prompt, max_length=300, num_return_sequences=1)[0][
        "generated_text"
    ]

    # Remove the question part from the generated response
    generated_advice = generated_response.replace(prompt, "").strip()

    return jsonify(
        {
            "message": "Image processed successfully",
            "predictedClass": str(
                predicted_class
            ),  # Convert to string if it's not already
            "confidenceScore": float(
                confidence_score
            ),  # Convert to standard Python float
            "advice": generated_advice,
        }
    )




local_llm = "mistral"
llm = ChatOllama(model=local_llm, temperature=0)

# Configure RAG setup
INDEX_DIR = "indexdir"
PDF_PATHS = [
    r"C:\Users\Dell\Downloads\sensors-20-01042-v2.pdf",
    r"C:\Users\Dell\Downloads\Smart-Irrigation-System.pdf"
]

# Run setup logic for RAG
setup_rag_logic(PDF_PATHS, INDEX_DIR)

# API endpoint for querying
@app.route('/api/query-memory-types', methods=['POST'])
def query_memory_types():
    data = request.get_json()

    if 'question' not in data:
        return jsonify({'error': 'No question provided'}), 400

    question = data['question']
    
    try:
        # Step 1: Search for relevant content in the indexed documents
        search_results = search(question, INDEX_DIR)
        context = " ".join(search_results) if search_results else ""
        
        # Step 2: Combine context with the question for LLM
        combined_query = f"{context}\n\n{question}" if context else question
        test_query = llm.invoke([HumanMessage(content=combined_query)])
        response = test_query.content

        return jsonify({'response': response}), 200

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
