import { signal } from "@preact/signals";
import Cookies from 'js-cookie'

export interface UserRecord {
  id: number
  email: string
}

export const user = signal<UserRecord>(undefined);

// Warning - reloads page if bad cookie

if (typeof process === 'undefined')  {
  if (Cookies.get('nostril-auth')) {
    try{
      user.value = JSON.parse(Cookies.get('nostril-auth').match(/(\{.+?\})/)[1])
    }catch(e){
      Cookies.remove('nostril-auth')
      window.location.reload()
    }
  }
} else {
  // node 
}

