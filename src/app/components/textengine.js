class MyClass {
  static big_number = 0;


  static small_number=0;

  static frame="";

  static intro_index="";


  static intro_check=false;

  static frame_inside="";


  static big_title=null;


  static small_object={};

  static foot_note_list=[];


  static big_title_list=[];
  

  static set_intro_check(){
    this.intro_check=true;
  }

  static get_intro_check(){
    return this.intro_check;

  }

  static init_intro_check(){
    this.intro_check=false;

  }

  static init_frames(){
    this.frame="";
    this.intro_index="";
    this.frame_inside="";
  }


  static set_frame(data){
    this.frame=data;
  }
  static get_frame(){


    return this.frame;
  }
  static set_intro_index(data){
    this.intro_index=data;
  }
  static get_intro_index(){


    return this.intro_index;
  }
  static set_frame_insdie(data){
    this.frame_inside=data;
  }
  static get_frame_inside(){


    return this.frame_inside;
  }



  static set_big_title(){


    this.big_title="yes"
  }
  static get_big_title(){


    return this.big_title;
  }
  static init_big_title(){

    this.big_title=null;
  }
  
  static add_big_title_list(data){
    this.big_title_list.push(data);
  }
  static get_big_title_list(){


    return this.big_title_list;
  }
  static init_big_title_list(){
    this.big_title_list=[];
  }
  static add_small_object(key,value){

    if(this.small_object[key]===undefined){

      this.small_object[key]=[]

      this.small_object[key].push(value);


      return ;
    }

   this.small_object[key].push(value);


    return ;
  }
  static get_my_object(){



    return this.small_object;
  }
  static init_object(){


    this.small_object={};


    return ;
  }
  static increment() {
      this.big_number++;
  }
  static increment_small() {
    this.small_number++;
  }
  static init_big(){
    this.big_number=0;
   }
  static init_small(){
   this.small_number=0;
  }
  static getBig() {
      return this.big_number;
  }
  static getSmall() {
    return this.small_number;
  }
  static add_footnote_list(data){
    this.foot_note_list.push(data);
  }
  static get_footnote_list(){


    return this.foot_note_list;
  }

  static init_footnote_list(){
    this.foot_note_list=[];
  }
}





