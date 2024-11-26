"use client"

import { useEffect,useRef,useState } from "react";
import { useSelector } from "react-redux";
import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client";
import { useRouter } from "next/navigation";

const Chatting=()=>{
    const router=useRouter();
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const user_data=useSelector((state)=>state.current_userdata)
    const text_ref=useRef(null);
    const chat_main=useRef(null);
    const [open,set_open]=useState(false);
    const [count_num,set_count_num]=useState(0);
    const text_area=useRef(null);
    const [another_access,set_another_access]=useState(false);
    useEffect(() => {
        const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
        if(user_data.user_id===""){


            return ;
        }

        
        // SockJS 클라이언트를 통해 WebSocket 연결
        const socket = new SockJS(`${back_end_url}ws`, null, {
            // 쿠키를 포함시키기 위해 withCredentials을 true로 설정
            withCredentials: true,
        });

        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),  // 디버그 메시지
            onConnect: () => {
                console.log('STOMP connection established');

                // /topic/chatroom을 구독
                stompClient.subscribe('/topic/adminchatroom', (message) => {
                    console.log("message:",message);
                    //console.log('Received message body:',JSON.parse(message.body));
                    setMessages((prevMessages) => [...prevMessages,JSON.parse(message.body)]);

                });

                stompClient.subscribe(`topic/${user_data.user_id}`,(msg)=>{
                    console.log("로그인감지")
                    set_another_access(true);


                })
            },
           /* connectHeaders: {
                "Csrf_check":localStorage.getItem("csrf-token")
            },*/
            
            onDisconnect: () => {
                console.log('STOMP connection disconnected');
            },
            onStompError: (error) => {
                console.error('STOMP error: ', error);
            },
        });

        // 연결 활성화
        stompClient.activate();
        setStompClient(stompClient);

        // 컴포넌트가 언마운트될 때 연결 종료
        return () => {
            stompClient.deactivate();
        };
    }, [user_data]);


    const try_logout=async ()=>{
        alert("다른 환경에서 로그인하였습니다.")
        let data=await fetching_get_with_token_and_csrf(back_end_url+"logout")        
        localStorage.setItem("csrf-token",JSON.stringify(""));
        usedispatch({type:"Change_User",userdata:{user_id:""}})

        router.replace("/")
        window.location.reload()
        
    }


    useEffect(()=>{
        if(another_access){
           
            stompClient.deactivate();
            try_logout();



        
        }
    },[another_access])





    useEffect(()=>{
        if(open){
            set_count_num(count_num+1);
            return ;
        }
    },[messages])

    const find_enter=(event)=>{
        if(event.keyCode===13){
            event.preventDefault();//이거 textarea에쓰면 지금 enter키코드 13일떄 즉 enter가들어올때 줄바꿈을 방지
            
            sendMessage();
        }

        return ;
    }

    const sendMessage = () => {
      
        if (stompClient && stompClient.connected) {
            stompClient.publish({
                destination: '/app/adminchatroom',  // Spring 서버의 /app/chatroom 엔드포인트
                body: JSON.stringify({ sender:user_data.user_id,msg: text_ref.current.value }),
            });
            text_ref.current.value="";
         
           
        }
    };

    const closechat=()=>{
      
            set_open(true)
            
    }
    const openchat=()=>{
        set_open(false)
        set_count_num(0);
      
    }



    return (
        <div className="w-full h-fit">

            {user_data.user_id !=="" ?
            <div className="w-full h-fit   flex flex-col">
            {open ?

                <div onClick={openchat} className="w-[30px] h-[30px] flex justify-center items-center rounded-50p bg-white text-[15px]">
                  
                    {count_num}
                </div>  
                
            :
            <div ref={chat_main} className="w-full h-fit border-slate-300 border-solid border-[1px] bg-white">
            <div className="w-full h-fit flex justify-between">
            <h1>관리자 핫라인</h1>
            <button onClick={closechat} className="w-fit h-fit p-[5px]">x</button>
            </div>
            <div ref={text_area} className="w-full  flex flex-col  p-[10px] h-[300px] bg-blue-200 overflow-scroll overflow-x-hidden">
                {messages.map((x,idx)=>(

                    x.sender===user_data.user_id ?


                    <div key={idx} className="w-full  h-fit flex flex-col mb-[10px]">
                      <div className="w-fit h-fit text-[10px] mr-0 ml-auto">{x.sender}</div>
                        <div className="max-w-64 text-[10px] mr-0 ml-auto break-words  h-fit border-solid rounded-7p border-[1px] bg-yellow-300">{x.msg}</div>
                    </div>
                    
                  
                    :

                    <div key={idx} className="w-full h-fit flex flex-col mb-[10px]">
                      <div className="w-fit h-fit text-[10px] mr-auto ml-0">{x.sender}</div>
                        <div className="max-w-64 text-[10px] mr-auto ml-0 break-words h-fit border-solid rounded-7p border-[1px] bg-yellow-300">{x.msg}</div>
                    </div>
                ))
                }
            </div>
           
            <textarea onKeyDown={(event)=>find_enter(event)} ref={text_ref} className="outline-none resize-none w-full h-auto border-slate-300 border-solid border-[1px] overflow-auto overflow-x-hidden"></textarea>
            <button  onClick={sendMessage} className="w-full h-fit flex justify-center items-center p-[5px]" type="submit" >전송</button>
            </div>
            

            }
            </div>
         
            : null
            }
       
        </div>
    );



}


export default Chatting;