#!/usr/bin/env bash

# 프로젝트 경로
PROJECT_ROOT="/home/ec2-user/front"
BUILD_DIR="$PROJECT_ROOT/mywikifront.next"
APP_LOG="$PROJECT_ROOT/application.log"
ERROR_LOG="$PROJECT_ROOT/error.log"
DEPLOY_LOG="$PROJECT_ROOT/deploy.log"

TIME_NOW=$(date +'%Y-%m-%d %H:%M:%S')

echo "[$TIME_NOW] > Next.js 애플리케이션 빌드 시작" >> $DEPLOY_LOG

# Next.js 애플리케이션 빌드
cd $PROJECT_ROOT
npm install
npm run build

# 빌드 결과 확인
if [ $? -ne 0 ]; then
    echo "[$TIME_NOW] > 빌드 실패" >> $DEPLOY_LOG
    exit 1
fi

echo "[$TIME_NOW] > 빌드 완료" >> $DEPLOY_LOG

# 서버 실행
echo "[$TIME_NOW] > Next.js 애플리케이션 실행 시작" >> $DEPLOY_LOG
nohup npm start > $APP_LOG 2> $ERROR_LOG &

# 결과 출력
CURRENT_PID=$!
echo "[$TIME_NOW] > 실행 완료. PID = $CURRENT_PID" >> $DEPLOY_LOG