
//Provider of Data create a customFetch in TypeScript

import { GraphQLClient } from "@refinedev/nestjs-query";
import { message } from "antd";
import {GraphQLFormattedError} from "graphql";

// interface to expesify the dataType using for hanging the  error 
type Error = {
    message : string;
    statusCode:string;
}

const customFetch = async (url:string, options:RequestInit) => {
    const accessToken = localStorage.getItem('access_Token');

    const headers = options.headers as Record <string,string>;

    return await fetch(url,
        {...options
            ,headers: {
            ...headers, 
            Authorization: headers?.Authorization || `Bearer ${accessToken}`,
            "Content-Type": "application/json", "Apollo-Require-Preflight":"true"
        }
   });
}

const getGraphQLErrors = (body:Record<"errors",GraphQLFormattedError[] | undefined>) : 
Error | null => {
    if(!body){
        return {
            message: "Unknown error",
            statusCode: "Internal_Server_Error"
        }
    }
    if("errors"in body){
        const errors = body?.errors;
        const messages = errors?.map((err) => err?.message)?.join("");
        const code = errors?.[0]?.extensions?.code;

        return {
            message:messages || JSON.stringify(errors),
            statusCode: code || 500
        }
    }
    return null;
}

export const fetchWrapper = async(url:string , options: RequestInit) => {
    const res = await customFetch(url,options);
    const responseClone = res.clone();
    const body = await responseClone.json();

    const error = getGraphQLErrors(body);
    if(error){
        throw error;
    }
    return res;
}

