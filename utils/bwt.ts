import * as bwt from "https://denopkg.com/chiefbiiko/bwt@v0.5.0/mod.ts"

const tokenMaganer: any = { ...bwt.generateKeyPair() }

tokenMaganer.stringify = bwt.createStringify(tokenMaganer.secretKey, {
  kid: tokenMaganer.kid,
  publicKey: tokenMaganer.publicKey
})

tokenMaganer.parse = bwt.createParse(tokenMaganer.secretKey, {
  kid: tokenMaganer.kid,
  publicKey: tokenMaganer.publicKey
})

export function sign(email: string) {
  const iat = Date.now()
  const exp = iat + 1000000

  const token = tokenMaganer.stringify(
    { typ: bwt.Typ.BWTv0, kid: tokenMaganer.kid, iat, exp },
    { email }
  )

  return token
}

function decodeToken(token: string) {
  const content = tokenMaganer.parse(token)
  return !content ? false : true
}

export async function validateToken(context: any, next: any) {
  try {
    const authorization = context.request.headers.get('authorization')

    if (!authorization) {
      throw new Error('Missing token')
    }

    if (authorization.indexOf('Bearer ') == -1) {
      throw new Error('Invalid token')
    }

    const token = authorization.replace('Bearer ', '')
    const isValid = decodeToken(token)

    if (!isValid) {
      throw new Error('Invalid token')
    }

    await next()
  } catch (error) {
    context.response.body = { error: error.message }
    context.response.status = 400
  }
}