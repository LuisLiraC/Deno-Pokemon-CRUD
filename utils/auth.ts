import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"

export function hashPwd(pwd: string) {
  const salt = bcrypt.gensalt(10)
  const hashedPwd = bcrypt.hashpw(pwd, salt)
  return hashedPwd
}

export function comparePwd(pwd: string, dbPwd: string) {
  const result = bcrypt.checkpw(pwd, dbPwd)
  return result
}