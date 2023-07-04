from flask import Flask, request, jsonify, send_file
from graphviz import Digraph, Source
import openai
from flask_cors import CORS

openai.api_key = 'd5cd9e479fb84ef698dead338e5b8a9b'
openai.api_base = 'https://jayasai01.openai.azure.com/'
openai.api_version = "2023-03-15-preview"
openai.api_type = 'azure'

app = Flask(__name__)
CORS(app)
@app.route('/generate-flowchart', methods=['POST'])
def generate_flowchart():
    try:
        data = request.json
        prompt = data.get('prompt', '')

        # Call the flowchart_generation function to generate the flowchart dotcode
        dotcode = flowchart_generation(prompt)

        # Use the Graphviz_Module to generate the image and get the image file path
        image_file = Graphviz_Module(dotcode)

        # Send the image file as a response
        return send_file(image_file, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route('/generate-summary', methods=['POST'])
def generate_summary():
    try:
        data = request.json
        prompt = data.get('prompt', '')
        dotcode = data.get('dotcode', '')

        # Call the Summary function to generate the summary
        Summary(prompt, dotcode)
        return jsonify({"message": "Summary generated and saved to 'Summary.txt'."})

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/get-generated-image', methods=['GET'])
def get_generated_image():
    # Assuming the image file is named 'Output.png' and saved in the same directory
    return send_file('Output.png', mimetype='image/png')

@app.route('/get-generated-summary', methods=['GET'])
def get_generated_summary():
    try:
        # Assuming 'Summary.txt' is saved in the same directory
        with open("Summary.txt", 'r') as f:
            summary_content = f.read()

        return jsonify({"summary": summary_content})

    except Exception as e:
        return jsonify({"error": str(e)})

def flowchart_generation(prompt):
    try:
        response = openai.ChatCompletion.create(
            engine='GPT_3_5',
            temperature=0.7,
            max_tokens=4000,
            top_p=0.95,
            messages = [{"role":"system","content":"I'm a Generative AI tool specialised in generating dotcodes for creating flow charts of detailed type, based on input. I'll get the description from user, for which the user requires the flowchart, as input. I'll be following the template given below for presenting the output and I will not mention anything other than the dotcode.I'll ensures that I'll stick to detailed flowchart basics, and generate flowchart using process, delay, decision, input/output, document and other relevant symbols.\n Template :- digraph <Title of the flowchart> {..."},
                        {"role":"user","content":prompt}])
        return response.choices[-1].message.content
    except Exception as e:
        print(e)

def Graphviz_Module(dotcode):
    dot_code = f"""{dotcode}"""
    graph = Source(dot_code, format='png')
    graph.render(filename='Output')

def Summary(prompt,dotcode):
    try:
        response = openai.ChatCompletion.create(
            engine='GPT_3_5',
            temperature=0.7,
            max_tokens=5000,
            top_p=0.95,
            messages = [{"role":"system","content":"My role is to provide description of the given flow chart title and its dotcode in detail. I'll be getting the title and dotcode as inputs. And I need to give explanation of the flowchart in detail."},
                        {"role":"user","content":f"Title - {prompt} \n Dotcode - {dotcode}"}])
    except Exception as e:
        print(e)
    with open("Summary.txt", 'w') as w:
        w.write(response.choices[-1].message['content']) 

if __name__ == '__main__':
    app.run(port=3000)
