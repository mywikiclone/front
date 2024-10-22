const { exec } = require('child_process');
const fs = require('fs');

// 프로젝트 경로
const PROJECT_ROOT = '/home/ec2-user/front';
const DEPLOY_LOG = `${PROJECT_ROOT}/deploy.log`;

// 현재 시간
const timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');

// 실행 중인 프로세스 확인
exec(`pgrep -f ${PROJECT_ROOT}/mywikifront.next`, (err, stdout) => {
    if (err) {
        // 프로세스가 없을 경우
        const logMessage = `[${timeNow}] > 실행중인 애플리케이션이 없습니다.\n`;
        fs.appendFileSync(DEPLOY_LOG, logMessage);
    } else {
        // 프로세스가 있을 경우 종료
        const currentPID = stdout.trim();
        const logMessage = `[${timeNow}] > 실행중인 애플리케이션을 종료합니다. PID = ${currentPID}\n`;
        fs.appendFileSync(DEPLOY_LOG, logMessage);
        
        exec(`kill -15 ${currentPID}`, (killErr) => {
            if (killErr) {
                console.error(`프로세스 종료 실패: ${killErr.message}`);
            }
        });
    }
});