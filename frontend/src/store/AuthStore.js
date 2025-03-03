import {create} from "zustand"
import {persist,devtools, createJSONStorage} from "zustand/middleware"

export const useUserStore = create(devtools(persist((set)=>(
    {
        userData:null,
        IsAuthenticated:false,
        tokens:{
            access:null,
            refresh:null,
        },
        setlogin:(userdata)=>set(()=>({
            userData:userdata,
            IsAuthenticated:true,
        })),
        setlogout:(userdata)=>set(()=>({
            userData:null,
            IsAuthenticated:null,
        }))
    }
)),
{
name:"UserState",
storage:(createJSONStorage(()=>sessionStorage))
}))

