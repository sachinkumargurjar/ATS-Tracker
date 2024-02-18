from openai import OpenAI
client = OpenAI(api_key="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")

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ]
)

print(completion.choices[0].message)
