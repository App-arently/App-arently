# base_agent.py

import openai
from config import Config
import time
import logging
import re

# Configure logging
logging.basicConfig(level=logging.INFO)

# Securely load API keys
if not Config.OPENAI_API_KEY:
    raise EnvironmentError("OpenAI API key not found. Please set it in the .env file.")

openai.api_key = Config.OPENAI_API_KEY

class BaseAgent:
    def __init__(self, models=None):
        if models is None:
            models = ["gpt-3.5-turbo"]  # Use OpenAI's model
        self.models = models

    def generate_ensemble_response(self, prompt):
        responses = []
        for model in self.models:
            response = self.call_api_with_retry(model, prompt)
            if response:
                responses.append(response)
        if not responses:
            raise Exception("All API calls failed.")
        return self.aggregate_responses(responses)

    def call_api_with_retry(self, model, prompt, max_retries=3):
        for attempt in range(max_retries):
            try:
                return self.call_openai(model, prompt)
            except Exception as e:
                logging.warning(f"API call failed for model {model} on attempt {attempt + 1}: {e}")
                time.sleep(2 ** attempt)
        logging.error(f"All retries failed for model {model}")
        return None

    def call_openai(self, model, prompt):
        try:
            response = openai.ChatCompletion.create(
                model=model,
                messages=[{"role": "user", "content": prompt}]
            )
            return response.choices[0].message['content']
        except Exception as e:
            logging.error(f"OpenAI API error: {e}")
            raise

    def aggregate_responses(self, responses):
        # Since we're using only one model, return the first response
        return responses[0]

    def create_prompt(self, task_description):
        raise NotImplementedError("Subclasses should implement this method.")

    def generate_code(self, task_description):
        prompt = self.create_prompt(task_description)
        code = self.generate_ensemble_response(prompt)
        return code

    def sanitize_input(self, input_str):
        return re.sub(r'[^\w\s.,:;\'\"()-]', '', input_str)
