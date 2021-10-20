import axios from 'axios'

export async function request<Interface>(url: string): Promise<Interface | undefined> {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    return undefined
  }
}
