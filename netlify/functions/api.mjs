import { OpenRouter } from "@openrouter/sdk";

export async function handler(event)
{
  try 
  {
    const data = JSON.parse(event.body);
    const messages = data.messages;

    // Checking for empty messages
    if (!messages)
    {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Your message didn't reach the destination." }),
      };
    }

    const apiKey = process.env.VITE_API_KEY;
    
    // Checking if API key is not defined
    if (!apiKey) 
    {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "VITE_API_KEY is not defined in environment" }),
      };
    }

    const openRouter = new OpenRouter({ apiKey });

    const completion = await openRouter.chat.send({
      model: "google/gemini-2.0-flash-001",
      messages: messages,
    });

    // Good Request
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        text: completion.choices[0].message.content 
      }),
    };

  }
  catch (error) 
  {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};