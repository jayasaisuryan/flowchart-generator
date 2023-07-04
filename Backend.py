import openai,os
from graphviz import Digraph, Source

openai.api_key = 'd5cd9e479fb84ef698dead338e5b8a9b'
openai.api_base = 'https://jayasai01.openai.azure.com/'
openai.api_version = "2023-03-15-preview"
openai.api_type = 'azure'

def flowchart_generation(prompt):
    try:
        response = openai.ChatCompletion.create(
            engine='GPT_3_5',
            temperature=0.7,
            max_tokens=4000,
            top_p=0.95,
            messages = [{"role":"system","content":"I'm a Generative AI tool specialised in generating dotcodes for creating flow charts based on input. I'll get the product/description about the flowchart from user as input. I'll be following the template given below for presenting the output and I will not mention anything other than the dotcode.\n Template :- digraph SoftwareDevelopmentLifeCycle {..."},
                        {"role":"user","content":prompt}])
        return response.choices[-1].message.content
    except Exception as e:
        print(e)

# def UML_generation(prompt):
#     try:
#         response = openai.ChatCompletion.create(
#             engine='GPT_3_5',
#             temperature=0.7,
#             max_tokens=4000,
#             top_p=0.95,
#             messages = [{"role":"system","content":"I'm a Generative AI tool specialised in creating UML diagrams by presenting the output in dotcode. I'll get the product for which I need to make a UML Diagram, from user as input. Then I'll be generating the best dotcode for the UML with a small description inside each block of the UML. Don't give description of dotcode"},
#                         {"role":"user","content":prompt}])
#         return response.choices[-1].message.content
#     except Exception as e:
#         print(e)

def Graphviz_Module(dotcode):
    dot_code = f"""{dotcode}"""
    graph = Source(dot_code, format='png')  # You can choose a different format like 'svg', 'pdf', etc.
    graph.render(filename='Testing') 

 # This will create a file named 'flowchart.png' and open it in your default image viewer
def Summary(prompt,dotcode):
    try:
        response = openai.ChatCompletion.create(
            engine='GPT_3_5',
            temperature=0.7,
            max_tokens=5000,
            top_p=0.95,
            messages = [{"role":"system","content":"My role is to provide description of the given flow chart title and its dotcode in detail. I'll be getting the title and dotcode as inputs. And I need to give explanation of the flowchart in detail."},
                        {"role":"user","content":f"Title - {prompt} \n Dotcode - {dotcode}"}])
        return response.choices[-1].message.content
    except Exception as e:
        print(e)

type = input("Type - ")
product = input("Enter the product : ")
dotcode = flowchart_generation(product)
print(dotcode)
print(Summary(product,dotcode))
Graphviz_Module(dotcode)