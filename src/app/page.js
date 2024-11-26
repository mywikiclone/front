"use client"

import { useEffect } from "react";
import Edit_Tutorial from "./components/editfortutorial";
import { fetching_get_with_no_token, fetching_post__with_token } from "./components/fetching";



export default function Home() {




  return (



      
    <div className="flex flex-col w-full h-fit justify-center items-center  mb-[20px]">
      <div className="lg:w-90p w-full h-fit text-[40px]">
        간단한 시작글
      </div>

      <div className="w-full h-fit flex flex-col items-center mb-[20px]" >
          <p className="lg:w-90p w-full text-[25px] text-blue-300 mb-[10px]">링크 넣기</p>
          <p className="lg:w-90p w-full text-[15px] mb-[10px]">링크를 넣고싶다면은 $$~~$$ 이런식으로 $$으로 열고 닫아주자.<br/> 특히 이미지 영상 링크들이 모두가지는 자료의 소스는
            내부에다가 ^^^ ~~^^^ 이런식으로 닫아주면 자동으로 값이들어간다.
          </p>
          <div className="w-full h-fit" >

            <Edit_Tutorial  ex_text={["$$예시^^^http://naver.com^^^$$"]}/>

          </div>
      </div>
      <div className="w-full h-fit flex flex-col items-center mb-[20px]">
          <p className="lg:w-90p w-full text-[25px] text-blue-300 mb-[10px]">작은 박스와 큰 박스</p>
          <p className="lg:w-90p w-full text-[15px] mb-[10px]">두 박스 모두 그안의 영역에 자유롭게 요소들을 넣을수있는 공간이다.<br/>
            둘의 차이점은 큰 박스는 작은 박스의 전제조건이며 또한 둘간의 차이는 색인에서 발생한다는 점이다.<br/>
            큰박스의 경우 =_=(큰 박스 제목)=_= ~~~~~ =_=끝=_= 이런식으로 끝과 처음을 정의해주고 그안에 원하는 내용을 넣어주면된다.<br/>
            작은 박스도 큰 박스와 비슷한 방식으로  =-=(작은 박스 제목)=-= ~~~ =-=끝=-=  이런식으로 적어주도록하자.<br/>
            참고로 큰박스,작은 박스,인트로 박스의 경우 자동완성이 있으므로 =_=(큰 박스 제목)=_= 적어도 마지막은 알아서 장식해준다.
          </p>
          <div className="w-full h-fit" >

          <Edit_Tutorial   ex_text={["=_=큰 박스=_=","dsfdsdfd","=_=끝=_=","=-=작은 박스=-=","dfdsfsdff","=-=끝=-="]}/>

          </div>
      </div>


      <div className="w-full h-fit flex flex-col items-center mb-[20px]">
          <p className="lg:w-90p w-full text-[25px] text-blue-300 mb-[10px] ">문서 서두 시작틀</p>
          <p className="lg:w-90p w-full text-[15px] mb-[10px]">문서 서두의 시작틀은 ====x==== ~~ ====끝====로 구성된다.<br/>
          이럴 경우 해당 문서에는 목차목록이 자동으로 생성된다. 목차의 경우 큰박스와 작은박스가 들어간다. <br/>
          문서 서두의 시작틀의 형식에는 ====~==== 의 ~ 부분에 아무거나 들어가도 상관이없다.
          </p>
          <div className="w-full h-fit" >

          <Edit_Tutorial  ex_text={["====ㅌ====","====끝====","=_=큰 박스=_=","dsfdsdfd","=_=끝=_=","=-=작은 박스=-=","dfdsfsdff","=-=끝=-="]}/>

          </div>
      </div>



      <div className="w-full h-fit flex flex-col items-center mb-[20px]">
          <p className="lg:w-90p w-full text-[25px] text-blue-300 mb-[10px]">각주 작성</p>
          <p className="lg:w-90p w-full text-[15px] mb-[10px]">각주의 구성은 @~~  !~~!@ 이렇게 구성된다. <br/>
          !~! 바깥의 내용들은 각주가 붙을 내용. <br/>
          !~! 사이의 내용은 붙은 각주내용을 의미한다.<br/>
          참고로 각주가 생성되면 자동으로 맨아래의 각주 설명모음칸이 생긴다<br/>
          </p>
          <div className="w-full h-fit" >

          <Edit_Tutorial  ex_text={["@각주내용!각주테스팅!@"]}/>

          </div>
      </div>


      <div className="w-full h-fit flex flex-col items-center mb-[20px]">
          <p className="lg:w-90p w-full text-[25px] text-blue-300 mb-[10px]">영상,이미지 삽입</p>
          <p className="lg:w-90p w-full text-[15px] mb-[10px]">이미지 영상 삽입 <br/>
          이미지의 경우&&&~&&& 이고 <br/>
          영상의 경우 *~~* 이런식으로 작성해주자.영상의경우 youtue에서 share버튼을 누르면 나오는 html형식의 src만인정한다.<br/>
          이미지 영상의 출처는 ^^^~~^^^ 이렇게 넣어주도록하자 안넣어주면 국물도없다<br/>
          또한 목차에 올라가지않는 자유로운 꾸밈을 위한 박스를 원한다면 __~__이런식으로 기존패턴과 같게 작성해주자.<br/>
          이미지의 경우 src에다가 이름만넣어주도록하자 알아서 서버에잇는거를 넣어준다<br/>
          </p>
          <div className="w-full h-fit" >

          <Edit_Tutorial  ex_text={["====ㅌ====","__ㅋ__",`*^^^https://www.youtube.com/embed/XbGs_qK2PQA?si=vJOUzfJwAyT1628G^^^*`,"__끝__","__z__",`&&&^^^basic^^^&&&`,"__끝__","====끝====","=_=큰 박스=_=","dsfdsdfd","=_=끝=_=","=-=작은 박스=-=","dfdsfsdff","=-=끝=-="]}/>

          </div>
      </div>



      
   
     
      
    </div>
    
  );
}
//<Edit_Tutorial ex_text={["=_=큰 박스=_=","dsfdsdfd","=_=끝=_=","=-=작은 박스=-=","dfdsfsdff","=-=끝=-="]}/>