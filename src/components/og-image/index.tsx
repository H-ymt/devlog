import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { SITE_TITLE } from '../../consts'

const siteDomainName = 'evlog-xk2.pages.dev'
const fontFamily = 'Zen Kaku Gothic New'

export async function getOgImage(text: string) {
  const fontNormal = await fetchFont(SITE_TITLE + siteDomainName, fontFamily, 400)
  const fontBold = await fetchFont(SITE_TITLE + text, fontFamily, 700)

  const svg = await satori(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        backgroundImage: 'linear-gradient(to right bottom, #000, #121212)',
        padding: '42px 46px',
        fontFamily: `"${fontFamily}", sans-serif`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          rowGap: '24px',
          height: '100%',
          width: '100%',
          padding: '38px 38px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: '1',
            textOverflow: 'ellipsis',
            fontSize: '50px',
            fontWeight: 700,
            color: '#ffff',
            wordBreak: 'keep-all',
          }}
        >
          {text}
        </div>
      </div>
    </div>,
    {
      width: 1000,
      height: 667,
      fonts: [
        {
          name: fontFamily,
          data: fontNormal,
          weight: 400,
          style: 'normal',
        },
        {
          name: fontFamily,
          data: fontBold,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  )

  const resvg = new Resvg(svg)

  return resvg.render().asPng()
}

async function fetchFont(text: string, font: string, weight: number): Promise<ArrayBuffer> {
  const API = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text()

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (!resource) {
    throw new Error('Failed to fetch font')
  }

  const res = await fetch(resource[1])

  return res.arrayBuffer()
}
