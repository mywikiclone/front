import { Bakbak_One } from "next/font/google";
import { txtfilter,video_filtering,img_src_filtering } from "./txtfilter";






const TextEngine=(text,MyClass)=>{

   
    text=txtfilter(text);


    const backendurl=process.env.NEXT_PUBLIC_BACK_END_URL;



    //큰 요소들 모음.
    let reg_exp_big_title=/=_=.*?=_=/
    let reg_exp_small_title=/=-=.*?=-=/
    let intro_free_box_pattern=/====.*?====/g;
    let intro_free__detail_box_pattern=/___.*?___/g;
   

    //작은 요소들 모음
    let reg_exp_foot_note=/@.*?@/g
    let reg_exp_foot_note_strs=/!.*?!/g
    let stylingpatten=/---.*?---/g;
    let free_div_box_pattern=/__.*?__/g;
       //순서대로 일반div,img,iframe.a태그들이다. 왜이리했는지는 물어보지마쇼 ㅋ; 애내들도 작은 요소에해당된다.
    let combined_pattern = /__.*?__|\&\&\&.*?\&\&\&|\*.*?\*|\$\$.*?\$\$/g;
    let y1=/__.*?__/g;
    let img_pattern=/\&\&\&.*?\&\&\&/g;
    let iframe_pattern=/\*.*?\*/g;
    let a_pattern=/\$\$.*?\$\$/g
    let src_pattern=/\^\^\^.*?\^\^\^/g;

    //기타 도움 함수

    const stylingpattern_apply=(contents)=>{

        if(contents.match(stylingpatten)){

          let styling_split=contents.split("---");
    
        



          return `${styling_split[1]}`;
        }
        return  "";
      }


    const linkpattern_apply=(contents)=>{

        if(contents.match(src_pattern)){
  
          let link=contents.split("^^^");
  
  
  
          return link[1];
        }
  
  
        return "";
  
      }
  
    if(text.match(intro_free_box_pattern)!==null){
      text=text.replace(intro_free_box_pattern,(match)=>{
        let middle_text=match.split("====");
        if(middle_text[1]==="끝"){
            MyClass.init_intro_check();


            
            return  "";
        }


        let styles=stylingpattern_apply(match);

        MyClass.set_intro_check();
        MyClass.set_intro_index(`<div id="introduction" class="w-fit p-[10px] border-solid border-slate-400 border-[1px] text-[20px]">목차`);
        if(styles.length===0){


            MyClass.set_frame(`<div id="intro_box" class="w-full h-fit flex justify-between">`)
            return "";
  
          }
  

          MyClass.set_frame(`<div id="intro_box" class="${styles} flex-justify-between">`)
          
          return "";
  
  
  
      })

      
    }




    if(text.match(reg_exp_big_title)!==null){

    


      text=text.replace(reg_exp_big_title,(match)=>{


        let middle_text=match.split("=_=");


        if(middle_text[1]==="끝"){



            return  "</div></div></div>"
        }



        let big_box=`<div id=${MyClass.getBig()+1} class="w-full big_area  h-auto bg-white">`
        let img_box=`<div class="flex  content-center justify-content w-full h-fit border-b-2 border-solid border-gray-300 text-[20px]"><img  src="../../../arrow_down.svg" class="pointer-events-none w-[30px]  h-[30px]" ></img>${MyClass.getBig()+1}.${middle_text[1]}</div>`;
        let content_area=`<div class="w-full h-auto bg-white "><div class="m-[10px] text-[15px]">`

        //최종적으로닫아야할 태그는 3개.

        MyClass.increment();
        MyClass.init_small();
        MyClass.add_big_title_list(middle_text[1])
        
      
        return big_box+img_box+content_area

      })
      
    }


    if(text.match(reg_exp_small_title)!==null){
     
     text=text.replace(reg_exp_small_title,(match)=>{


        let middle_text=match.split("=-=");


        if(middle_text[1]==="끝"){



            return  "</div></div></div>"
        }

        MyClass.increment_small();

        let small_box=`<div id=${MyClass.getBig()}.${MyClass.getSmall()} class="w-full small_area h-auto bg-white">`
        let img_box=`<div class="flex  content-center justify-content w-full h-fit border-b-2 border-solid border-gray-300 text-[20px]"><img  src="../../../arrow_down.svg" class="pointer-events-none w-[30px]  h-[30px]" ></img>${MyClass.getBig()}.${MyClass.getSmall()} .${middle_text[1]}</div>`
        let content_area=`<div class="w-full h-auto bg-white "><div class="m-[10px]  text-[15px]">`

        //닫아야할 태그 똒같이 3개
        
        
        MyClass.add_small_object(MyClass.getBig(),middle_text[1]);
        return small_box+img_box+content_area;

      })


      return text;
    }


    


    if(text.match(intro_free__detail_box_pattern)!==null){
     
     text=text.replace(intro_free__detail_box_pattern,(match)=>{
        let middle_text=match.split("___");
        if(middle_text[1]==="끝"){



            return  "</div>"
        }


              
        let styles=stylingpattern_apply(match);
        if(styles.length===0){

          
          return `<div class="w-fit h-fit">`;

        }

        return `<div class="${styles}">`;



      })

     
    }
    
    if(text.match(reg_exp_foot_note)!==null){
      
      text=text.replace(reg_exp_foot_note,(match)=>{
        //각주 처리 규칙 @각주가 들어갈 내용!각주 내용!@ 이런식으로 구성.
        let x=match.split("@");
        let x2=x[1].split("!");
          

        let x3=`<div class="sup_href relative inline-block h-fit w-fit">${x2[0]+x2[2]}<sup class="text-blue-500 h-fit w-fit" id="footnote-${MyClass.get_footnote_list().length+1}" data-ex="${x2[1]}"><a href="#footnote${MyClass.get_footnote_list().length+1}">[${MyClass.get_footnote_list().length+1}]</a></sup></div>`
        let x4=`<div class="text-[15px] text-black h-fit w-full my-[10px] " id="footnote${MyClass.get_footnote_list().length+1}"><a href=#footnote-${MyClass.get_footnote_list().length+1} className="text-blue">[${MyClass.get_footnote_list().length+1}]</a>:${x2[1]}</div>`

      

        MyClass.add_footnote_list(x4);


        return x3;



      })
    }

    if(text.match(img_pattern)!==null){    
    
      text=text.replace(img_pattern,(match)=>{
        
        let x=match.split("&&&");
        let links=linkpattern_apply(match);
        let styles=stylingpattern_apply(match);
      
        links=img_src_filtering(`${backendurl}applyimg/${links}`);
        x[0]=`<img class="${styles}" src="${links}">`
        x[1]=""
        x[2]="</img>"
        x=x.join(" ")
        return x;

     })
    }

    if(text.match(iframe_pattern)!==null){
    
      text=text.replace(iframe_pattern,(match)=>{
   
        let x=match.split("*");
        let links=linkpattern_apply(match);
        let styles=stylingpattern_apply(match);
        links=video_filtering(links);
        x[0]=`<iframe class="${styles}" src="${links}" allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture">`
        x[1]=""
        x[2]="</iframe>"
        x=x.join(" ")
        return x;


      })
    }

    if(text.match(free_div_box_pattern)!==null){

   
      text=text.replace(free_div_box_pattern,(match)=>{
        //각주 처리 규칙 @각주가 들어갈 내용!각주 내용!@ 이런식으로 구성.

        let middle_text=match.split("__");
     

        if(middle_text[1]==="끝"){


            return "</div>";
        }


        let styles=stylingpattern_apply(match);

        if(styles===""){

          return `<div class="w-fit h-fit">`
        }



        return `<div class="${styles}">`;

    })
  
    }

    if(text.match(a_pattern)!=null){
     
      text=text.replace(a_pattern,(match)=>
      {
        let x=match.split("$$");


        let links=linkpattern_apply(x[1]);
        let t=x[1].split("^^^");
   
        return `<a href="${links}" class="text-blue" target="_blank">${t[0]+t[2]}</a>`



      })


    
    }

    if(text.match("각주리스트")!==null){

    

      let footnote=`<div id="footnote" class="w-full h-fit border-t border-solid border-black">`

      let y=MyClass.get_footnote_list();
      y.map((x)=>{
          

          footnote+=x;

          return x;
      })
      


      MyClass.init_footnote_list();
      return footnote+"</div>";


    }


    if(text.match("intro_index")!==null){
      let introduction=MyClass.get_intro_index();
      if(introduction!==""){



        //let introduction=`<div id="introduction" class="w-fit border-solid border-slate-400 border-[1px] text-[20px]">목차`


        if(MyClass.getBig()>0){
        let obj=MyClass.get_my_object();        
          let ul=`<ul class="pl-[10px]">`
          introduction+=ul
          MyClass.get_big_title_list().map((x,idx)=>{
       
            
     
            let li=`<li class="mb-[10px] text-[15px]"><a class="text-blue-400" href=#${idx+1}>${idx+1}</a>.${x}</li>`
            let ul2=`<ul class="pl-[10px]">`
            if(obj[idx+1]!==undefined){
              obj[idx+1].map((x,index)=>{
              
                let li2=`<li class="mb-[10px] text-[15px]"><a class="text-blue-400" href=#${idx+1}.${index+1}>${idx+1}.${index+1}</a>.${x}</li>`
                ul2+=li2
                })
          
              ul2+='</ul>'
              introduction+=(li+ul2)
    
            }
            else{

              introduction+=li;
            }
          })
        }
        introduction+="</ul>"
       
        MyClass.init_big_title_list();
        MyClass.init_object();
        MyClass.init_big();

        introduction+="</div>"

        MyClass.set_intro_index(introduction);
        //return introduciton;
        return  "";
      }
      else{
        MyClass.init_big_title_list();
        MyClass.init_object();
        MyClass.init_big();

        return "";
      }
    }



    if(text.match("intro")!==null){



      let frame=MyClass.get_frame();
      let frame_inside=MyClass.get_frame_inside();
      let frame_index=MyClass.get_intro_index();
      MyClass.init_frames();


      return frame+frame_index+frame_inside+"</div>";

    }


    

    if(MyClass.get_intro_check()){
 
      MyClass.set_frame_insdie(MyClass.get_frame_inside()+text);
   

      return "";
    }

   
    return text;


}


export default TextEngine;




