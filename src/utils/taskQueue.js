class TaskQueue {
  constructor() {
    this.queue = [];
    this.isRunning = false;
  }

  add(task) {
    this.queue.push(task);
    this.runNext();
  }
  isLast() {
    return this.queue.length === 0;
  }

  async runNext() {
    if (this.isRunning || this.queue.length === 0) return;

    this.isRunning = true;

    const task = this.queue.shift();

    if (task) {
      try {
        await task();
      } catch (error) {
        console.error('작업 실행 중 에러:', error);
      }
    }

    this.isRunning = false;
    this.runNext();
  }
}

export const taskQueue = new TaskQueue();
