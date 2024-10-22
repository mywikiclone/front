function intervalTimer(endTime, timeout) {
    let timerId;
    let count=1;
    timerId = setInterval(() => {
     
      const timeLeft = endTime - count*1000;
      count++;
      postMessage({ type: 'timer',timeleft:timeLeft});
  
      if (timeLeft <= 0) {
        postMessage({ type:'timer-end'});
        timerId && clearInterval(timerId);
      }
    }, timeout);
  }
  
  onmessage = function (e) {
    const { type } = e.data;
    switch (type) {
      case 'start-timer':
        intervalTimer(120000, 1000);
        break;
      case 'timer-end':
        postMessage({ type: 'timer-end' });
        break;
    }
  };

