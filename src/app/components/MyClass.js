class MyClass {
     big_number = 0;
  
  
     small_number=0;
  
     frame="";
  
     intro_index="";
  
  
     intro_check=false;
  
     frame_inside="";
  
  
     big_title=null;
  
  
     small_object={};
  
     foot_note_list=[];
  
  
     big_title_list=[];
    
  
     set_intro_check(){
      this.intro_check=true;
    }
  
     get_intro_check(){
      return this.intro_check;
  
    }
  
     init_intro_check(){
      this.intro_check=false;
  
    }
  
     init_frames(){
      this.frame="";
      this.intro_index="";
      this.frame_inside="";
    }
  
  
     set_frame(data){
      this.frame=data;
    }
     get_frame(){
  
  
      return this.frame;
    }
     set_intro_index(data){
      this.intro_index=data;
    }
    get_intro_index(){
  
  
      return this.intro_index;
    }
   set_frame_insdie(data){
      this.frame_inside=data;
    }
     get_frame_inside(){
  
  
      return this.frame_inside;
    }
  
  
  
    set_big_title(){
  
  
      this.big_title="yes"
    }
   get_big_title(){
  
  
      return this.big_title;
    }
    init_big_title(){
  
      this.big_title=null;
    }
    
     add_big_title_list(data){
      this.big_title_list.push(data);
    }
     get_big_title_list(){
  
  
      return this.big_title_list;
    }
     init_big_title_list(){
      this.big_title_list=[];
    }
     add_small_object(key,value){
  
      if(this.small_object[key]===undefined){
  
        this.small_object[key]=[]
  
        this.small_object[key].push(value);
  
  
        return ;
      }
  
     this.small_object[key].push(value);
  
  
      return ;
    }
     get_my_object(){
  
  
  
      return this.small_object;
    }
     init_object(){
  
  
      this.small_object={};
  
  
      return ;
    }
     increment() {
        this.big_number++;
    }
     increment_small() {
      this.small_number++;
    }
     init_big(){
      this.big_number=0;
     }
     init_small(){
     this.small_number=0;
    }
     getBig() {
        return this.big_number;
    }
     getSmall() {
      return this.small_number;
    }
     add_footnote_list(data){
      this.foot_note_list.push(data);
    }
     get_footnote_list(){
  
  
      return this.foot_note_list;
    }
  
     init_footnote_list(){
      this.foot_note_list=[];
    }
  }


export default MyClass;
  