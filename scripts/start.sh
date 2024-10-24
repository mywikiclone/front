#!/usr/bin/env bash
TIME_NOW=$(date +'%Y-%m-%d %H:%M:%S')
# 프로젝트 경로
PROJECT_ROOT="/home/ec2-user/front"
#BUILD_DIR="$PROJECT_ROOT/mywikifront.next"
APP_LOG="$PROJECT_ROOT/application.log"
ERROR_LOG="$PROJECT_ROOT/error.log"
DEPLOY_LOG="$PROJECT_ROOT/deploy.log"



export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# NVM을 통해 설치한 Node.js 버전 사용
nvm use 20.18.0






echo "[$TIME_NOW] > Next.js 애플리케이션 빌드 시작" >> $DEPLOY_LOG

# Next.js 애플리케이션 빌드
cd $PROJECT_ROOT
#npm install
npm run build

# 빌드 결과 확인
if [ $? -ne 0 ]; then
    echo "[$TIME_NOW] > 빌드 실패" >> $DEPLOY_LOG
    exit 1
fi

echo "[$TIME_NOW] > 빌드 완료" >> $DEPLOY_LOG

# 서버 실행
echo "[$TIME_NOW] > Next.js 애플리케이션 실행 시작" >> $DEPLOY_LOG
nohup npm start > $APP_LOG 2> >(while read line; do echo "[$(date +'%Y-%m-%d %H:%M:%S')] $line"; done >> $ERROR_LOG) &

# 결과 출력
CURRENT_PID=$!
echo "[$TIME_NOW] > 실행 완료. PID = $CURRENT_PID" >> $DEPLOY_LOG
