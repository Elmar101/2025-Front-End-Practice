import { useEffect, useState } from "react";

export const useDebounce = ({value, ms=100}: {value: string, ms: number}) =>{
   const [debouncedValue, setDebouncedValue] = useState<string>('');

   useEffect(()=>{
     const intervalId = setTimeout(()=>{
        setDebouncedValue(value);
     }, ms);

     return ()=>{
        clearTimeout(intervalId);
     }
   }, [value, ms]);

   return debouncedValue;
}