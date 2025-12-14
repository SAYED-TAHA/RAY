const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export interface GeminiMessage {
  role: 'user' | 'model';
  content: string;
}

export async function getGeminiResponse(
  userMessage: string,
  conversationHistory: GeminiMessage[] = []
): Promise<string> {
  if (!API_KEY) {
    return 'عذراً، لم يتم تكوين مفتاح API للخدمة.';
  }

  try {
    // Build conversation context
    const messages = [
      ...conversationHistory,
      {
        role: 'user',
        parts: [{ text: userMessage }]
      }
    ];

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Gemini API error:', error);
      return 'عذراً، حدث خطأ في الخدمة. يرجى المحاولة مرة أخرى.';
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    return 'عذراً، لم أتمكن من فهم طلبك. يرجى المحاولة مرة أخرى.';
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.';
  }
}

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  // This would require a speech-to-text API
  // For now, return a placeholder
  return 'تم استقبال الصوت';
}
