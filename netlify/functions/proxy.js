const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzSUkBXpUMGf3k1qdxUOM6ZVqRQj4BXHYtizRY7oGDEFX3k1TzjK3gboqrDqqwVxznQGQ/exec';

exports.handler = async function(event) {
  const params  = new URLSearchParams(event.queryStringParameters || {});
  const url     = SCRIPT_URL + '?' + params.toString();

  try {
    const response = await fetch(url, { redirect: 'follow' });
    const text     = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type':                'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: false, error: err.toString() })
    };
  }
};
