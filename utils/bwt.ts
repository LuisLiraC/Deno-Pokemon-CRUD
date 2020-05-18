import * as bwt from "https://denopkg.com/chiefbiiko/bwt@v0.5.0/mod.ts"

const tokenGenerator: any = { ...bwt.generateKeyPair()}
const tokenDecoder: any = { ...bwt.generateKeyPair()}

tokenGenerator.stringify = bwt.createStringify(tokenGenerator.secretKey, {
  kid: tokenDecoder.kid,
  publicKey: tokenDecoder.publicKey
})

tokenDecoder.parse = bwt.createParse(tokenDecoder.secretKey, {
  kid: tokenGenerator.kid,
  publicKey: tokenGenerator.publicKey
})

export function sign(email: string) {

  const iat = Date.now()
  const exp = iat + 1000000

  const token = tokenGenerator.stringify(
    { typ: bwt.Typ.BWTv0, kid: tokenGenerator.kid, iat, exp },
    { email }
  )

  return token
}

function decodeToken(token: string) {

  const content = tokenDecoder.parse(token)

  if (!content) {
    return false
  }

  return true
}


export async function validateToken(context: any, next: any) {
  try {    
    const authorization = context.request.headers.get('authorization')
  
    if(!authorization) {
      throw new Error('Missing token')
    }

    if(authorization.indexOf('Bearer ') == -1) {
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