
export const dynamic = "force-dynamic";

export async function GET(request){


    //위와 같은 구조로 Response 객체를 사용해야 합니다.라고한다 또한 위의 dynamic을 써주니까 빌드할떄 애한태서 에러가안생김.
    //api의경우 route.js로 끝나는 파일이여야된다.

    return new Response(JSON.stringify({ message: 'Hello, World!' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
}