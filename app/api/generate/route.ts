import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// ─── Provider config ───────────────────────────────────────────────
// Set AI_PROVIDER=openai in .env.local to switch back to OpenAI
const PROVIDER = (process.env.AI_PROVIDER ?? 'siliconflow') as 'openai' | 'siliconflow'

const SF_BASE_URL = 'https://api.siliconflow.cn/v1'
const SF_VISION_MODEL = 'Qwen/Qwen3-VL-8B-Instruct'
const SF_IMAGE_MODEL = 'Qwen/Qwen-Image'

const OAI_VISION_MODEL = 'gpt-4o'
const OAI_IMAGE_MODEL = 'dall-e-3'
// ───────────────────────────────────────────────────────────────────

function getVisionClient() {
  if (PROVIDER === 'siliconflow') {
    return new OpenAI({ apiKey: process.env.SF_API_KEY, baseURL: SF_BASE_URL })
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

const FUSION_PROMPT = (personDescription: string, pokemonName: string, pokemonNameZh: string) =>
  `Redraw the following in the most clumsy, scribbly, and utterly pathetic way possible. Use a white background, and make it look like it was drawn in MS Paint with a mouse by a 5-year-old child.

The subject: ${personDescription}

Combine this person with the Pokémon ${pokemonName} (${pokemonNameZh}) — merge their features together so the person has ${pokemonName}'s iconic colors, markings, ears, tail, or other traits awkwardly pasted onto them.

It should be vaguely recognizable but also completely wrong, off in a confusing and awkward way, with that low-quality pixel-by-pixel feel that emphasizes how ridiculously bad it is. Wobbly lines, uneven fills, wrong proportions. Actually, you know what, whatever, just draw it however you want.

Style: MS Paint, white background, pixel art chaos, amateur scribble.`

async function generateImageSiliconflow(prompt: string): Promise<string> {
  const res = await fetch(`${SF_BASE_URL}/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SF_API_KEY}`,
    },
    body: JSON.stringify({
      model: SF_IMAGE_MODEL,
      prompt,
      image_size: '1024x1024',
      num_inference_steps: 20,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`SiliconFlow image generation failed: ${err}`)
  }

  const data = await res.json()
  // Qwen/Qwen-Image 返回 images[0].url，兼容 data[0].url
  const url = data?.images?.[0]?.url ?? data?.data?.[0]?.url
  if (!url) throw new Error('SiliconFlow 未返回图片 URL')
  return url
}

async function generateImageOpenAI(client: OpenAI, prompt: string): Promise<string> {
  const imageRes = await client.images.generate({
    model: OAI_IMAGE_MODEL,
    prompt,
    n: 1,
    size: '1024x1024',
    quality: 'standard',
    style: 'vivid',
  })
  const url = imageRes.data?.[0]?.url
  if (!url) throw new Error('OpenAI 未返回图片 URL')
  return url
}

export async function POST(req: NextRequest) {
  try {
    const { avatarUrl, pokemonName, pokemonNameZh, pokemonId } = await req.json()

    if (!avatarUrl || !pokemonName) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 })
    }

    console.log(`[generate] provider=${PROVIDER}, pokemon=${pokemonName}`)

    // Step 1: Vision — describe the avatar
    const visionClient = getVisionClient()
    const visionRes = await visionClient.chat.completions.create({
      model: PROVIDER === 'siliconflow' ? SF_VISION_MODEL : OAI_VISION_MODEL,
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: "Describe this person's appearance briefly: face shape, hair color and style, skin tone, any distinctive features. Keep it under 80 words.",
            },
            {
              type: 'image_url',
              image_url: {
                url: avatarUrl,
                // detail 参数仅 OpenAI 支持，SiliconFlow 不支持
                ...(PROVIDER === 'openai' ? { detail: 'low' } : {}),
              },
            },
          ],
        },
      ],
    })

    const personDescription = visionRes.choices[0]?.message?.content ?? 'a person'
    console.log(`[generate] description: ${personDescription}`)

    // Step 2: Image generation — MS Paint fusion
    const prompt = FUSION_PROMPT(personDescription, pokemonName, pokemonNameZh)

    const imageUrl =
      PROVIDER === 'siliconflow'
        ? await generateImageSiliconflow(prompt)
        : await generateImageOpenAI(visionClient, prompt)

    return NextResponse.json({ imageUrl })
  } catch (err: unknown) {
    console.error('[generate] error:', err)
    // Log response body if available (helps debug SiliconFlow 400/422 errors)
    if (err && typeof err === 'object' && 'response' in err) {
      try {
        const body = await (err as { response: Response }).response.text()
        console.error('[generate] response body:', body)
      } catch {}
    }
    const message = err instanceof Error ? err.message : '服务器错误'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
