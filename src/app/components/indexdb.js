"use client"
import { makebase64 } from "./action";
export const get_db=()=>{
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('mainboard_db');

      request.onsuccess = (event) => {
          resolve(event.target.result); // 성공 시 데이터베이스 반환
      };
      request.onupgradeneeded=(event)=>{
        let req=event.target.result;
        
        if(!req.objectStoreNames.contains("image")){

          req.createObjectStore("img_store",{keyPath:"id"});
          console.log("db생성")

        }



      }

      request.onerror = (event) => {
          reject(event.target.error); // 오류 시 오류 객체 반환
      };
  });



  }


export  const get_data_from_db=(db,store_name,idx)=>{
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(store_name, 'readwrite');
      const store = transaction.objectStore(store_name);
      const request = store.get(idx);

      request.onsuccess = (event) => {
          resolve(event.target.result); // 성공 시 데이터 반환
      };

      request.onerror = (event) => {
        console.log("getdatafromdb 에러:",idx);
          reject(event.target.error); // 오류 시 오류 객체 반환
      };
  });



  }


export  const add_data_in_db=(db,store_name,idx,base64string)=>{

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(store_name, 'readwrite');
      const store = transaction.objectStore(store_name);
      const request = store.add({id:idx,data:base64string});

      request.onsuccess = (event) => {
        
          resolve(event.target.result); // 성공 시 데이터 반환
      };

      request.onerror = (event) => {
          reject(event.target.error); // 오류 시 오류 객체 반환
      };
  });
}

export const check_in_db=async (store_name,idx,url,ref_object,idx_plus)=>{
  let db=await get_db();
 
  let data=await get_data_from_db(db,store_name,idx+idx_plus)
 
  let base64string="";   
  if(data===undefined){
    base64string=await makebase64(url)
    console.log("에러체크:",ref_object,idx);
    let x= await add_data_in_db(db,store_name,idx+idx_plus,base64string)
    ref_object.current.src=base64string;
  }
  else{
  
  ref_object.current.src=data.data;
  }




}

