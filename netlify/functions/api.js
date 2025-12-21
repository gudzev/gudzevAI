// 1. CommonJS require
const { OpenRouter } = require("@openrouter/sdk");

exports.handler = async (event, context) => 
{
  try 
  {
    const data = JSON.parse(event.body);
    const message = data.message;

    // Checking for empty messages
    if (!message)
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
      messages: [{ role: "user", content: message }],
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