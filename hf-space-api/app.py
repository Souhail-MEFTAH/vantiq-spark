"""
Gradio API wrapper for the Vantiq RAG Agent.
Deploy this to your HF Space (Souhail-Meftah/Vantiq) alongside rag_agent.py and utils.py.

Change your HF Space README.md to:
  sdk: gradio
  app_file: app.py
"""

import gradio as gr
from rag_agent import run_rag_agent


async def answer_question(question):
    """Answer a Vantiq use-case question using RAG retrieval."""
    try:
        response = await run_rag_agent(question)
        return response
    except Exception as e:
        return f"Error: {str(e)}"


with gr.Blocks(title="Vantiq Usecase Assistant") as demo:
    gr.Markdown("# Vantiq Usecase Assistant API")
    gr.Markdown("RAG-powered chatbot for Vantiq use case ideation and guidance")
    with gr.Row():
        inp = gr.Textbox(label="Question", placeholder="Ask about Vantiq use cases...", scale=4)
        out = gr.Markdown(label="Response", value="")
    btn = gr.Button("Ask", variant="primary")
    btn.click(fn=answer_question, inputs=inp, outputs=out, api_name="predict")
    inp.submit(fn=answer_question, inputs=inp, outputs=out, api_name="predict")


if __name__ == "__main__":
    demo.launch()
