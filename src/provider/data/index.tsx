import graphqlDataProvider,{ 
    GraphQLClient, 
    liveProvider as graphqlLiveProvider
} from "@refinedev/nestjs-query";
import {createClient} from 'graphql-ws'
import {fetchWrapper} from "./fetch-wrapper"


export const API_BASE_URL = 'https:api.crm.refine.dev'
export const API_URL = `${API_BASE_URL}/graphql`
export const WS_URL = 'wss://api.crm.refine.dev/graphql'

export const client = new GraphQLClient(API_URL,{
    fetch:(url:string,options:RequestInit) => {
        try{
            return fetchWrapper(url,options);

        } catch (err){
            return Promise.reject(err as Error)
        }
    }
})

// web socket to lisent to it. 

// live provide to update the application with a real changes on real time.

export const wsClient = typeof window !== "undefined"
? createClient({
    url:WS_URL,
    connectionParams:() => {
        const accessToken = localStorage.getItem("access_token");
        return {
            header: {
                Authorization : `Bearer ${accessToken}`
            }
        }
    }
}) : undefined

//get a data provider to request the data we need

export const dataProvider = graphqlDataProvider(client);
// get a data provider to get subscrition into the page

export const liveProvider = wsClient ?  graphqlLiveProvider(wsClient) : undefined

