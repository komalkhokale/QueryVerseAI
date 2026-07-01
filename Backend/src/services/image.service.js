export async function generateImage(prompt) {

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    return imageUrl;
}