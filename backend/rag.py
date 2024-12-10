# rag_logic.py

import fitz  # PyMuPDF
from whoosh import index
from whoosh.fields import Schema, TEXT
from whoosh.qparser import QueryParser
import os

# Function to extract text from PDFs
def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as pdf_document:
        for page in pdf_document:
            text += page.get_text()
    return text

# Function to save extracted text to a file
def save_text_to_file(text, file_path):
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(text)

# Function to create an index
def create_index(index_dir, schema):
    if not os.path.exists(index_dir):
        os.mkdir(index_dir)
    return index.create_in(index_dir, schema)

# Function to add documents to the index
def add_documents_to_index(index_dir, documents):
    ix = index.open_dir(index_dir)
    with ix.writer() as writer:
        for doc in documents:
            writer.add_document(content=doc)

# Function to search the index
def search(query, index_dir):
    ix = index.open_dir(index_dir)
    with ix.searcher() as searcher:
        query_parser = QueryParser("content", ix.schema)
        parsed_query = query_parser.parse(query)
        results = searcher.search(parsed_query, limit=5)  # Get top 5 results
        return [result['content'] for result in results]

# Main setup logic
def setup_rag_logic(pdf_paths, index_dir):
    # Extract text from PDFs
    extracted_texts = [extract_text_from_pdf(pdf) for pdf in pdf_paths]

    # Save texts to files (optional for debugging or persistence)
    for i, text in enumerate(extracted_texts, start=1):
        save_text_to_file(text, f"pdf{i}_text.txt")

    # Define schema for indexing
    schema = Schema(content=TEXT(stored=True))

    # Create index and add documents
    create_index(index_dir, schema)
    add_documents_to_index(index_dir, extracted_texts)
