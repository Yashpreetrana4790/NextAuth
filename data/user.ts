import { db } from "@/lib/db"




export const GetUserByEmail = async (email: string) => {
  try {



    const user = await db.user.findUnique({
      where: {
        email
      }
    })

    return user

  } catch (e) {
    console.error(e)
    return null
  }
}


export const GetUserById = async (id: string) => {
  try {

    const user = await db.user.findUnique({
      where: {
        id
      }
    })

    return user

  } catch (error) {
    return error
  }
}