const TextEngine=(text)=>{

   


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


            console.log("인트로체크:",MyClass.get_intro_check());
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
      console.log("introfreedetail")
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
      console.log("regexpfootnote")
      text=text.replace(reg_exp_foot_note,(match)=>{
        //각주 처리 규칙 @각주가 들어갈 내용!각주 내용!@ 이런식으로 구성.
        let x=match.split("@");
        let x2=x[1].split("!");
          

        let x3=`<div class="sup_href relative inline-block">${x2[0]+x2[2]}<sup class="text-blue-500 h-fit w-fit" id="footnote-${MyClass.get_footnote_list().length+1}" data-ex="${x2}"><a href="#footnote${MyClass.get_footnote_list().length+1}">[${MyClass.get_footnote_list().length+1}]</a></sup></div>`
        let x4=`<div class="text-[15px] text-black h-fit w-full my-[10px] " id="footnote${MyClass.get_footnote_list().length+1}"><a href=#footnote-${MyClass.get_footnote_list().length+1} className="text-blue">[${MyClass.get_footnote_list().length+1}]</a>:${x2[1]}</div>`

      

        MyClass.add_footnote_list(x4);


        return x3;



      })
    }

    if(text.match(img_pattern)!==null){    
      console.log("imgpattern")
      text=text.replace(img_pattern,(match)=>{
        
        let x=match.split("&&&");
        let links=linkpattern_apply(match);
      
      
        x[0]=`<img class="${styles}" src="${links}">`
        x[1]=""
        x[2]="</img>"
        x=x.join(" ")
        return x;

     })
    }

    if(text.match(iframe_pattern)!==null){
      console.log("iframe")
      text=text.replace(iframe_pattern,(match)=>{
   
        let x=match.split("*");
        let links=linkpattern_apply(match);
        let styles=stylingpattern_apply(match);
      
        x[0]=`<iframe class="${styles}" src="${links}" allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture">`
        x[1]=""
        x[2]="</iframe>"
        x=x.join(" ")
        return x;


      })
    }

    if(text.match(free_div_box_pattern)!==null){

      console.log("freediv")
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
      console.log("apattern");
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

    console.log("틀밖으로 텍스트가 들어감.")
    return text;


}
const show_window=()=>{
  current_big_list_box.current=null;
  current_small_list_box.current=null;
  if(show_preview!==true){
  compiler_data.current=[];
  let txtarea=document.getElementsByClassName("texts")
  let strs=""


  let reg_exp_big_title=/===.*?===/
  let reg_exp_small_title=/==.*?==/
  let reg_exp_foot_note=/@.*?@/g
  let reg_exp_foot_note_strs=/!.*?!/g
  let stylingpatten=/---.*?---/g;
  let intro_free_box_pattern=/====.*?====/g;
  let intro_free__detail_box_pattern=/___.*?___/g;
 
  let free_div_box_start=/__시작__/g;

  let free_div_box_end=/__끝__/g;



  let foot_note_list=[]
  let big_title_list=[]
  let small_title_list=[]
  
  let footnote_idx=0;
  
  let strs_list=[]

  let small_list_num=1;

  let free_div_stack=[];





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


  




  set_compiler_text([])
  Array.from(txtarea).map((x)=>{
    
    compiler_data.current=[...compiler_data.current,{id:x.id,text:x.value,height:(x.scrollHeight+"px")}]
 
    let texts=x.value;


  

    if(texts.match(reg_exp_foot_note)!=null){
        let data=texts.match(reg_exp_foot_note);
        data=data.map((x)=>{
          let y=x.split("@");
  
          return y[1];


        })
        let data2=texts.match(reg_exp_foot_note_strs);
        data2=data2.map((x)=>{


          let y=x.split("!");
       
          return y[1]; 
        })
 
        
        let idx=0;
        texts=texts.replace(reg_exp_foot_note,()=>{
          footnote_idx+=1;
          foot_note_list.push(`<div class="text-[15px] text-black h-fit w-full my-[10px] " id="footnote${footnote_idx}"><a href=#footnote-${footnote_idx} className="text-blue">[${footnote_idx}]</a>:${data2[idx]}</div>`)
          return `<div class="sup_href relative inline-block">${data[idx]}<sup class="text-blue-500 h-fit w-fit" id="footnote-${footnote_idx}" data-ex="${data2[idx]}"><a href="#footnote${footnote_idx}">[${footnote_idx}]</a></sup></div>`
          //`<div class="sup_href relative">${data[idx++]}<sup class="text-blue-500  h-fit w-fit"><a href="#footnote${footnote_idx}">[${footnote_idx}]</a></sup></div>`
      })
    
  
      texts=texts.replace(reg_exp_foot_note_strs,()=>{
        return "";
      })
   

    }

    if(texts.match(intro_free_box_pattern)!=null){

      let styles=stylingpattern_apply(texts);
  


   
      if(styles.length===0){

        return ;

      }


      current_intro_box.current=`<div class="${styles}">`


      return ;



    }
    if(texts.match(intro_free__detail_box_pattern)!=null){
    
      let styles=stylingpattern_apply(texts);
      if(styles.length===0){

        current_free_detail_box.current=`<div class="w-fit h-fit"></div>`
        intro_free_detail_box_list.push(current_free_detail_box.current);
        return ;

      }


      current_free_detail_box.current=`<div class="${styles}"></div>`
      intro_free_detail_box_list.push(current_free_detail_box.current);

      return ;




    }

    if(texts.match(free_div_box_start)!=null){

      let styles=stylingpattern_apply(texts);
      free_div_stack.push(`<div class=${styles}></div>`);



      return ;

    }



    

    if(texts.match(reg_exp_big_title)!=null){
    





      let middletext=texts.split("===")
  
      let big_box=`<div id=${big_title_list.length+1} class="w-full big_area  h-auto bg-white">`
      let img_box=`<div class="flex  content-center justify-content w-full h-fit border-b-2 border-solid border-gray-300 text-[20px]"><img  src="../../../arrow_down.svg" class="pointer-events-none w-[30px]  h-[30px]" ></img>${big_title_list.length+1}.${middletext[1]}</div>`;
      let text_area=`<div class="w-full h-auto bg-white "><div class="m-[10px] text-[15px]"><end>`
      current_big_list_box.current=big_box+img_box+text_area;
      strs_list.push(current_big_list_box.current)
      //big_list_and_small_list_relation[strs_list.length-1]=[];
      big_title_list.push(middletext[1]);
      small_title_list[big_title_list.length-1]=[];


      current_small_list_box.current=null
      small_list_num=1
    
      return;
    }
    else if(texts.match(reg_exp_small_title)!=null){



      let middletext=texts.split("==")
     
      let small_box=`<div id=${big_title_list.length}.${small_list_num} class="w-full small_area h-auto bg-white">`
      let img_box=`<div class="flex  content-center justify-content w-full h-fit border-b-2 border-solid border-gray-300 text-[20px]"><img  src="../../../arrow_down.svg" class="pointer-events-none w-[30px]  h-[30px]" ></img>${big_title_list.length}.${small_list_num}.${middletext[1]}</div>`
      let text_area=`<div class="w-full h-auto bg-white "><div class="m-[10px]  text-[15px]"><end>`
     
      current_small_list_box.current=small_box+img_box+text_area
     
      strs_list.push(current_small_list_box.current)
      
      
      small_title_list[big_title_list.length-1].push(middletext[1]);
      small_list_num+=1
 
      return;
    }



    else if(!texts.endsWith("</img>")){

      if(current_small_list_box.current===null&&current_big_list_box.current===null){
       
        let contents=current_free_detail_box.current.split("</div>")

        contents.pop()

        contents.push(texts+"</div>")


        contents=contents.join(" ")


        current_free_detail_box.current=contents;

        intro_free_detail_box_list.pop();
        intro_free_detail_box_list.push(current_free_detail_box.current);



        return ;






        /*texts+="<br/>"
        strs+=texts
        
        return ;*/
      }
      else if(current_small_list_box.current===null&&current_big_list_box.current!==null){
 
  
        let bigs_list=current_big_list_box.current.split("<end>")
       
        bigs_list.pop()
        bigs_list.push(texts+"<br/><end>")
        bigs_list=bigs_list.join(" ")
      
        current_big_list_box.current=bigs_list
        strs_list.pop()
        strs_list.push(bigs_list)
      
      
        return ;
      }

      
   
      let small_list=current_small_list_box.current.split("<end>")
     
      small_list.pop()
      small_list.push(texts+"<br/><end>")
      small_list=small_list.join(" ")
      current_small_list_box.current=small_list
      strs_list.pop()
      strs_list.push(small_list)
 

      return ;


      
    }
  
   
    else{
      strs+=texts
    return;
    }

  })
 

  
  if(strs_list.length>0){

    strs_list=strs_list.map((x,idx)=>{


      return x.replace(/<end>/g,"</div></div></div>")


    })
    strs+=strs_list.join(" ")

  }
  let introduction=`<div id="introduction" class="w-fit border-solid border-slate-400 border-[1px] text-[20px]">목차`
  if(big_title_list.length>0){
    
    let ul=`<ul class="pl-[10px]">`
    introduction+=ul
    big_title_list.map((x,idx)=>{
    let li=`<li class="mb-[10px] text-[15px]"><a class="text-blue-400" href=#${idx+1}>${idx+1}</a>.${x}</li>`
    let ul2=`<ul class="pl-[10px]">`
    small_title_list[idx].map((x,index)=>{
        
          let li2=`<li class="mb-[10px] text-[15px]"><a class="text-blue-400" href=#${idx+1}.${index+1}>${idx+1}.${index+1}</a>.${x}</li>`
          ul2+=li2
      })
    
      ul2+='</ul>'
      introduction+=(li+ul2)

    })
    introduction+="</ul>"
    }

    introduction+="</div>"

    intro_free_detail_box_list.map((x,idx)=>{


      current_intro_box.current+=x;




    })


    current_intro_box.current+="</div>";



    let introduction_box_set=`<div class="flex w-full h-fit justify-between">${introduction}${current_intro_box.current}</div>`



    strs=introduction_box_set+strs;
  
    intro_free_detail_box_list=[];

    current_intro_box.current="<div class=w-fit h-fit>";


  






 if(foot_note_list.length>0){

    let footnote=`<div id="footnote" class="w-full h-fit border-t border-solid border-black">`
    foot_note_list.map((x)=>{
        

        footnote+=x;

        return x;
    })
    strs+=footnote+"</div>"

  }
  let src_pattern=/\^\^\^.*?\^\^\^/g;

  let y1=/__.*?__/g;
  let y2=/\&\&\&.*?\&\&\&/g;
  let y3=/\*.*?\*/g;
  let y4=/\$\$.*?\$\$/g
  //순서대로 일반div,img,iframe.a태그들이다. 왜이리했는지는 물어보지마쇼 ㅋ;'
 let combined_pattern = /__.*?__|\&\&\&.*?\&\&\&|\*.*?\*|\$\$.*?\$\$/g;

 
  
  strs=strs.replace(combined_pattern,(match)=>{

      let styles=stylingpattern_apply(match);
    
      if(match.match(y1)!=null){
       let x=match.split("__");
        x[0]=`<div class="${styles}">`
        x[2]="</div>"
        x=x.join(" ")
        return x;
      
      }

      if(match.match(y2)!=null){

        console.log("group2:",match)
        let x=match.split("&&&");
        let links=linkpattern_apply(match);
      
      
        x[0]=`<img class="${styles}" src="${links}">`
        x[1]=""
        x[2]="</img>"
        x=x.join(" ")
        return x;
      }

      if(match.match(y3)!=null){
        let x=match.split("*");

        console.log("group3:",x);
        let links=linkpattern_apply(match);
        x[0]=`<iframe class="${styles}" src="${links}" allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture" >`
        x[1]=""
        x[2]="</iframe>"
        x=x.join(" ")
        return x;
      }

      if(match.match(y4)!=null){


        let x=match.split("$$");

        console.log("group4:",x);
        let links=linkpattern_apply(match);

        x[0]=`<a href="${links}" class="${styles}">`
        x[1]="test"
        x[2]="</a>"
        x=x.join(" ")

        return x;
      }
    
      return match

  })

  set_preview_text(strs)
  set_show_preivew(true)
  set_deafult_view(false)
  
  } 
}


export default TextEngine;




